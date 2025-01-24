
'use client'
import React from 'react'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Search from './Search'
import FileUploader from './FileUploader'
import { logout } from '@/lib/actions/user.actions'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
// import {  redirect } from 'next/navigation'



const Header = () => {
    const router = useRouter();

    const submitLogout = async ( e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
          await logout();
          router.push('/sign-in');
          toast.success('Logged out successfully');
    
        } catch (error) {
          console.error(error);
          toast.error('Failed to logout');
    
        }
      }
    
    return (
        <header className='header'>
        <Search />
            <div className='header-wrapper'>
            <FileUploader />
                <form>
                    <Button  type = 'submit' className='sign-out-button' onClick={submitLogout}>
                        <Image src="/assets/icons/logout.svg" alt="upload" width={24} height={24} className='w-6' />
                    </Button>
                </form>
            </div>

        </header>
    )
}

export default Header