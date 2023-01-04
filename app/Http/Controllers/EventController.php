<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Enums\EventStatus;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {

        $paginator = Event::latest()->paginate(10);
        $paginator->getCollection()->transform(function ($event) {
            return $event->map();
        });

        return response()->json($paginator);
    }

    public function store(Request $request)
    {
        $attributes = $this->validateEvent($request);

        $event = Event::create([
            'name' => $attributes['name'],
            'description' => $attributes['description'],
            'universal' => $attributes['universal']
        ]);

        
        if(!$event->universal) $event->includedTags()->attach($attributes['tags']);

        if($attributes['publish']){
            $event->status = EventStatus::Active;
        } else {
            $event->status = EventStatus::NotPublished;
        }

        $event->save();

        return response()->json($event, 201);
    }

    protected function validateEvent(Request $request)
    {
        return $request->validate([
            'name' => 'required|max:255',
            'description' => 'required|max:255',
            'universal' => 'required|boolean',
            'tags' => 'exists:tags,id',
            'publish' => 'required|boolean'
        ]);
    }
}
