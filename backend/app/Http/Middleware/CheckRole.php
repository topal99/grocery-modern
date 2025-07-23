<?php

// PASTIKAN NAMESPACE ADALAH 'Grocery', BUKAN 'App'
namespace Grocery\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  ...$roles
     * @return mixed
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user = Auth::user();

        foreach ($roles as $role) {
            // Pastikan Anda memiliki kolom 'role' di tabel users
            if ($user->role === $role) {
                return $next($request);
            }
        }

        return response()->json(['message' => 'Forbidden: You do not have the required role.'], 403);
    }
}