'use client';

import React from 'react';
import { useOrderDetailsQuery } from '@/redux/features/ordersApiSlice';
import Spinner from '@/app/components/utils/spinner';
import { useUpdateOrderMutation } from '@/redux/features/ordersApiSlice';
import { useRouter } from 'next/navigation';
import { useState, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';

interface pageProps {
    params: {orderId: number}
}

function UpdateOrder({ params }: pageProps) {

    const router = useRouter();
    const [updateOrder] = useUpdateOrderMutation();

    

    const order_id = params.orderId

    
    const {data: orderdetail, isLoading, isError} = useOrderDetailsQuery(params.orderId);

    const [formData, setFormData] = useState({
        size: orderdetail?.size,
        quantity: orderdetail?.quantity,
    });

    const { size, quantity} = formData;

    const onChange = (event : ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = event.target;

        setFormData({...formData, [name]: value})
    }

    const created_at = orderdetail?.created_at;

    const updated_at = new Date();

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        updateOrder({ order_id , size, quantity , created_at , updated_at})

            .unwrap()
            

            .then(() => {
                toast.success('Successfully update order');
                router.push('/dashboard'); 
                router.refresh();
            }
            )

            .catch(() => {
                toast.error('Failed to update order')
            })


    }
    
  const quantityOptions = Array.from({ length: 20 }, (_, i) => i + 1);
  
  if (isLoading) {
    return <div className="flex justify-center my-8">
      <Spinner lg/>
    </div>
  }

  if (isError) {
    return <div>Error fetching order details</div>;
  }
  return (
    <main>
      <h2 className='mb-10 text-4xl '>Update your order here !</h2>

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
                {isLoading ? <Spinner sm /> : 'Appy updates'}
            </button>

        </form>
            
    </main>
  )
}

export default UpdateOrder
