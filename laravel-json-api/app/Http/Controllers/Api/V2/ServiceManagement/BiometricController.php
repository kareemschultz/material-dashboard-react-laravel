<?php

namespace App\Http\Controllers\Api\V2\ServiceManagement;

use App\Http\Controllers\Controller;
use App\Models\BiometricRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BiometricController extends Controller
{
    public function status()
    {
        $registration = Auth::user()->biometricRegistration;

        return response()->json([
            'is_registered' => $registration ? $registration->is_registered : false,
            'registered_at' => $registration ? $registration->registered_at : null,
            'device_info' => $registration ? $registration->metadata : null,
            'status' => $registration ? 'active' : 'not_registered'
        ]);
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'device_id' => 'required|string',
            'metadata' => 'nullable|array',
            'device_type' => 'nullable|string',
            'device_name' => 'nullable|string'
        ]);

        $registration = BiometricRegistration::updateOrCreate(
            ['user_id' => Auth::id()],
            [
                'is_registered' => true,
                'device_id' => $validated['device_id'],
                'metadata' => array_merge($validated['metadata'] ?? [], [
                    'device_type' => $validated['device_type'] ?? 'unknown',
                    'device_name' => $validated['device_name'] ?? 'unknown',
                    'registered_ip' => $request->ip(),
                    'user_agent' => $request->userAgent()
                ]),
                'registered_at' => now()
            ]
        );

        // Log the activity
        activity()
            ->performedOn($registration)
            ->withProperties([
                'device_id' => $validated['device_id'],
                'device_type' => $validated['device_type'] ?? 'unknown'
            ])
            ->log('biometric_registered');

        return response()->json($registration, 201);
    }

    public function unregister()
    {
        $registration = Auth::user()->biometricRegistration;

        if ($registration) {
            // Store info for logging
            $oldDeviceId = $registration->device_id;
            
            // Soft delete the registration
            $registration->update([
                'is_registered' => false,
                'device_id' => null,
                'metadata' => array_merge($registration->metadata ?? [], [
                    'unregistered_at' => now(),
                    'unregistered_reason' => 'user_request'
                ])
            ]);

            // Log the activity
            activity()
                ->performedOn($registration)
                ->withProperties([
                    'old_device_id' => $oldDeviceId
                ])
                ->log('biometric_unregistered');

            return response()->json([
                'message' => 'Biometric registration removed successfully'
            ]);
        }

        return response()->json([
            'message' => 'No biometric registration found'
        ], 404);
    }

    public function registeredUsers()
    {
        $this->authorize('viewBiometricUsers');

        $users = BiometricRegistration::with(['user:id,name,email,department_id', 'user.department:id,name'])
            ->where('is_registered', true)
            ->latest('registered_at')
            ->paginate(20);

        return response()->json($users);
    }
}