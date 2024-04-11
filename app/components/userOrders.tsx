'use client';

import React from 'react'
import { useRetrieveUserOrdersQuery } from '@/redux/features/ordersApiSlice';
import Spinner from '../components/utils/spinner';

interface Order{
  id: number;
  size: string;
  quantity: number;
  order_status: string;
}

function UserOrders() {

  const {data: orders, isLoading, isError} = useRetrieveUserOrdersQuery();

  let order: Order[] = [];

  if (orders && Array.isArray(orders)) {
    order = orders;
  }


  if (isLoading) {
    return <div className="flex justify-center my-8">
      <Spinner lg/>
    </div>
  }

  if (isError) {
    return <div>Error fetching orders</div>;
  }

  return (
    <ul role="list" className="divide-y-2 divide-gray-100 border p-2 pt-3">
      <li className="flex justify-between gap-x-6 py-5 font-bold">
            <div className="min-w-0 flex-auto">
                <p className="text-sm leading-8 text-gray-900">Size & Quantity</p>
            </div>
            <div className="mt-1 flex items-center gap-x-1.5">
                <p className="text-sm leading-8 text-gray-900">Status</p>
            </div>
        </li>
      {order.map((order) => (
        <li key={order.id} className="flex justify-between gap-x-6 py-5">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-8 text-gray-900">{order.size}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order.quantity}</p>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs leading-5 text-gray-500">{order.order_status}</p>
              </div>
            
          </div>
        </li>
      ))
    } </ul>
  )
}

export default UserOrders
