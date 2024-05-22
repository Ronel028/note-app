<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function login()
    {
        return Inertia::render('Auth/Login');
    }

    public function signup()
    {
        return Inertia::render('Auth/Signup');
    }

    // LOGIN USER
    public function authenticate(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'username' => ['required'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return redirect()->intended('/');
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }

    // LOGOUT USER
    public function logout(Request $request): RedirectResponse
    {

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

    // SAVE NEW USER
    public function saveNewUser(Request $request)
    {
        $request->validate([
            'username' => 'required|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'min:6|required_with:retypePassword|same:retypePassword',
            'retypePassword' => 'min:6'
        ]);

        DB::beginTransaction();
        $user = new User();
        $user->username = $request->username;
        $user->email = $request->email;
        $user->password = $request->password;

        if ($user->save()) {
            DB::commit();
            return redirect('/login');
        } else {
            DB::rollBack();
        }
    }
}
