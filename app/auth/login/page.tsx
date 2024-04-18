/* eslint-disable @next/next/no-img-element */
'use client';

import { ChangeEvent, useState, FormEvent } from 'react';
import React from 'react';
import { setAuth } from '@/redux/features/authSlice';
import { AppDispatch } from '@/redux/store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Spinner from '@/app/components/utils/spinner';
import { useLoginMutation } from '@/redux/features/authApiSlice';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@/redux/hooks';

function Login() { 
    const router = useRouter();

    const dispatch = useAppDispatch();

    const [login, {isLoading} ] = useLoginMutation();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password} = formData;

    const onChange = (event : ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        setFormData({...formData, [name]: value})
    }

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        login({ email, password })
            .unwrap()

            .then(() => {
                dispatch(setAuth());
                toast.success('Successfully logged in');
                router.push('/dashboard'); 
            }
            )

            .catch(() => {
                toast.error('Failed to Login')
            })


    }

  return (
    <main>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login to your account
          </h2>
        </div>

        
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={onSubmit}>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={onChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
            
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={onChange}
                  required
                  className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? <Spinner sm /> : 'Login'}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </main>
    
  )
}

export default Login
