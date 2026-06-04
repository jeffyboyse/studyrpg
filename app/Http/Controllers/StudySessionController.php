<?php
 
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use App\Models\StudySession;
use Illuminate\Http\Request;
 
class StudySessionController extends Controller
{
    /**
     * GET /api/sessions
     *
     * Returnerar alla studiesessioner, nyaste först.
     * Valfria query-parametrar:
     *   ?subject=Matte        — filtrera på ämne
     *   ?per_page=10          — antal per sida (default 15)
     */
    public function index(Request $request)
    {
        $query = StudySession::latest();
 
        // Filtrera på ämne om ?subject=... skickades med
        if ($request->filled('subject')) {
            $query->where('subject', $request->subject);
        }
 
        $sessions = $query->paginate($request->integer('per_page', 15));
 
        return response()->json([
            'data'       => $sessions->items(),
            'pagination' => [
                'current_page' => $sessions->currentPage(),
                'last_page'    => $sessions->lastPage(),
                'per_page'     => $sessions->perPage(),
                'total'        => $sessions->total(),
            ],
        ]);
    }
 
    /**
     * GET /api/sessions/{id}
     *
     * Returnerar en enskild session.
     */
    public function show(StudySession $studySession)
    {
        return response()->json([
            'data' => $studySession,
        ]);
    }
}