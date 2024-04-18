'use client';

import React from 'react';
import { useOrderDetailsQuery, useDeleteOrderMutation } from '@/redux/features/ordersApiSlice';
import Spinner from '@/app/components/utils/spinner';
import { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface pageProps {
    params: {orderId: number}
}

function OrderDetails({ params }: pageProps) {

  const router = useRouter();

  const {data: orderdetail, isLoading, isError} = useOrderDetailsQuery(params.orderId);

  const [deleteOrder] = useDeleteOrderMutation();

  const updateDate = orderdetail?.updated_at;
  const date = updateDate ? new Date(updateDate) : null;

  let formattedupdateDate = null;

  if (date) {
    formattedupdateDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  } 
  const createdDate = orderdetail?.created_at;
  const createddate = createdDate ? new Date(createdDate) : null;

  let formattedcreatedDate = null;

  if (createddate) {
    formattedcreatedDate = `${createddate.getFullYear()}-${String(createddate.getMonth() + 1).padStart(2, '0')}-${String(createddate.getDate()).padStart(2, '0')}`;
  } 

  const onClick = (event: MouseEvent<HTMLButtonElement>, orderID: number) => {
    event.preventDefault();
    router.replace(`/update-order/${orderID}`)
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
      <div>
          <h1 className='text-6xl mb-6 flex justify-center'>Details of order number : {orderdetail?.id}</h1>
          <p className='text-2xl'>Size: {orderdetail?.size}</p>
          <p className='text-2xl'>Quantity: {orderdetail?.quantity}</p>
          <p className='text-2xl'>Order Status: {orderdetail?.order_status}</p>
          <p className='text-2xl'>Created date: {formattedcreatedDate}</p>
          <p className='text-2xl'>Updated date: {formattedupdateDate}</p>
      </div>

      {/* <div className='flex justify-start'>
          <div className='mt-5 mr-6'>
              <button  key={params.orderId} onClick={(event) => onClick(event, params.orderId)} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Update order
              </button>
          </div>

          <div className='mt-5 ml-6'>
              <button  key={params.orderId} onClick={(event) => onClickDelete(event, params.orderId)} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Delete order
              </button>
          </div>
      </div> */}

      
      
    </main>
  )
}

export default OrderDetails
