<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\LookingFor;

class SuggestionController extends Controller
{
    public function getSuggestions(Request $request)
    {
        $username = $request->username;

        try {
            //$user1ID = User::where('username', $username)->get(['id']);

            $userId = User::where('username', $username)->get(['id'])[0]->id;

            $userPreferences = self::userPreferences($userId);

            $location = $userPreferences[0]->location;
            $minage = $userPreferences[0]->mixage;
            $maxage = $userPreferences[0]->maxage;
            $status = $userPreferences[0]->status;
            $shortterm = $userPreferences[0]->shortterm;
            $longterm = $userPreferences[0]->longterm;
            $causalsex = $userPreferences[0]->causalsex;

            //$result = User::orderBy(\DB::raw('RAND()'))->limit(3)->get();
            $users = User::orderBy(\DB::raw('RAND()'))->get();

            $suggestedUsers = [];

            foreach ($users as $user) {
                $id = $user->id;
                $takenUserPreferences = self::userPreferences($id);
                $locationT = $takenUserPreferences[0]->location;
                $minageT = $takenUserPreferences[0]->mixage;
                $maxageT = $takenUserPreferences[0]->maxage;
                $statusT = $takenUserPreferences[0]->status;
                $shorttermT = $takenUserPreferences[0]->shortterm;
                $longtermT = $takenUserPreferences[0]->longterm;
                $causalsexT = $takenUserPreferences[0]->causalsex;

                $locationMatch = self::matchLocation($userId, $id, $location, $locationT);
                $ageMatch = self::matchAge($minage, $maxage, $minageT, $maxageT);
                $statusMatch = self::matchStatus($status, $statusT);
                $longTermMatch = self::matchLongTermRel($shortterm, $shorttermT);
                $shortTermMatch = self::matchShortTermRel($shortterm, $shorttermT);
                $casualSexMatch = self::matchCasualSex($causalsex, $causalsexT);

                $matchPercentage = self::calculateMatchPercentage($locationMatch, $ageMatch, $statusMatch, $longTermMatch, $shortTermMatch, $casualSexMatch);
                if ($matchPercentage >= 0.45) {
                    array_push($suggestedUsers, $user);
                }
            }

            if (! $result->isEmpty()) {
                return response()->json(['status' => 200, 'suggestions' => $suggestedUsers], 200);
            } else {
                return response()->json(['status' => 200, 'suggestions' => null], 200);
            }
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 200], 200);
        }
    }

    private function userPreferences($userId)
    {
        $lookingForData = LookingFor::where('user_id', $userId)->get();

        return $lookingForData;
    }

    private function matchLocation($userId1, $userId2, $user1Location, $user2Location)
    {
        if ($user1Location == 0) {
            return true;
        } else {
            $user1LocationCode = User::where('id', $userId1)->get()[0]->country;
            $user2LocationCode = User::where('id', $userId2)->get()[0]->country;

            if ($user1LocationCode == $user2LocationCode) {
                return true;
            } else {
                return false;
            }
        }
    }

    private function matchAge($user1MinAge, $user1MaxAge, $user2MinAge, $user2MaxAge)
    {
        if ($user1MaxAge < $user2MinAge || $user1MaxAge > $user2MaxAge) {
            return false;
        } else {
            return true;
        }
    }

    private function matchStatus($user1Status, $user2Status)
    {
        if ($user1Status == $user2Status) {
            return true;
        } else {
            return false;
        }
    }

    private function matchLongTermRel($user1Rel, $user2Rel)
    {
        if ($user1Rel == $user2Rel) {
            return true;
        } else {
            return false;
        }
    }

    private function matchShortTermRel($user1Rel, $user2Rel)
    {
        if ($user1Rel == $user2Rel) {
            return true;
        } else {
            return false;
        }
    }

    private function matchCasualSex($user1Cs, $user2Cs)
    {
        if ($user1Cs == $user2Cs) {
            return true;
        } else {
            return false;
        }
    }

    private function calculateMatchPercentage($locationMatch, $ageMatch, $statusMatch, $longTermMatch, $shortTermMatch, $casualSexMatch)
    {
        $matchPercentage;
        if ($locationMatch) {
            $matchPercentage = 0.20;
        }
        if ($ageMatch) {
            $matchPercentage += 0.30;
        }
        if ($statusMatch) {
            $matchPercentage += 0.10;
        }
        if ($longTermMatch) {
            $matchPercentage += 0.15;
        }
        if ($shortTermMatch) {
            $matchPercentage += 0.15;
        }
        if ($casualSexMatch) {
            $matchPercentage += 0.05;
        }

        return $matchPercentage;
    }
}
