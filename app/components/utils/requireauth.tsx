'use client';

import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import Spinner from "./spinner";
import React from 'react';
import { useEffect } from "react";

interface Props {
    children: React.ReactNode
}

function Requireauth({children}: Props) {
    
    const router = useRouter();
    const {isLoading, isAuthenticated} = useAppSelector(state => state.auth)


    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/auth/login");
        }
    }, [isLoading, isAuthenticated, router]);
    
    if(isLoading) {
        return (
            <div className="flex justify-center my-8">
                <Spinner lg/>
            </div>
        )
    }

    
    return <>{children}</>
}

export default Requireauth
