<?php

namespace App\JsonApi\V2\Users;

use App\Models\User;
use LaravelJsonApi\Eloquent\Contracts\Paginator;
use LaravelJsonApi\Eloquent\Fields\DateTime;
use LaravelJsonApi\Eloquent\Fields\ID;
use LaravelJsonApi\Eloquent\Fields\Str;
use LaravelJsonApi\Eloquent\Fields\Relations\BelongsTo;
use LaravelJsonApi\Eloquent\Fields\Relations\HasMany;
use LaravelJsonApi\Eloquent\Filters\WhereIdIn;
use LaravelJsonApi\Eloquent\Pagination\PagePagination;
use LaravelJsonApi\Eloquent\Schema;

class UserSchema extends Schema
{
    public static string $model = User::class;

    public function fields(): array
    {
        return [
            ID::make(),
            Str::make('name'),
            Str::make('email'),
            Str::make('employee_id'),
            Str::make('status'),
            DateTime::make('email_verified_at')->sortable(),
            DateTime::make('created_at')->sortable()->readOnly(),
            DateTime::make('updated_at')->sortable()->readOnly(),

            // Define the relationships
            BelongsTo::make('department'),
            HasMany::make('services'),
            HasMany::make('serviceAccess'),
            HasMany::make('activities'),
            HasMany::make('biometricRegistration')
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