<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Enums\EventStatus;
use App\Helpers\NotificationsHelper;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $events = Event::latest();
        if($request->query('live')) $events = $events->where('status', EventStatus::Active);

        $paginator = $events->paginate(10);
        $paginator->getCollection()->transform(function ($event) use ($request) {
            return $event->map($request->user());
        });

        return response()->json($paginator);
    }

    public function store(Request $request)
    {
        $attributes = $this->validateEvent($request);

        $event = Event::create([
            'name' => $attributes['name'],
            'description' => $attributes['description'],
            'universal' => $attributes['universal'],
            'score_group_1' => $attributes['score_group_1'],
            'score_group_2' => $attributes['score_group_2'],
            'score_group_3' => $attributes['score_group_3'],
            'score_group_4' => $attributes['score_group_4'],
            'score_max' => $attributes['score_max'],
        ]);

        
        if(!$event->universal) $event->includedTags()->attach($attributes['tags']);

        if($attributes['publish']){
            $event->status = EventStatus::Active;
            NotificationsHelper::sendEventPublishedNotification($request->user(), $event);
        } else {
            $event->status = EventStatus::NotPublished;
        }

        $event->save();

        return response()->json($event, 201);
    }

    public function show(Event $event, Request $request)
    {
        return response()->json($event->map($request->user()));
    }

    public function edit(Request $request, Event $event)
    {
        return response()->json($event->mapForEdit());
    }

    public function update(Request $request, Event $event)
    {
        $attributes = $this->validateEvent($request);
        $event->update($attributes);
        $event->includedTags()->sync($attributes['tags']);
        return response()->json($event->fresh());
    }

    public function publish(Event $event, Request $request)
    {
        $event->publish($request->user());
        return response()->noContent();
    }

    public function endEvent(Event $event, Request $request)
    {
        $event->endEvent($request->user());
        return response()->noContent();
    }

    public function leaderboard(Event $event, Request $request)
    {
        return response()->json($event->mapLeaderboard());
    }

    protected function validateEvent(Request $request)
    {
        return $request->validate([
            'name' => 'required|max:255',
            'description' => 'required|max:255',
            'universal' => 'required|boolean',
            'tags' => 'exists:tags,id',
            'publish' => 'required|boolean',
            'score_group_1' => 'required',
            'score_group_2' => 'required',
            'score_group_3' => 'required',
            'score_group_4' => 'required',
            'score_max' => 'required',
        ]);
    }
}
