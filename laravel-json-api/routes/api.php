<?php

use Illuminate\Support\Facades\Route;
use LaravelJsonApi\Laravel\Facades\JsonApiRoute;
use LaravelJsonApi\Laravel\Http\Controllers\JsonApiController;
use App\Http\Controllers\Api\V2\Auth\LoginController;
use App\Http\Controllers\Api\V2\Auth\LogoutController;
use App\Http\Controllers\Api\V2\Auth\RegisterController;
use App\Http\Controllers\Api\V2\Auth\ForgotPasswordController;
use App\Http\Controllers\Api\V2\Auth\ResetPasswordController;
use App\Http\Controllers\Api\V2\MeController;
use App\Http\Controllers\Api\V2\EmployeeController;
use App\Http\Controllers\Api\V2\AccessManagementController;
use App\Http\Controllers\Api\V2\DashboardController;

Route::prefix('v2')->group(function () {
    // Auth Routes (No Auth Required)
    Route::post('/login', LoginController::class)->name('login');
    Route::post('/register', RegisterController::class);
    Route::post('/password-forgot', ForgotPasswordController::class);
    Route::post('/password-reset', ResetPasswordController::class)->name('password.reset');

    // Protected Routes
    Route::middleware('auth:api')->group(function () {
        // User Profile
        Route::post('/logout', LogoutController::class);
        Route::get('/me', [MeController::class, 'readProfile']);
        Route::patch('/me', [MeController::class, 'updateProfile']);

        // Employee Management
        Route::prefix('employees')->group(function () {
            Route::get('/', [EmployeeController::class, 'index']);
            Route::post('/', [EmployeeController::class, 'store']);
            Route::get('/{employee}', [EmployeeController::class, 'show']);
            Route::patch('/{employee}', [EmployeeController::class, 'update']);
            Route::delete('/{employee}', [EmployeeController::class, 'destroy']);
            Route::post('/bulk-import', [EmployeeController::class, 'bulkImport']);
            Route::get('/export', [EmployeeController::class, 'export']);
            
            // Employee Access Management
            Route::prefix('{employee}/access')->group(function () {
                Route::get('/', [AccessManagementController::class, 'getEmployeeAccess']);
                Route::post('/', [AccessManagementController::class, 'updateEmployeeAccess']);
                Route::get('/history', [AccessManagementController::class, 'getAccessHistory']);
            });
        });

        // Access Management
        Route::prefix('access')->group(function () {
            Route::get('/summary', [AccessManagementController::class, 'getSummary']);
            Route::post('/bulk-update', [AccessManagementController::class, 'bulkUpdate']);
            Route::get('/audit-log', [AccessManagementController::class, 'getAuditLog']);
        });

        // Dashboard
        Route::prefix('dashboard')->group(function () {
            Route::get('/stats', [DashboardController::class, 'getStats']);
            Route::get('/access-summary', [DashboardController::class, 'getAccessSummary']);
            Route::get('/department-stats', [DashboardController::class, 'getDepartmentStats']);
            Route::get('/recent-activities', [DashboardController::class, 'getRecentActivities']);
            Route::get('/access-trends', [DashboardController::class, 'getAccessTrends']);
        });

        // Service-specific endpoints
        Route::prefix('services')->group(function () {
            Route::get('/biometric/status', [AccessManagementController::class, 'getBiometricStatus']);
            Route::get('/vpn/status', [AccessManagementController::class, 'getVPNStatus']);
            Route::get('/grafana/status', [AccessManagementController::class, 'getGrafanaStatus']);
            Route::get('/ipam/status', [AccessManagementController::class, 'getIPAMStatus']);
            Route::get('/teleport/status', [AccessManagementController::class, 'getTeleportStatus']);
        });
    });
});

// JSON:API routes
JsonApiRoute::server('v2')
    ->prefix('v2')
    ->middleware('auth:api')
    ->resources(function ($server) {
        $server->resource('employees', JsonApiController::class);
        $server->resource('departments', JsonApiController::class);
        $server->resource('access-logs', JsonApiController::class);
    });