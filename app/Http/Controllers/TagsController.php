<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;


class TagsController extends Controller
{
    public function index(Request $request)
    {
        $tags = null;

        if ($request->input('paginated', false) == true) {
            $tags = Tag::paginate(20);
            $tags->getCollection()->transform(function ($tag) {
                return $tag->map();
            });
        } else {
            $tags = Tag::all()->map(function ($tag) {
                return $tag->map();
            });
        }
        return response()->json($tags);
    }

    public function show(Tag $tag)
    {
        return response()->json($tag->map());
    }

    public function store(Request $request)
    {
        $attributes = $this->validateTag($request);

        $tag = Tag::create([
            'name' => $attributes['name']
        ]);

        return response()->json($tag, 201);
    }

    public function update(Request $request, Tag $tag)
    {
        $attributes = $this->validateTagUpdate($request, $tag);
        $tag->name = $attributes['name'];
        $tag->update($attributes);
        $tag = $tag->fresh();
        return response()->json($tag);
    }

    public function destroy(Tag $tag)
    {
        $tag->delete();
        return response()->noContent();
    }

    protected function validateTag(Request $request)
    {
        return $request->validate([
            'name' => 'required|unique:tags|max:40'
        ]);
    }

    protected function validateTagUpdate(Request $request, Tag $tag)
    {
        return $request->validate([
            'name' => ['required', 'max:40', Rule::unique('tags')->ignore($tag)]
        ]);
    }
}
