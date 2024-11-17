<?php
// app/Policies/ServicePolicy.php
namespace App\Policies;

use App\Models\User;
use App\Models\Service;
use Illuminate\Auth\Access\HandlesAuthorization;

class ServicePolicy
{
    use HandlesAuthorization;

    public function create(User $user)
    {
        return $user->hasRole('admin');
    }

    public function update(User $user, Service $service)
    {
        return $user->hasRole('admin');
    }

    public function delete(User $user, Service $service)
    {
        return $user->hasRole('admin');
    }

    public function manageAccess(User $user, Service $service)
    {
        return $user->hasRole(['admin', 'manager']);
    }
}

// app/Policies/DepartmentPolicy.php
namespace App\Policies;

use App\Models\User;
use App\Models\Department;
use Illuminate\Auth\Access\HandlesAuthorization;

class DepartmentPolicy
{
    use HandlesAuthorization;

    public function create(User $user)
    {
        return $user->hasRole('admin');
    }

    public function update(User $user, Department $department)
    {
        return $user->hasRole('admin') || 
               ($user->hasRole('manager') && $user->department_id === $department->id);
    }

    public function delete(User $user, Department $department)
    {
        return $user->hasRole('admin');
    }

    public function manageDepartment(User $user, Department $department)
    {
        return $user->hasRole('admin') || 
               ($user->hasRole('manager') && $user->department_id === $department->id);
    }
}