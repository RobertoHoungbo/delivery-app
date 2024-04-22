"use client";

import React from "react";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useRetrieveUserOrdersQuery } from "@/redux/features/ordersApiSlice";
import Spinner from "../components/utils/spinner";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import Image from "next/image";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { toast } from "react-toastify";
import { useDeleteOrderMutation } from "@/redux/features/ordersApiSlice";
import Link from "next/link";


interface Order {
  id: number;
  size: string;
  quantity: number;
  order_status: string;
}



function pizzaImage(size: string) {

  let imagePath;

  switch (size) {
    case "SMALL":
      imagePath = "/small_pizza.jpeg";
      break;
    case "MEDIUM":
      imagePath = "/extraLarge_pizza.jpeg";
      break;
    case "LARGE":
      imagePath = "/large-pizza.webp";
      break;
    case "EXTRA_LARGE":
      imagePath = "/extraLarge_pizza.jpeg";
      break;
    default:
      imagePath = "";
  }

  return imagePath;
}

function UserOrders() {

  const [deleteOrder] = useDeleteOrderMutation();

  const router = useRouter();

  const { data: orders, isLoading, isError } = useRetrieveUserOrdersQuery();

  const onClick = (event: MouseEvent<HTMLButtonElement>, orderID: number) => {
    event.preventDefault();
    router.push(`dashboard/order-details/${orderID}`);
  };

  const onClickUpdate = (event: MouseEvent<HTMLButtonElement>, orderID: number) => {
    event.preventDefault();
    router.push(`update-order/${orderID}`);
  };

  const onClickDelete = (event: MouseEvent<HTMLButtonElement>, orderID: number) => {
    event.preventDefault();

    deleteOrder(orderID)
        .unwrap()

        .then(() => {
          toast.success('Successfully delete order !');
          router.push('/dashboard');
          router.refresh();
        })

        .catch(() => {
          toast.error('Failed to delete order !')
        })

  }

  let commands: Order[] = [];

  if (orders && Array.isArray(orders)) {
    commands = orders;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <Spinner lg />
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching orders</div>;
  }

  if (commands.length == 0) {
    return (
      <div className="text-6xl text-indigo-700">
        You have not make any order for now.
      </div>
    );
  }

  console.log(commands.length);

  return (
    <main>
      <div className="grid grid-cols-3 gap-4">
        {commands.map((order) => (
          <div
            key={order.id}
            className="flex flex-col mr-3 border rounded-box min-w-2xl mb-4"
          >
            <div className="flex justify-start p-2">
              <Image
                src={pizzaImage(order?.size)}
                alt="Pizza"
                width={80}
                height={80}
                className="rounded-box"
              />
              <p className="text-2xl font-semibold leading-8 text-gray-900 pt-4 pl-3">
                {order.size}
              </p>
              <Menu as="div" className={classNames(
                  'relative inline-block pt-5',
                  {
                    'ml-28': order?.size === 'EXTRA_LARGE',
                    'ml-44 pb-0': order?.size === 'SMALL',
                    'ml-44 pb-1': order?.size === 'MEDIUM',
                    'ml-44 pb-2': order?.size === 'LARGE',
                  },
                )}>
                <div>
                  <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white  p-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    <EllipsisHorizontalIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href={`dashboard/update-order/${order?.id}`}
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'px-4 py-2 text-sm w-full flex justify-start'
                            )}
                          >
                            Update order
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={(event) => onClickDelete(event, order.id)}
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'px-4 py-2 text-sm w-full flex justify-start'
                            )}
                          >
                            Delete order
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              
            </div>

            <hr className="mt-4 mb-4"/>

            <div className="flex flex-col p-2">
              <div className="flex justify-start">
                <p>Amount </p>
                <p className="ml-64">{order.quantity}</p>
              </div>
              
              <hr className="mt-4 mb-4"/>
              <div className="flex justify-start">
                <p >Status </p>
                <div className="flex rounded-box bg-lime-200 min-w-28 items-center justify-center ml-56">
                  <p>{order?.order_status}</p>
                </div>
              </div>
              <hr className="mt-4 mb-4"/>
            </div>

            <div className=" flex justify-center p-6 ">
              <button
                key={order.id}
                onClick={(event) => onClick(event, order.id)}
                className="rounded-2xl bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
              >
                View details
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default UserOrders;
