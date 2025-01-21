import React from 'react';
import Sidebar from '@/components/Sidebar';
import MobileNavigation from '@/components/MobileNavigation';
import Header from '@/components/Header';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/actions/user.actions';


export const Layout =  async ({ children }: { children: React.ReactNode }) => {


    const currentUser = await getCurrentUser();
    console.log(currentUser);

    if(!currentUser) return redirect('/sign-in');
    return (

        <main className='flex h-screen'>
            <Sidebar {...currentUser}/>
            <section>
                <MobileNavigation {...currentUser} /> <Header />
                <div className='main-content'>
                    {children}
                </div>
            </section>
        </main>
    );
};

export default Layout;