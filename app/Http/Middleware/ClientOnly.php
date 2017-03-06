<?php

namespace App\Http\Middleware;

use Closure;
use App\User;

class ClientOnly
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $token = $request->header('userToken');
        $user = User::findByToken($token);
        if ($user && $user->checkRoles(['client', 'admin'])) {
            return $next($request);
        }

        return response(false, 500);
    }
}
