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
        'middleware' => ['auth:api', 'role']
    ], function () {
        Route::get('logout', [App\Http\Controllers\AuthController::class, 'logout']);
        Route::get('user', [App\Http\Controllers\AuthController::class, 'user']);
    });
});

Route::middleware(['auth:api', 'role', 'notBanned'])->group(function () {
    Route::get('/quizzes', [App\Http\Controllers\QuizController::class, 'index']);
    Route::post('/quizzes', [App\Http\Controllers\QuizController::class, 'store']);
    Route::get('/quizzes/random', [App\Http\Controllers\QuizController::class, 'getRandomQuizId']);
    Route::get('/quizzes/recommended', [App\Http\Controllers\QuizRecommendController::class, 'index']);
    Route::get('/quizzes/{quiz}', [App\Http\Controllers\QuizController::class, 'show']);
    Route::put('/quizzes/{quiz}', [App\Http\Controllers\QuizController::class, 'update']);
    Route::delete('/quizzes/{quiz}', [App\Http\Controllers\QuizController::class, 'destroy']);
    Route::get('/quizzes/{quiz}/edit', [App\Http\Controllers\QuizController::class, 'edit']);
    Route::get('/quizzes/{quiz}/scores', [App\Http\Controllers\QuizScoresController::class, 'show']);
    Route::get('/quizzes/{quiz}/myHighscore', [App\Http\Controllers\QuizScoresController::class, 'showMyHighScore']);
    Route::post('/quizzes/{quiz}/scores', [App\Http\Controllers\QuizScoresController::class, 'store']);
    Route::post('/quizzes/search', [App\Http\Controllers\QuizSearchController::class, 'filter']);
    Route::post('/quizzes/{quiz}/like', [App\Http\Controllers\QuizLikesController::class, 'like']);
    Route::post('/quizzes/{quiz}/dislike', [App\Http\Controllers\QuizLikesController::class, 'dislike']);
    Route::delete('/quizzes/{quiz}/like', [App\Http\Controllers\QuizLikesController::class, 'remove']);
    Route::get('/quizzes/{quiz}/comments', [App\Http\Controllers\QuizCommentsController::class, 'show']);
    Route::post('/quizzes/{quiz}/comments', [App\Http\Controllers\QuizCommentsController::class, 'store']);

    Route::get('/users', [App\Http\Controllers\UsersController::class, 'index']);
    Route::get('/users/{user}', [App\Http\Controllers\UsersController::class, 'show']);
    Route::get('/users/{user}/edit', [App\Http\Controllers\UsersController::class, 'edit']);
    Route::get('/users/{user}/quizzes', [App\Http\Controllers\UsersController::class, 'quizzes']);
    Route::put('/users/{user}', [App\Http\Controllers\UsersController::class, 'update']);
    Route::get('/users/{user}/scores', [App\Http\Controllers\UserScoresController::class, 'show']);
    Route::post('/users/{user}/follow', [App\Http\Controllers\UserFollowsController::class, 'index']);
    Route::get('/users/{user}/following', [App\Http\Controllers\UserFollowsController::class, 'following']);
    Route::post('/users/search', [App\Http\Controllers\UsersController::class, 'filter']);

    Route::post('/users/{user}/friendRequest', [App\Http\Controllers\FriendshipController::class, 'sendRequest']);
    Route::get('/friendships', [App\Http\Controllers\FriendshipController::class, 'index']);
    Route::get('/friendships/requests', [App\Http\Controllers\FriendshipController::class, 'requests']);
    Route::post('/friendships/{friendship}/acceptRequest', [App\Http\Controllers\FriendshipController::class, 'acceptRequest']);
    Route::delete('/friendships/{friendship}', [App\Http\Controllers\FriendshipController::class, 'rejectOrRemoveFriendship']);
    Route::get('/collaborators', [App\Http\Controllers\CollaboratorsController::class, 'index']);


    Route::get('/me/isAdmin', [App\Http\Controllers\MeController::class, 'isAdmin']);

    Route::post('/images', [App\Http\Controllers\ImagesController::class, 'store']);

    Route::delete('/scores/{score}', [App\Http\Controllers\ScoresController::class, 'destroy']);

    Route::get('/tags', [App\Http\Controllers\TagsController::class, 'index']);
    Route::get('/tags/{tag}', [App\Http\Controllers\TagsController::class, 'show']);


    Route::get('/dashboard/quizzes/followed', [App\Http\Controllers\DashboardController::class, 'getQuizzesByFollowedUser']);
    Route::get('/dashboard/quizzes/popular', [App\Http\Controllers\DashboardController::class, 'getPopularQuizzes']);
    Route::get('/dashboard/users/followed', [App\Http\Controllers\DashboardController::class, 'getFollowedUsers']);

    Route::get('/challenges', [App\Http\Controllers\ChallengesController::class, 'index']);
    Route::post('/challenges', [App\Http\Controllers\ChallengesController::class, 'store']);
    Route::post('/challenges/search', [App\Http\Controllers\ChallengesController::class, 'filter']);
    Route::get('/challenges/leaderboard', [App\Http\Controllers\ChallengesController::class, 'leaderboard']);
    Route::get('/challenges/{challenge}', [App\Http\Controllers\ChallengesController::class, 'show']);
    Route::delete('/challenges/{challenge}', [App\Http\Controllers\ChallengesController::class, 'destroy']);

    Route::get('/bans/quizzes/{quizBan}', [App\Http\Controllers\QuizBanController::class, 'show']);
});


//Admin Only
Route::middleware(['auth:api', 'admin', 'role'])->group(function () {
    Route::post('/tags', [App\Http\Controllers\TagsController::class, 'store']);
    Route::delete('/tags/{tag}', [App\Http\Controllers\TagsController::class, 'destroy']);
    Route::put('/tags/{tag}', [App\Http\Controllers\TagsController::class, 'update']);

    Route::post('/users/{user}/ban', [App\Http\Controllers\UsersController::class, 'ban']);
    Route::post('/users/{user}/unban', [App\Http\Controllers\UsersController::class, 'unban']);

    Route::post('/bans/quizzes/search', [App\Http\Controllers\QuizBanController::class, 'filter']);

    Route::post('/quizzes/{quiz}/ban', [App\Http\Controllers\QuizBanController::class, 'store']);
    Route::post('/quizzes/{quiz}/unban', [App\Http\Controllers\QuizBanController::class, 'remove']);
    Route::post('/quizzes/{quiz}/recommended/toggle', [App\Http\Controllers\QuizRecommendController::class, 'toggle']);
});
