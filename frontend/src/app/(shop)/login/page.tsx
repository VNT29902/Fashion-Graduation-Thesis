"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import api from "@/lib/axios";
import { ApiResponse, AuthenticationResponse } from "@/types/auth";

// Validation Schema
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await api.post<ApiResponse<AuthenticationResponse>>("/auth/authenticate", values);
      const accessToken = response.data.data?.accessToken;

      if (!accessToken) {
        throw new Error("Missing access token from authentication response");
      }
      
      // Store token in cookie (expires in 1 day)
      Cookies.set("token", accessToken, { expires: 1 });
      
      toast.success("Login successful! Redirecting...", {
        duration: 2000,
      });

      // Provide a small delay for user to see the success message
      setTimeout(() => {
        router.push("/");
        router.refresh(); // Refresh to update auth state in UI
      }, 1000);

    } catch (error) {
      console.error("Login error:", error);
      let message = "Something went wrong. Please try again.";
      if (error && typeof error === 'object' && 'response' in error) {
        const axErr = error as { response?: { status?: number } };
        message = axErr.response?.status === 403 
          ? "Invalid email or password." 
          : "Something went wrong. Please try again.";
      }
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full lg:grid lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
      {/* Visual Side */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-muted text-muted-foreground p-10 relative overflow-hidden">
         <div className="absolute inset-0 bg-zinc-900 border-r border-zinc-800" />
         <div className="relative z-20 flex flex-col items-center text-center space-y-4">
            <h2 className="text-4xl font-bold tracking-tighter text-white">Welcome Back</h2>
            <p className="text-lg text-zinc-400 max-w-sm">
                Log in to access your exclusive fashion collection and saved items.
            </p>
         </div>
      </div>

      {/* Form Side */}
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Login</h1>
            <p className="text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href="/forgot-password"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>
          
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>

          <div className="relative my-4">
             <div className="absolute inset-0 flex items-center">
                 <span className="w-full border-t border-zinc-200" />
             </div>
             <div className="relative flex justify-center text-xs uppercase">
                 <span className="bg-white px-2 text-zinc-500">Or continue with</span>
             </div>
          </div>

          <Button
              variant="outline"
              type="button"
              className="w-full h-11 border-zinc-200 hover:bg-zinc-50"
              onClick={() => {
                  window.location.href = 'http://localhost:8080/oauth2/authorization/google';
              }}
          >
             <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                 <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                 <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                 <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                 <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
             </svg>
             Log in with Google
          </Button>

        </div>
      </div>
    </div>
  );
}
