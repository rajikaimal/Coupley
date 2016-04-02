<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class SuggestionController extends Controller
{
    public function getSuggestions(Request $request)
    {
        $username = $request->username;

        try {
            //$user1ID = User::where('username', $username)->get(['id']);

            $result = User::orderBy(\DB::raw('RAND()'))->limit(3)->get();

            if (! $result->isEmpty()) {
                return response()->json(['status' => 200, 'suggestions' => $result], 200);
            } else {
                return response()->json(['status' => 200, 'suggestions' => null], 200);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }
}
