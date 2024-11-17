<?php

namespace App\JsonApi\V2\ActivityLogs;

use App\Models\ActivityLog;
use LaravelJsonApi\Eloquent\Contracts\Paginator;
use LaravelJsonApi\Eloquent\Fields\DateTime;
use LaravelJsonApi\Eloquent\Fields\ID;
use LaravelJsonApi\Eloquent\Fields\Str;
use LaravelJsonApi\Eloquent\Fields\Number;
use LaravelJsonApi\Eloquent\Fields\Relations\BelongsTo;
use LaravelJsonApi\Eloquent\Filters\WhereIdIn;
use LaravelJsonApi\Eloquent\Pagination\PagePagination;
use LaravelJsonApi\Eloquent\Schema;

class ActivityLogSchema extends Schema
{
    public static string $model = ActivityLog::class;

    public function fields(): array
    {
        return [
            ID::make(),
            Str::make('action'),
            Str::make('entityType'),
            Number::make('entityId'),
            Str::make('oldValues'),
            Str::make('newValues'),
            Str::make('ipAddress'),
            Str::make('userAgent'),
            DateTime::make('createdAt')->sortable()->readOnly(),
            DateTime::make('updatedAt')->sortable()->readOnly(),

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