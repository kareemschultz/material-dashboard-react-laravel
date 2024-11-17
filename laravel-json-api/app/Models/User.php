// app/Models/User.php
<?php

namespace App\Models;

use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, SoftDeletes;

    protected $fillable = [
        'name', 'email', 'password', 'department_id',
        'employee_id', 'status', 'metadata'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'metadata' => 'json'
    ];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function serviceAccesses()
    {
        return $this->hasMany(ServiceAccess::class);
    }

    public function services()
    {
        return $this->belongsToMany(Service::class, 'service_accesses')
            ->withPivot(['status', 'access_level', 'permissions', 'granted_at', 'expires_at'])
            ->withTimestamps();
    }

    public function biometricRegistration()
    {
        return $this->hasOne(BiometricRegistration::class);
    }

    public function activities()
    {
        return $this->hasMany(ActivityLog::class);
    }
}

// app/Models/Department.php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Department extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name', 'code', 'description', 'status'
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function services()
    {
        return $this->hasManyThrough(Service::class, ServiceAccess::class);
    }
}

// app/Models/Service.php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name', 'type', 'auth_type', 'description',
        'config', 'status'
    ];

    protected $casts = [
        'config' => 'json'
    ];

    public function serviceAccesses()
    {
        return $this->hasMany(ServiceAccess::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'service_accesses')
            ->withPivot(['status', 'access_level', 'permissions', 'granted_at', 'expires_at'])
            ->withTimestamps();
    }
}

// app/Models/ServiceAccess.php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ServiceAccess extends Model
{
    use SoftDeletes;

    protected $table = 'service_accesses';

    protected $fillable = [
        'user_id', 'service_id', 'status', 'access_level',
        'permissions', 'account_type', 'groups', 'granted_at',
        'expires_at', 'granted_by'
    ];

    protected $casts = [
        'permissions' => 'json',
        'groups' => 'json',
        'granted_at' => 'datetime',
        'expires_at' => 'datetime'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function grantedBy()
    {
        return $this->belongsTo(User::class, 'granted_by');
    }
}

// app/Models/BiometricRegistration.php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BiometricRegistration extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id', 'is_registered', 'device_id',
        'metadata', 'registered_at'
    ];

    protected $casts = [
        'is_registered' => 'boolean',
        'metadata' => 'json',
        'registered_at' => 'datetime'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

// app/Models/ActivityLog.php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    protected $fillable = [
        'user_id', 'action', 'entity_type', 'entity_id',
        'old_values', 'new_values', 'ip_address', 'user_agent'
    ];

    protected $casts = [
        'old_values' => 'json',
        'new_values' => 'json'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}