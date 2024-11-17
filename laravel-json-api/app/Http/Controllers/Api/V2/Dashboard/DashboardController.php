<?php

namespace App\Http\Controllers\Api\V2\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Service;
use App\Models\Department;
use App\Models\ServiceAccess;
use App\Models\BiometricRegistration;
use App\Models\ActivityLog;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function getStats()
    {
        $stats = [
            'users' => [
                'total' => User::count(),
                'active' => User::where('status', 'active')->count(),
                'new_this_month' => User::whereMonth('created_at', now()->month)->count()
            ],
            'services' => [
                'total' => Service::count(),
                'active' => Service::where('status', 'active')->count()
            ],
            'departments' => [
                'total' => Department::count(),
                'with_members' => Department::has('users')->count()
            ],
            'biometric' => [
                'total_registered' => BiometricRegistration::where('is_registered', true)->count()
            ],
            'access_requests' => [
                'pending' => ServiceAccess::where('status', 'pending')->count(),
                'approved_today' => ServiceAccess::whereDate('granted_at', today())
                    ->where('status', 'active')
                    ->count()
            ]
        ];

        return response()->json($stats);
    }

    public function getAccessSummary()
    {
        $summary = Service::select('services.name', 'services.type')
            ->selectRaw('COUNT(service_accesses.id) as total_accesses')
            ->selectRaw('COUNT(CASE WHEN service_accesses.status = "active" THEN 1 END) as active_accesses')
            ->leftJoin('service_accesses', 'services.id', '=', 'service_accesses.service_id')
            ->groupBy('services.id', 'services.name', 'services.type')
            ->get();

        return response()->json($summary);
    }

    public function getDepartmentSummary()
    {
        $summary = Department::with(['users' => function($query) {
            $query->select('users.id', 'department_id', 'status');
        }])
        ->get()
        ->map(function($department) {
            return [
                'name' => $department->name,
                'total_members' => $department->users->count(),
                'active_members' => $department->users->where('status', 'active')->count(),
                'service_access' => ServiceAccess::whereIn('user_id', $department->users->pluck('id'))
                    ->select('service_id', DB::raw('count(*) as access_count'))
                    ->groupBy('service_id')
                    ->get()
            ];
        });

        return response()->json($summary);
    }

    public function getUserActivities()
    {
        $activities = ActivityLog::with('user:id,name')
            ->latest()
            ->take(50)
            ->get()
            ->map(function($activity) {
                return [
                    'user' => $activity->user->name,
                    'action' => $activity->action,
                    'details' => $activity->new_values,
                    'timestamp' => $activity->created_at->diffForHumans(),
                    'ip_address' => $activity->ip_address
                ];
            });

        return response()->json($activities);
    }

    public function getServiceUsage()
    {
        $usage = Service::select('services.name', 'services.type')
            ->selectRaw('COUNT(DISTINCT service_accesses.user_id) as unique_users')
            ->selectRaw('COUNT(service_accesses.id) as total_accesses')
            ->leftJoin('service_accesses', 'services.id', '=', 'service_accesses.service_id')
            ->where('service_accesses.status', 'active')
            ->groupBy('services.id', 'services.name', 'services.type')
            ->get();

        return response()->json($usage);
    }

    public function getAccessTrends()
    {
        $trends = ServiceAccess::select(
            DB::raw('DATE(created_at) as date'),
            DB::raw('COUNT(*) as total_grants'),
            DB::raw('COUNT(CASE WHEN status = "active" THEN 1 END) as active_grants')
        )
        ->whereBetween('created_at', [now()->subDays(30), now()])
        ->groupBy('date')
        ->orderBy('date')
        ->get();

        return response()->json($trends);
    }

    public function getDepartmentStats()
    {
        $stats = Department::select('departments.name')
            ->selectRaw('COUNT(users.id) as total_users')
            ->selectRaw('COUNT(DISTINCT service_accesses.service_id) as unique_services')
            ->selectRaw('COUNT(biometric_registrations.id) as biometric_users')
            ->leftJoin('users', 'departments.id', '=', 'users.department_id')
            ->leftJoin('service_accesses', 'users.id', '=', 'service_accesses.user_id')
            ->leftJoin('biometric_registrations', 'users.id', '=', 'biometric_registrations.user_id')
            ->groupBy('departments.id', 'departments.name')
            ->get();

        return response()->json($stats);
    }

    public function getBiometricStats()
    {
        $stats = [
            'total_registered' => BiometricRegistration::where('is_registered', true)->count(),
            'registration_by_department' => Department::select('departments.name')
                ->selectRaw('COUNT(biometric_registrations.id) as registered_count')
                ->leftJoin('users', 'departments.id', '=', 'users.department_id')
                ->leftJoin('biometric_registrations', 'users.id', '=', 'biometric_registrations.user_id')
                ->where('biometric_registrations.is_registered', true)
                ->groupBy('departments.id', 'departments.name')
                ->get(),
            'recent_registrations' => BiometricRegistration::with('user:id,name,department_id')
                ->where('is_registered', true)
                ->latest('registered_at')
                ->take(10)
                ->get()
                ->map(function($registration) {
                    return [
                        'user' => $registration->user->name,
                        'registered_at' => $registration->registered_at->diffForHumans(),
                        'device_info' => $registration->metadata
                    ];
                })
        ];

        return response()->json($stats);
    }
}