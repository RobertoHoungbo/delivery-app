'use client';

import { makeStore } from "./store";
import { Provider } from "react-redux";

interface Props {
    children: React.ReactNode;
}

import React from 'react'

function CustomProvider({ children }: Props) {
  return (
    <Provider store={makeStore()}>{children}</Provider>
  )
}

export default CustomProvider
