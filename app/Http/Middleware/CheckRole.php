<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $userRole = $request->user()->role()->first();
        if ($userRole) {
            $request->request->add([
                'scope' => $userRole->role
            ]);
        }

        return $next($request);
    }
}
