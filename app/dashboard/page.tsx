'use client';

import React from "react";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import Spinner from "../components/utils/spinner";
import UserOrders from "../components/userOrders";
import Link from "next/link";


function Dashboard() {
  const {data: user, isLoading, isError} = useRetrieveUserQuery();

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
      <h1 className="text-4xl justify-center">Welcome {user?.username}</h1>
      <div className="flex justify-between items-center mb-10">
        <h2 className="font-bold">Here is the overview of all the orders you&apos;ve made !</h2>
        <Link  href="create-order/" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Make order
        </Link>
      </div>
      <UserOrders />
    </main>
  );
}

export default Dashboard