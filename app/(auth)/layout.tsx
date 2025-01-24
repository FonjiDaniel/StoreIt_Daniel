import React from 'react'
import Image from 'next/image';
import { redirect} from 'next/navigation';
import { getCurrentUser } from '@/lib/actions/user.actions';


const AuthLayout = async ({ children } : { children: React.ReactNode }) => {
    const user = await getCurrentUser();
    if(user){ 
        redirect('/')  ;
    }
   
    return (
        <div className='flex  min-h-screen'>
            <section className="hidden w-1/2 items-center justify-center bg-brand p-10 lg:flex xl:w-2/5">
                <div>
                    <Image src="assets/icons/logo-full-brand.svg" alt='logo + text' width={200} height={200}>

                    </Image>
                    <div className='flex flex-col items-center'>
                        <h1 className='h1 text-white'>Manage your files the best way</h1>
                        <p className='body-1 text-white mt-8'>This is a place where you can store all your documents.</p>
                        <div>
                            <Image src="/assets/images/files.png" alt='file image' height={300} width={300} className="transition-all hover:rotate-2 hover:scale-105"
                            ></Image>
                        </div>

                    </div>
                </div>
            </section>
            <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
                <div className="mb-16 lg:hidden">
                    <Image
                        src="/assets/icons/logo-full-brand.svg"
                        alt="logo"
                        width={224}
                        height={82}
                        className="h-auto w-[200px] lg:w-[250px]"
                    />
                </div>

                {children}
            </section>
        </div>
    )
}

export default AuthLayout