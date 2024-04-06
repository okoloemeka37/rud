<?php

namespace App\Http\Controllers;

use App\Models\User;

use App\Http\Requests\LoginRequest;

use App\Http\Requests\RegisterRequest;

use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    function login(LoginRequest $request)  {
        $data=$request->validated();

        if (!Auth::attempt($data)) {
            return response([
                'message'=>'wrong credentials'
            ]);
        }
        $user=Auth::user();

        $token=$user->createToken("main")->plainTextToken;
        return response()->json([
            'user'=>$user,
            'token'=>$token
        ]);

    }
    function register(RegisterRequest $request){
        $data=$request->validated();
        $user=User::create([
            'name'=>$data['name'],
            'email'=>$data['email'],
            'password'=>bcrypt($data['password'])
        ]);
        $token=$user->createToken("main")->plainTextToken;

        return response()->json([
            'user'=>$user,
            'token'=>$token
        ]);
    }

    function logout(Request $request )  {
        $user=$request->user();
        $user->currentAccessToken()->delete();
        return response("",204);
    }

}
