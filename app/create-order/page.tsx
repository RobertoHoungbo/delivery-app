'use client';

import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function CreateOrder() {

    const router = useRouter();
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("auth/login");
        }
      }, [isAuthenticated, router]);

    if (isAuthenticated) {
        return (
            <div>
                Create an order
            </div>
        )
    }

    }

export default CreateOrder
