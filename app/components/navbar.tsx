'use client';

/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Disclosure } from '@headlessui/react';
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { logout as setLogout } from "@/redux/features/authSlice";
import { useLogoutMutation } from "@/redux/features/authApiSlice";
import { useRouter, usePathname } from "next/navigation";
import Navlink from "./navlink";


export default function Navbar() {

  const router = useRouter();

  const pathname = usePathname();

  const dispatch = useAppDispatch();

  const [logout] = useLogoutMutation();

  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  const handleLogout = () => {
    logout(undefined)
      .unwrap()

      .then(() => {
        dispatch(setLogout());
        router.push('/');
        window.location.reload();
      });
  }

  const authLinks = (isMobile: boolean) => (
    <>
      <Navlink
        isSelected={pathname === '/dashboard' ? true : false }
        isMobile={isMobile}
        href='/dashboard'
      >
          Dashboard
      </Navlink>

      <Navlink
        isMobile={isMobile} onClick={handleLogout}>
          Logout
      </Navlink>
    </>
  );

  const guestLinks = (isMobile: boolean) => (
    <>
      <Navlink
        isSelected={pathname === '/auth/login' ? true : false }
        isMobile={isMobile}
        href='/auth/login'
      >
          Login
      </Navlink>

      <Navlink
        isSelected={pathname === '/auth/register' ? true : false }
        isMobile={isMobile}
        href='/auth/register'
      >
          Register
      </Navlink>
    </>
  );

  return (
    <Disclosure as="nav" className="bg-indigo-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 max-h-40">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                    <Navlink href="/" isBanner>
                      Home
                    </Navlink>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                     {isAuthenticated 
                     ? authLinks(false) 
                     : guestLinks(false)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {isAuthenticated 
                  ? authLinks(true) 
                  : guestLinks(true)}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
