"use client";

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createAccount, handleError, login } from '@/lib/actions/user.actions';
import OTPModal from './OTPModal';
import { toast } from 'react-hot-toast';

type FormType = "sign-in" | "sign-up";
const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    fullName:
      formType === "sign-up"
        ? z.string().min(2).max(50)
        : z.string().optional(),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState<string | null>(null);

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });




  async function onSubmitRegister(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsLoading(true);

    try {
      const user = await createAccount({ fullName: values.fullName || '', email: values.email });
      console.log(user);
      setAccountId(user.accountId);
      // setIsOpen(true)
      toast.success('Email sent successfully');
    } catch (error) {
      handleError(error, "failed to create account");
      setErrorMessage(String(error));
    } finally {
      setIsLoading(false);
    }
  }


  const onSubmitLogin = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const user = await login({ email: values.email });
      setAccountId(user.accountId);
      console.log(accountId);
      if(accountId) {
          toast.success('Email sent successfully');
      }
    

    } catch (error) {
      toast.error('failed to login');
      handleError(error, "failed to login");

    } finally {
      setIsLoading(false);
    }

  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(type === "sign-up" ? onSubmitRegister : onSubmitLogin)} className="space-y-8 auth-form">
          <h1 className='h1'>{type === "sign-in" ? "Sign In" : "Sign Up"}</h1>
          {type === "sign-up" && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel className="shad-form-label">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        className="shad-input"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="form-submit-button"
            disabled={isLoading}
          >
            {type === "sign-in" ? "Sign In" : "Sign Up"}
            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="loader"
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}
          </Button>

          {errorMessage && <p className="error-message">*{errorMessage}</p>}

          <div className="body-2 flex justify-center">
            <p className="text-light-100">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="ml-1 font-medium text-brand"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        </form>

      </Form>
      {accountId && <OTPModal email={form.getValues('email')} accountId={accountId || ''} />}
    </>
  );
};

export default AuthForm;