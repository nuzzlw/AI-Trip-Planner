'use client'
import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { Button } from '@/components/ui/button';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';

const menuOptions = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Pricing',
    path: '/pricing'
  },
  {
    name: 'Contact us',
    path: '/contact-us'
  }
]

function Header() {
  const { user } = useUser();

  return (
    <div className='flex justify-between items-center p-4 bg-transparent'>
      {/* Logo */}
      <div className='flex gap-2 items-center'>
        <Image src={'/logo.svg'} alt='logo' width={30} height={30} />
        <h2 className='font-bold text-2xl'>Ai Trip Planner</h2>
      </div>

      {/* Menu options */}
      <div className='flex gap-8 items-center'>
        {menuOptions.map((menu, index) => (
          <Link key={index} href={menu.path}>
            <h2 className='text-lg hover:scale-105 transition-all hover:text-primary'>{menu.name}</h2>
          </Link>
        ))}
      </div>

      {/* Buttons */}
      <div className='flex gap-3 items-center'>
        {!user ? (
          <SignInButton mode='modal'>
            <Button>Get started</Button>
          </SignInButton>
        ) : (
          <>
            <Link href={'/my-trips'}>
              <Button variant='outline'>My Trips</Button>
            </Link>
            <Link href={'/create-new-trip'}>
              <Button>Create New Trip</Button>
            </Link>
          </>
        )}
        <UserButton />
      </div>
    </div>
  )
}

export default Header