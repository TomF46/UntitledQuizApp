<?php

namespace App\Http\Controllers;

use App\Models\Tag;

class TagsController extends Controller
{
    public function index()
    {
        return response()->json(Tag::all()->map(function ($tag) {
            return $tag->map();
        }));
    }
}
