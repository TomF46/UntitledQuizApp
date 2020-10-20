<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', [App\Http\Controllers\AuthController::class, 'login']);
    Route::post('register', [App\Http\Controllers\AuthController::class, 'register']);

    Route::group([
        'middleware' => 'auth:api'
    ], function () {
        Route::get('logout', [App\Http\Controllers\AuthController::class, 'logout']);
        Route::get('user', [App\Http\Controllers\AuthController::class, 'user']);
    });
});

Route::middleware('auth:api')->group(function () {
    Route::get('/quiz', [App\Http\Controllers\QuizController::class, 'index']);
    Route::post('/quiz', [App\Http\Controllers\QuizController::class, 'store']);
    Route::get('/quiz/{quiz}', [App\Http\Controllers\QuizController::class, 'show']);
    Route::put('/quiz/{quiz}', [App\Http\Controllers\QuizController::class, 'update']);
    Route::delete('/quiz/{quiz}', [App\Http\Controllers\QuizController::class, 'destroy']);
    Route::get('/quiz/{quiz}/edit', [App\Http\Controllers\QuizController::class, 'edit']);
    Route::get('/quiz/{quiz}/scores', [App\Http\Controllers\QuizScoresController::class, 'show']);
    Route::post('/quiz/{quiz}/scores', [App\Http\Controllers\QuizScoresController::class, 'store']);
    Route::post('/quiz/search', [App\Http\Controllers\QuizSearchController::class, 'filter']);
    Route::post('/quiz/{quiz}/like', [App\Http\Controllers\QuizLikesController::class, 'like']);
    Route::post('/quiz/{quiz}/dislike', [App\Http\Controllers\QuizLikesController::class, 'dislike']);
    Route::delete('/quiz/{quiz}/like/remove', [App\Http\Controllers\QuizLikesController::class, 'remove']);

    Route::get('/dashboard/quizzes/followed', [App\Http\Controllers\DashboardController::class, 'getQuizzesByFollowedUser']);

    Route::delete('/scores/{score}', [App\Http\Controllers\ScoresController::class, 'destroy']);




    Route::get('/users', [App\Http\Controllers\UsersController::class, 'index']);
    Route::get('/users/{user}', [App\Http\Controllers\UsersController::class, 'show']);
    Route::get('/users/{user}/edit', [App\Http\Controllers\UsersController::class, 'edit']);
    Route::get('/users/{user}/quizzes', [App\Http\Controllers\UsersController::class, 'quizzes']);
    Route::put('/users/{user}', [App\Http\Controllers\UsersController::class, 'update']);
    Route::get('/users/{user}/scores', [App\Http\Controllers\UserScoresController::class, 'show']);
    Route::post('/users/{user}/follow', [App\Http\Controllers\UserFollowsController::class, 'index']);
    Route::get('/users/{user}/following', [App\Http\Controllers\UserFollowsController::class, 'following']);









    Route::get('/tags', [App\Http\Controllers\TagsController::class, 'index']);
});
