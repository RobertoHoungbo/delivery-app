'use client';

import React from 'react';
import { useOrderDetailsQuery, useDeleteOrderMutation } from '@/redux/features/ordersApiSlice';
import Spinner from '@/app/components/utils/spinner';
import { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

interface pageProps {
    params: {orderId: number}
}

function OrderDetails({ params }: pageProps) {

  const router = useRouter();

  const {data: orderdetail, isLoading, isError} = useOrderDetailsQuery(params.orderId);

  const updateDate = orderdetail?.updated_at;
  const date = updateDate ? new Date(updateDate) : null;

  let formattedupdateDate = null;

  if (date) {
    formattedupdateDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    formattedupdateDate = format(new Date(formattedupdateDate), 'MMMM dd, yyyy');
  } 
  const createdDate = orderdetail?.created_at;
  const createddate = createdDate ? new Date(createdDate) : null;

  let formattedcreatedDate = null;

  if (createddate) {
    formattedcreatedDate = `${createddate.getFullYear()}-${String(createddate.getMonth() + 1).padStart(2, '0')}-${String(createddate.getDate()).padStart(2, '0')}`;
    formattedcreatedDate = format(new Date(formattedcreatedDate), 'MMMM dd, yyyy');
  } 

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
      <h1 className='text-6xl mb-6 flex justify-center'>Order Details</h1>
        <div className='flex flex-col border rounded-box p-2'>
          <div className='flex justify-between'>
            <p>Id</p>
            <p>{orderdetail?.id}</p>
          </div>

          <hr className='mt-4 mb-4'/>

          <div className='flex justify-between'>
            <p>Size</p>
            <p>{orderdetail?.size}</p>
          </div>

          <hr className='mt-4 mb-4'/>

          <div className='flex justify-between'>
            <p>Quantity</p>
            <p>{orderdetail?.quantity}</p>
          </div>

          <hr className='mt-4 mb-4'/>

          <div className='flex justify-between'>
            <p>Order Status</p>
            <p>{orderdetail?.order_status}</p>
          </div>

          <hr className='mt-4 mb-4'/>

          <div className='flex justify-between'>
            <p>Created date</p>
            <p>{formattedcreatedDate}</p>
          </div>

          <hr className='mt-4 mb-4'/>

          <div className='flex justify-between'>
            <p>Updated date</p>
            <p>{formattedupdateDate}</p>
          </div>

        </div>
      
    </main>
  )
}

export default OrderDetails
