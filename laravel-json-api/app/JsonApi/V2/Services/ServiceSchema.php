<?php

namespace App\JsonApi\V2\Services;

use App\Models\Service;
use LaravelJsonApi\Eloquent\Contracts\Paginator;
use LaravelJsonApi\Eloquent\Fields\DateTime;
use LaravelJsonApi\Eloquent\Fields\ID;
use LaravelJsonApi\Eloquent\Fields\Str;
use LaravelJsonApi\Eloquent\Fields\Relations\HasMany;
use LaravelJsonApi\Eloquent\Filters\WhereIdIn;
use LaravelJsonApi\Eloquent\Pagination\PagePagination;
use LaravelJsonApi\Eloquent\Schema;

class ServiceSchema extends Schema
{
    public static string $model = Service::class;

    public function fields(): array
    {
        return [
            ID::make(),
            Str::make('name'),
            Str::make('type'),
            Str::make('authType'),
            Str::make('description'),
            Str::make('config'),
            Str::make('status'),
            DateTime::make('createdAt')->sortable()->readOnly(),
            DateTime::make('updatedAt')->sortable()->readOnly(),
            DateTime::make('deletedAt')->sortable()->readOnly(),

            // Relationships
            HasMany::make('serviceAccess'),
            HasMany::make('users')
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