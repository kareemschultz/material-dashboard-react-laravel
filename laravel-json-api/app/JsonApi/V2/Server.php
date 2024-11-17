<?php

namespace App\JsonApi\V2;

use LaravelJsonApi\Core\Server\Server as BaseServer;

class Server extends BaseServer
{
    protected string $baseUri = '/api/v2';

    public function serving(): void
    {
        // no-op
    }

    protected function allSchemas(): array
    {
        return [
            Users\UserSchema::class,
            Departments\DepartmentSchema::class,
            Services\ServiceSchema::class,
            ServiceAccesses\ServiceAccessesSchema::class,
            BiometricRegistrations\BiometricRegistrationSchema::class,
            ActivityLogs\ActivityLogSchema::class,
        ];
    }
}