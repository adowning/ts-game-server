<?php 
namespace VanguardLTE\Http\Controllers\Api\Auth
{
    include_once(base_path() . '/app/ShopCore.php');
    include_once(base_path() . '/app/ShopGame.php');
    class AuthController extends \VanguardLTE\Http\Controllers\Api\ApiController
    {
        public function __construct()
        {
            $this->middleware('guest')->only('login');
            $this->middleware('auth')->only('logout');
        }
        public function login(\VanguardLTE\Http\Requests\Auth\LoginRequest $request)
        {

            // $token = auth('api')->attempt($request->getCredentials());
            // $payload = auth()->payload();
             // = ['sub' => 123, 'exp' => 123456, 'jti' => 'asfe4fq434asdf'] etc
            //  logger('token '  . $token);

            // $credentials = $request->getCredentials();

            $user = \Auth::getProvider()->retrieveByCredentials($request->getCredentials());

            $token = auth()->login($user);
            logger('token '  . $token);

            $token = auth()->tokenById($user->id);

            logger('token '  . $token);


            // if( settings('use_email') ) 
            // {
            //     if( filter_var($credentials['username'], FILTER_VALIDATE_EMAIL) ) 
            //     {
            //         $credentials = [
            //             'email' => $credentials['username'], 
            //             'password' => $credentials['password']
            //         ];
            //     }
            //     else
            //     {
            //         $credentials = [
            //             'username' => $credentials['username'], 
            //             'password' => $credentials['password']
            //         ];
            //     }
            // }
            // try
            // {
            //     if( !($token = JWTAuth::attempt($credentials)) ) 
            //     {
            //         return $this->errorUnauthorized('Invalid credentials.');
            //     }
            // }
            // catch( \PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException $e ) 
            // {
            //     return $this->errorInternalError('Could not create token.');
            // }
            // $user = auth()->user();                                      
            if( $user->isBlocked() ) 
            {
                return $this->errorUnauthorized('Your shop is blocked.');
            }
            if( settings('use_email') && $user->isUnconfirmed() ) 
            {
                return $this->errorUnauthorized(trans('app.please_confirm_your_email_first'));
            }
            if( $user->isBanned() ) 
            {
                $this->invalidateToken($token);
                return $this->errorUnauthorized('Your account is banned by administrators.');
            }
            if( !isset($request->skip_event) ) 
            {
                event(new \VanguardLTE\Events\User\LoggedIn());
            }
            $id = $user->id;
            \VanguardLTE\User::where('id', '=', $id)->update(['api_token' => $token]);
            return $this->respondWithArray(compact('token'));
        }
        private function invalidateToken($token)
        {
            JWTAuth::setToken($token);
            JWTAuth::invalidate();
        }
        public function logout()
        {
            event(new \VanguardLTE\Events\User\LoggedOut());
            auth()->logout();
            return $this->respondWithSuccess();
        }
    }

}
