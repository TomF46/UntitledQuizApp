<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class NotBanned
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
        if (!$request->user()->isBanned()) {
            return $next($request);
        }

        return response()->json(['error' => 'Forbidden.'], 403);
    }
}
