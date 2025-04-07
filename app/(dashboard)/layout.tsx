import React from 'react';
import Sidebar from '@/components/Sidebar';
import MobileNavigation from '@/components/MobileNavigation';
import Header from '@/components/Header';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/actions/user.actions';
import { Toaster } from "@/components/ui/toaster"


export const Layout =  async ({ children }: { children: React.ReactNode }) => {


    const currentUser = await getCurrentUser();
    // console.log(currentUser);

    if(!currentUser) return redirect('/sign-in');
    return (

        <main className='flex h-screen text-brand-100'>
            <Sidebar {...currentUser}/>
            <section className='flex h-full flex-1 flex-col'>
                <MobileNavigation {...currentUser} /> <Header {...currentUser} />
                <div className='main-content'>
                    {children}
                </div>
                <Toaster />

            </section>
        </main>
    );
};

export default Layout;