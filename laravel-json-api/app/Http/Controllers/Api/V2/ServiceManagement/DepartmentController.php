<?php

namespace App\Http\Controllers\Api\V2\ServiceManagement;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DepartmentController extends Controller
{
    public function members(Department $department)
    {
        $members = $department->users()
            ->with(['serviceAccesses', 'biometricRegistration'])
            ->paginate(20);

        return response()->json($members);
    }

    public function addMember(Department $department, Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id'
        ]);

        $user = User::findOrFail($validated['user_id']);
        $user->update(['department_id' => $department->id]);

        // Log the activity
        activity()
            ->performedOn($department)
            ->causedBy($user)
            ->withProperties([
                'user_id' => $user->id,
                'department_id' => $department->id
            ])
            ->log('department_member_added');

        return response()->json([
            'message' => 'Member added successfully',
            'user' => $user
        ]);
    }

    public function removeMember(Department $department, User $user)
    {
        if ($user->department_id !== $department->id) {
            return response()->json([
                'message' => 'User is not a member of this department'
            ], 400);
        }

        $user->update(['department_id' => null]);

        // Log the activity
        activity()
            ->performedOn($department)
            ->causedBy($user)
            ->withProperties([
                'user_id' => $user->id,
                'department_id' => $department->id
            ])
            ->log('department_member_removed');

        return response()->json([
            'message' => 'Member removed successfully'
        ]);
    }

    public function services(Department $department)
    {
        $services = DB::table('services')
            ->select('services.*')
            ->selectRaw('COUNT(DISTINCT service_accesses.user_id) as user_count')
            ->join('service_accesses', 'services.id', '=', 'service_accesses.service_id')
            ->join('users', 'service_accesses.user_id', '=', 'users.id')
            ->where('users.department_id', $department->id)
            ->groupBy('services.id')
            ->get();

        return response()->json($services);
    }

    public function accessSummary(Department $department)
    {
        $summary = [
            'total_members' => $department->users()->count(),
            'active_members' => $department->users()->where('status', 'active')->count(),
            'service_distribution' => DB::table('services')
                ->select('services.name', 'services.type')
                ->selectRaw('COUNT(DISTINCT service_accesses.user_id) as user_count')
                ->join('service_accesses', 'services.id', '=', 'service_accesses.service_id')
                ->join('users', 'service_accesses.user_id', '=', 'users.id')
                ->where('users.department_id', $department->id)
                ->groupBy('services.id', 'services.name', 'services.type')
                ->get(),
            'biometric_stats' => [
                'registered_users' => $department->users()
                    ->whereHas('biometricRegistration', function($query) {
                        $query->where('is_registered', true);
                    })
                    ->count()
            ]
        ];

        return response()->json($summary);
    }
}