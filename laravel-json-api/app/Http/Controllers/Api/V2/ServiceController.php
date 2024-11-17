<?php

namespace App\Http\Controllers\Api\V2\ServiceManagement;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\ServiceAccess;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use LaravelJsonApi\Core\Document\Error;
use Symfony\Component\HttpFoundation\Response;

class ServiceController extends Controller
{
    public function status(Service $service)
    {
        return response()->json([
            'status' => $service->status,
            'metrics' => [
                'total_users' => $service->users()->count(),
                'active_users' => $service->users()->wherePivot('status', 'active')->count(),
                'pending_requests' => $service->serviceAccesses()->where('status', 'pending')->count()
            ]
        ]);
    }

    public function grantAccess(Service $service, Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'access_level' => 'required|string',
            'permissions' => 'nullable|array',
            'expires_at' => 'nullable|date',
            'account_type' => 'nullable|string'
        ]);

        $serviceAccess = ServiceAccess::create([
            'user_id' => $validated['user_id'],
            'service_id' => $service->id,
            'status' => 'active',
            'access_level' => $validated['access_level'],
            'permissions' => $validated['permissions'] ?? null,
            'account_type' => $validated['account_type'] ?? 'local',
            'granted_at' => now(),
            'expires_at' => $validated['expires_at'] ?? null,
            'granted_by' => auth()->id()
        ]);

        return response()->json($serviceAccess, Response::HTTP_CREATED);
    }

    public function revokeAccess(Service $service, Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id'
        ]);

        $service->serviceAccesses()
            ->where('user_id', $validated['user_id'])
            ->update(['status' => 'revoked']);

        return response()->noContent();
    }

    public function updateAccess(Service $service, Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'access_level' => 'nullable|string',
            'permissions' => 'nullable|array',
            'expires_at' => 'nullable|date'
        ]);

        $serviceAccess = $service->serviceAccesses()
            ->where('user_id', $validated['user_id'])
            ->firstOrFail();

        $serviceAccess->update($validated);

        return response()->json($serviceAccess);
    }

    public function bulkImport(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:csv,txt'
        ]);

        try {
            $file = $request->file('file');
            $path = $file->storeAs('imports', 'services_import_' . now()->format('Y-m-d_H-i-s') . '.csv');
            
            // Process the CSV
            $handle = fopen(Storage::path($path), 'r');
            $header = fgetcsv($handle);
            $imported = 0;

            while (($data = fgetcsv($handle)) !== false) {
                $row = array_combine($header, $data);
                Service::create([
                    'name' => $row['name'],
                    'type' => $row['type'],
                    'auth_type' => $row['auth_type'] ?? null,
                    'description' => $row['description'] ?? null,
                    'status' => $row['status'] ?? 'active'
                ]);
                $imported++;
            }

            fclose($handle);
            Storage::delete($path);

            return response()->json([
                'message' => 'Import successful',
                'imported_count' => $imported
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Import failed',
                'error' => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function bulkExport()
    {
        $services = Service::all();
        $filename = 'services_export_' . now()->format('Y-m-d_H-i-s') . '.csv';
        
        $handle = fopen('php://temp', 'r+');
        
        // Add headers
        fputcsv($handle, ['name', 'type', 'auth_type', 'description', 'status', 'created_at']);
        
        // Add data
        foreach ($services as $service) {
            fputcsv($handle, [
                $service->name,
                $service->type,
                $service->auth_type,
                $service->description,
                $service->status,
                $service->created_at
            ]);
        }

        rewind($handle);
        $csv = stream_get_contents($handle);
        fclose($handle);

        return response($csv)
            ->header('Content-Type', 'text/csv')
            ->header('Content-Disposition', 'attachment; filename="' . $filename . '"');
    }

    // Platform-specific methods
    public function ipamStatus(Service $service)
    {
        // Implement IPAM-specific status check
        return response()->json([
            'status' => $service->status,
            'ipam_config' => $service->config['ipam'] ?? null,
            'active_users' => $service->users()
                ->wherePivot('status', 'active')
                ->wherePivot('access_level', 'ipam')
                ->count()
        ]);
    }

    public function grafanaStatus(Service $service)
    {
        // Implement Grafana-specific status check
        return response()->json([
            'status' => $service->status,
            'grafana_config' => $service->config['grafana'] ?? null,
            'dashboard_count' => $service->config['grafana']['dashboard_count'] ?? 0,
            'active_users' => $service->users()
                ->wherePivot('status', 'active')
                ->wherePivot('access_level', 'grafana')
                ->count()
        ]);
    }

    public function vpnStatus(Service $service)
    {
        // Implement VPN-specific status check
        return response()->json([
            'status' => $service->status,
            'vpn_config' => $service->config['vpn'] ?? null,
            'connected_users' => $service->users()
                ->wherePivot('status', 'active')
                ->wherePivot('access_level', 'vpn')
                ->count()
        ]);
    }
}