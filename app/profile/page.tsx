'use client';

import React from 'react';
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import Spinner from "../components/utils/spinner";
import Image from 'next/image';

function UserProfile() {

  
  const {data: user, isLoading, isError} = useRetrieveUserQuery();

  const image = user?.profile_pic 
  ? `http://localhost:8000${user.profile_pic}`
  : '/profile.png';
 

    if (isLoading) {
      return <div className="flex justify-center my-8">
        <Spinner lg/>
      </div>
    }
  
    if (isError) {
      return <div>Error fetching user</div>;
    }

  return (
    <main className="pt-4">
      <h1 className="text-4xl flex justify-center">User profile</h1>
      <div className='flex justify-normal '>

            <div className='mr-20 '>
                <Image src={image} alt='Bob' width={100} height={80} priority className='rounded-full' />
            </div>

            <div className='mt-10 w-1/3'>
                <div className='flex justify-between'>
                  <p className='text-2xl'>Username</p>
                  <p className='text-2xl'>{user?.username}</p>
                </div>

                <hr className='mb-4 mt-4'/>

                <div className='flex justify-between'>
                  <p className='text-2xl'>E-mail</p>
                  <p className='text-2xl'>{user?.email}</p>
                </div>

                <hr className='mb-4 mt-4'/>

                <div className='flex justify-between'>
                  <p className='text-2xl'>Phone</p>
                  <p className='text-2xl'>{user?.phone_number}</p>
                </div>

                <hr className='mb-4 mt-4'/>
            </div>
      </div>
      
    </main>
  )
}

export default UserProfile
