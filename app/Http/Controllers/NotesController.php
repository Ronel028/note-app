<?php

namespace App\Http\Controllers;

use App\Models\Notes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class NotesController extends Controller
{
    public function index()
    {
        return Inertia::render('Home/Notes', [
            'auth' => Auth::user(),
            'notes' => Notes::where('user_id', Auth::user()->id)->get()
        ]);
    }

    public function create(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
        ]);

        DB::beginTransaction();
        $notes = new Notes();
        $notes->title = $request->title;
        $notes->content = $request->content;
        $notes->user_id = Auth::user()->id;

        if ($notes->save()) {
            DB::commit();
        } else {
            DB::rollBack();
        }
    }

    public function update(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
        ]);

        DB::beginTransaction();
        $notes = Notes::find($request->id);
        $notes->title = $request->title;
        $notes->content = $request->content;
        $notes->user_id = Auth::user()->id;

        if ($notes->save()) {
            DB::commit();
        } else {
            DB::rollBack();
        }
    }

    public function fetch(Request $request)
    {
        $notes = Notes::find($request->id);

        return response()->json($notes);
    }
}
