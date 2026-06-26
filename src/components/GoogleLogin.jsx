import { authClient } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import { FcGoogle } from 'react-icons/fc';


const GoogleLogin = () => {
    const handleGoogleLogin = async()=>{
        const data = await authClient.signIn.social({
         provider: "google",
  });
    }
    return (
        <div className='w-[80%] mx-auto flex justify-center my-4'>
            <Button onClick={handleGoogleLogin}  variant="tertiary" className="rounded-sm">
                <FcGoogle/>
                Sign in with Google
            </Button>
        </div>
    );
};

export default GoogleLogin;