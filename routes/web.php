<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\NotesController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [NotesController::class, 'index'])->middleware(['auth'])->name('index');
Route::post('/create', [NotesController::class, 'create'])->middleware(['auth'])->name('notes.create');
Route::get('/fetch/{id}', [NotesController::class, 'fetch'])->middleware(['auth'])->name('notes.fetch');
Route::post('/update', [NotesController::class, 'update'])->middleware(['auth'])->name('notes.update');


Route::get('/login', [AuthController::class, 'login'])->name('login');
Route::get('/signup', [AuthController::class, 'signup'])->name('signup');

Route::prefix('auth')->group(function () {
    Route::post('/signup', [AuthController::class, 'saveNewUser'])->name('signup');
    Route::post('/authenticate', [AuthController::class, 'authenticate'])->name('authenticate');
    Route::delete('/logout', [AuthController::class, 'logout'])->name('logout');
});
