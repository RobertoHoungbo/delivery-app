'use client';

import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Spinner from '../components/utils/spinner';
import { useCreateOrderMutation } from '@/redux/features/ordersApiSlice';
import { toast } from 'react-toastify';
import { useState, ChangeEvent, FormEvent } from 'react';

function CreateOrder() {

    const router = useRouter();
    const [createOrder, {isLoading}] = useCreateOrderMutation();

    const [formData, setFormData] = useState({
        size: 'SMALL',
        quantity: 1,
    });

    const { size, quantity} = formData;

    const onChange = (event : ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = event.target;

        setFormData({...formData, [name]: value})
    }

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createOrder({ size, quantity })

            .unwrap()
            

            .then(() => {
                toast.success('Successfully create order');
                router.push('/dashboard'); 
                router.refresh();
            }
            )

            .catch(() => {
                toast.error('Failed to create order')
            })


    }

    
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    const quantityOptions = Array.from({ length: 20 }, (_, i) => i + 1);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("auth/login");
        }
      }, [isAuthenticated, router]);

    if (isAuthenticated) {
        return (
            <div>
                <h2 className='mb-10 text-4xl '>Make your order here !</h2>

                <form  className='justify-between' onSubmit={onSubmit}>

                    <div className='mb-2'>
                        <label htmlFor="size" className='font-extrabold'>Size :  </label>
                        <select id="size" name="size" className='rounded-md' value={size}  onChange={onChange} >
                            <option value="SMALL" >Small</option>
                            <option value="MEDIUM" >Medium</option>
                            <option value="LARGE" >Large</option>
                            <option value="EXTRA_LARGE" >Extra_Large</option>
                        </select>
                    </div>

                    <div className='mb-5'>
                        <label htmlFor="quantity" className='font-extrabold'>Quantity : </label>
                        <select id="quantity" name="quantity" value={quantity} onChange={onChange}>
                            {quantityOptions.map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button 
                        type="submit"
                        className="flex w-70 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        {isLoading ? <Spinner sm /> : 'Make order'}
                    </button>

                </form>
            </div>
        )
    }

    }

export default CreateOrder
