<?php

namespace App\JsonApi\V2\ServiceAccesses;

use App\Models\ServiceAccess;
use LaravelJsonApi\Eloquent\Contracts\Paginator;
use LaravelJsonApi\Eloquent\Fields\DateTime;
use LaravelJsonApi\Eloquent\Fields\ID;
use LaravelJsonApi\Eloquent\Fields\Str;
use LaravelJsonApi\Eloquent\Fields\Relations\BelongsTo;
use LaravelJsonApi\Eloquent\Filters\WhereIdIn;
use LaravelJsonApi\Eloquent\Pagination\PagePagination;
use LaravelJsonApi\Eloquent\Schema;

class ServiceAccessesSchema extends Schema
{
    protected $model = ServiceAccess::class;

    public static function type(): string
    {
        return 'service-accesses';
    }

    public function fields(): array
    {
        return [
            ID::make(),
            Str::make('status'),
            Str::make('accessLevel'),
            Str::make('permissions'),
            Str::make('accountType'),
            Str::make('groups'),
            DateTime::make('grantedAt')->sortable(),
            DateTime::make('expiresAt')->sortable(),
            DateTime::make('createdAt')->sortable()->readOnly(),
            DateTime::make('updatedAt')->sortable()->readOnly(),
            DateTime::make('deletedAt')->sortable()->readOnly(),

            BelongsTo::make('user'),
            BelongsTo::make('service'),
            BelongsTo::make('grantedBy')->type('users')
        ];
    }

    public function filters(): array
    {
        return [
            WhereIdIn::make($this)
        ];
    }

    public function pagination(): ?Paginator
    {
        return PagePagination::make();
    }
}