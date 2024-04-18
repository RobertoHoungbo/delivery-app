'use client';

import React from 'react'
import { useRetrieveUserOrdersQuery } from '@/redux/features/ordersApiSlice';
import Spinner from '../components/utils/spinner';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

interface Order{
  id: number;
  size: string;
  quantity: number;
  order_status: string;
}

function UserOrders() {

  const router = useRouter();

  const {data: orders, isLoading, isError} = useRetrieveUserOrdersQuery();

  const onClick = (event: MouseEvent<HTMLButtonElement>, orderID: number) => {
    event.preventDefault();
    router.push(`order-details/${orderID}`)
}

  let commands: Order[] = [];

  if (orders && Array.isArray(orders)) {
    commands = orders;
  }


  if (isLoading) {
    return <div className="flex justify-center my-8">
      <Spinner lg/>
    </div>
  }

  if (isError) {
    return <div>Error fetching orders</div>;
  }

  if (commands.length == 0) {
    return (
      <div className='text-6xl text-indigo-700'>
        You have not make any order for now.
      </div>
    )
  }

  console.log(commands.length)

  return (
    <ul role="list" className="divide-y-2 divide-gray-100 border p-2 pt-3 ">
      <li className="flex font-bold">
            <div className="min-w-0 flex-auto">
                <p className="text-sm leading-8 text-gray-900">Size & Quantity</p>
            </div>
            <div className="mt-1  items-center pr-80">
                <p className="text-sm leading-8 text-gray-900 ">Status</p>
            </div>
            <div>
              <p className="text-sm leading-8 text-gray-900">Details</p>
            </div>
        </li>
      {commands.map((order) => (
        <li key={order.id} className="flex py-5 hover: text-indigo-800 ">
          <div className="min-w-0 flex-auto pt-2">
            <p className="text-sm font-semibold leading-8 text-gray-900">{order.size}</p>
            <p className="mt-1 truncate text-xs leading-2 text-gray-500">{order.quantity}</p>
            
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-center pr-44 pt-2">
            <div className="mt-1 justify-center flex items-center ">
              <div className="flex-none justify-center rounded-full bg-emerald-500/20 p-1">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              <p className="text-xs justify-center leading-5 text-gray-500 pr-20">{order.order_status}</p>
            </div>
          </div>
          <div className='justify-center pt-2'>
            <button  key={order.id} onClick={(event) => onClick(event, order.id)} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              View details
            </button>
          </div>
        </li>
      ))
    } </ul>
    
  )
}

export default UserOrders
