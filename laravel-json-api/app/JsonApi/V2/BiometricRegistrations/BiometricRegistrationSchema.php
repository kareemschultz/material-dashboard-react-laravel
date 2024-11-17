<?php

namespace App\JsonApi\V2\BiometricRegistrations;

use App\Models\BiometricRegistration;
use LaravelJsonApi\Eloquent\Contracts\Paginator;
use LaravelJsonApi\Eloquent\Fields\DateTime;
use LaravelJsonApi\Eloquent\Fields\ID;
use LaravelJsonApi\Eloquent\Fields\Str;
use LaravelJsonApi\Eloquent\Fields\Boolean;
use LaravelJsonApi\Eloquent\Fields\Relations\BelongsTo;
use LaravelJsonApi\Eloquent\Filters\WhereIdIn;
use LaravelJsonApi\Eloquent\Pagination\PagePagination;
use LaravelJsonApi\Eloquent\Schema;

class BiometricRegistrationSchema extends Schema
{
    public static string $model = BiometricRegistration::class;

    public function fields(): array
    {
        return [
            ID::make(),
            Boolean::make('isRegistered'),
            Str::make('deviceId'),
            Str::make('metadata'),
            DateTime::make('registeredAt')->sortable(),
            DateTime::make('createdAt')->sortable()->readOnly(),
            DateTime::make('updatedAt')->sortable()->readOnly(),
            DateTime::make('deletedAt')->sortable()->readOnly(),

            // Relationships
            BelongsTo::make('user')
        ];
    }

    public function filters(): array
    {
        return [
            WhereIdIn::make($this),
        ];
    }

    public function pagination(): ?Paginator
    {
        return PagePagination::make();
    }
}