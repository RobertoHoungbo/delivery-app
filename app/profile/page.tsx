'use client';

import React from 'react';
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import Spinner from "../components/utils/spinner";
import Image from 'next/image';

function UserProfile() {

  
  const {data: user, isLoading, isError} = useRetrieveUserQuery();

  const image = `http://localhost:8000${user?.profile_pic}`
 

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
      <div className='flex justify-center mb-4'>
        <h1 className="text-4xl">User profile</h1>
      </div>
      <div className='flex justify-start'>

            <div className='mr-5'>
                <Image src={image} alt='Bob' width={200} height={100} priority className='rounded-full' />
            </div>

            <div className='mt-10 ml-4'>
                <hr />
                <p className="text-2xl">Username: {user?.username}</p>
                <hr />
                <p className="text-2xl">E-mail: {user?.email}</p>
                <hr />
                <p className="text-2xl">Phone: {user?.phone_number}</p>
                <hr />
            </div>
      </div>
      
    </main>
  )
}

export default UserProfile
