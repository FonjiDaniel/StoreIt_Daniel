
'use client'
import React from 'react'

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Separator } from './ui/separator'
import { navItems } from '@/constants'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import FileUploader from './FileUploader'
import { logout } from '@/lib/actions/user.actions'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation';

interface Props {
  ownerId: string;
  accountId: string;
  fullName: string;
  email: string;
  avatar: string;
}

const MobileNavigation = ({ ownerId, accountId, fullName, email, avatar }: Props)  => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const submitLogout = async () => {
    try {
      await logout();
      router.push('/sign-in');
      toast.error("session deleted successfully");

    } catch (error) {
      console.error(error);
      toast.error('Failed to logout');

    }
  }


  return <header className='mobile-header'>
    <Image src="/assets/icons/logo-full-brand.svg" alt='logo' width={120} height={52} className='h-auto' />
    <Sheet>
      <SheetTrigger><Image src="/assets/icons/menu.svg" alt='logo' width={30} height={30} /></SheetTrigger>
      <SheetContent className='shad-sheet h-screen px-3'>
        <SheetTitle>
          <div className='header-user'>
            <Image src={avatar} alt='avatar' width={40} height={40} className='header-user-avatar' />
            <div className='sm:hidden lg:block' >
              <p className='subtitle-2 capitalize'>{fullName}</p>
              <p className='caption'>{email}</p>
            </div>

          </div>
          <Separator className='mb-4 bg-light-200/20' />
        </SheetTitle>
        <nav className='mobile-nav'>
          <ul
            className='mobile-nav-list'>
            {navItems.map((item) => (
              <Link key={item.name} href={item.url} className='lg:w-full'>

                <li className={cn("mobile-nav-item", pathname === item.url && "shad-active")}>
                  <Image className={cn('nav-icon', pathname === item.url && 'nav-icon-active ')} src={item.icon} alt={item.name} width={24} height={24} />
                  <p >{item.name}</p>
                </li>
              </Link>

            ))}

          </ul>

        </nav>
        <Separator className='my-5 bg-ligh-200/20' />
        <div className='flex flex-col justify-between gap-5'>
          <FileUploader ownerId={ownerId} accountId={accountId} fullName={fullName} email={email} avatar={avatar} />

          <Button type='submit' className='mobile-sign-out-button' onClick={submitLogout} >
            <Image src="/assets/icons/logout.svg" alt="upload" width={24} height={24} className='w-6' />
            <p>logout</p>
          </Button>

        </div>
      </SheetContent>
    </Sheet>

  </header>
}

export default MobileNavigation