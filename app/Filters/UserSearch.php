<?php

namespace App\Filters;

use App\Models\User;
use Illuminate\Http\Request;

class UserSearch
{
    public static function apply(Request $filters)
    {
        $user = (new User)->newQuery();

        if ($filters->has('searchTerm')) {
            $user->where('username', 'like', "{$filters->input('searchTerm')}%")->orWhere('email', 'like', "{$filters->input('searchTerm')}%");
        }

        return $user;
    }
}
