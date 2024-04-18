import Link from "next/link";
import cn from "classnames";
import React, { Children } from 'react'

interface Props {
    isSelected?: boolean;
    isMobile?: boolean;
    isBanner?: boolean;
    href?: string;
    children: React.ReactNode;
    [rest: string]: any;
}
function Navlink({
    isSelected,
    isMobile,
    isBanner,
    href,
    children,
    ...rest } : Props) {
    
    const className = cn (
        rest.className,
        'text-white round-md px-3 py-2 font-medium flex justify-between',
        {
            'bg-gray-900 round-md': isSelected,
            'text-gray-300 hover:bg-gray-700 hover:text-white': !isSelected && !isBanner,
            'block text-base': !isMobile,
            'text-sm': !isMobile,
            'text-gray-300': isBanner,
        }
    );

    if (!href) {
        return(
            <span className={className} role="button" onClick={rest.onClick}> 
                {children}
            </span>
        );
    }
  return (
    <Link className={className} href={href}>
        {children}
    </Link>
  )
}

export default Navlink

