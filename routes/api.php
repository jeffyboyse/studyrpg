<?php
 
// routes/api.php
 
use App\Http\Controllers\StudySessionController;
use Illuminate\Support\Facades\Route;
 
/*
|--------------------------------------------------------------------------
| Study Sessions API
|--------------------------------------------------------------------------
|
| Öppet API (ingen auth) för nu.
| Byt ut 'api' mot ['api', 'auth:sanctum'] när du vill skydda det.
|
*/

Route::get('/sessions', [StudySessionController::class, 'index']);
Route::get('/sessions/{studySession}', [StudySessionController::class, 'show']);