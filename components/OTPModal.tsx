
"use client";
import React, { useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { sendEmailOTP, verifySecret } from '@/lib/actions/user.actions';
import { toast } from 'react-hot-toast';





const OTPModal = ({ email, accountId , fullName}: { email: string; accountId: string , fullName: string}) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState('');


    const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            console.log(password);
            console.log(fullName)
            const sessionId = await verifySecret({ accountId, password });
            if (sessionId) {
                toast.success("welcome" + "  "  + fullName , {
                    style: {
                      border: '1px solid #713200',
                      padding: '16px',
                      color: '#023e8a',
                    },
                    iconTheme: {
                      primary: '#9fffcb',
                      secondary: '#FFFAEE',
                    },
                  });
                 router.push('/');
                    
               
            }
        }
        catch (error) {
            toast.error('failed to verify email');
            console.log('failed to verify email', error)
        }

        setIsLoading(false);

    }

    const handleResendOTP = async () => {

        await sendEmailOTP({ email });
        toast.success('email resent successfully');

    }
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger>Open Dialogue</AlertDialogTrigger>
            <AlertDialogContent className='shad-alert-dialog'>
                <AlertDialogHeader className='relative flex justify-cente'>
                    <AlertDialogTitle className='h1 flex justify-center'>Enter OTP
                        <Image
                            onClick={() => setIsOpen(false)}
                            src="/assets/icons/close-dark.svg"
                            alt="close"
                            className='otp-close-button'
                            width={20}
                            height={20}
                        />
                    </AlertDialogTitle>
                    <AlertDialogDescription className='flex justify-center'>
                        We&apos;ve sent a code to {email}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <InputOTP maxLength={6} value={password} onChange={setPassword}>
                    <InputOTPGroup className='shad-otp'>
                        <InputOTPSlot index={0} className='shad-otp-slot' />
                        <InputOTPSlot index={1} className='shad-otp-slot' />
                        <InputOTPSlot index={2} className='shad-otp-slot' />
                        <InputOTPSlot index={3} className='shad-otp-slot' />
                        <InputOTPSlot index={4} className='shad-otp-slot' />
                        <InputOTPSlot index={5} className='shad-otp-slot' />
                    </InputOTPGroup>
                </InputOTP>

                <AlertDialogFooter>
                    <div className='flex  flex-col w-full justify-center gap-4'>
                        <AlertDialogAction className='shad-submit-btn h-12 ' type='button' onClick={handleSubmit}>Submit
                            {isLoading && <Image src="/assets/icons/loader.svg" alt="loader" width={20} height={20} />}
                        </AlertDialogAction>
                        <button onClick={handleResendOTP}>Did&apos;nt recieve Code ? <span className='text-brand'>click to resend</span></button>


                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default OTPModal