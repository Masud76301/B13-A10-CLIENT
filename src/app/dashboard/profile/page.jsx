'use client'


import UpdateModal from '@/components/dashboard/UpdateModal';
import { authClient } from '@/lib/auth-client';
import { Avatar, AvatarFallback, AvatarImage, Card } from '@heroui/react';
import Image from 'next/image';
import React from 'react';

const ProfilePage = () => {
    const { data: session, error } = authClient.useSession();
    const user = session?.user;
    console.log(user?.name);
    return (
        <div className='container m-auto h-[80vh] ' >

            <Card className=' w-[90vw] md:w-96 mx-auto border flex flex-col justify-center items-center p-10 my-10'>

                    <Avatar className='w-30 h-30'>
                        <AvatarImage src={user?.image} referrerPolicy='no-referrer' />
                        <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h1 className='text-2xl font-bold'>{user?.name}</h1>
                    <p className='italic text-blue-600'>{user?.email}</p>
                    <UpdateModal></UpdateModal>
            </Card>



        </div>
    );
};

export default ProfilePage;