<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class AdminDeactivateController extends Controller
{
    public function deactivate(Request $request)
    {
        $id = $request->id;
        try {
            if ($users = \DB::table('users')->where('id', $id)->update(['status' => 'deactive'])) {
                return response()->json(['status' => 201], 201);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 300], 300);
        }
    }
}
