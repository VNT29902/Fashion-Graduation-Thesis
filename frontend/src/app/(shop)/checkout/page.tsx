"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import api from "@/lib/axios";
import { ApiResponse } from "@/types/auth";

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
import { Textarea } from "@/components/ui/textarea"; // Using Textarea for address
import { Separator } from "@/components/ui/separator";

// Validation Schema
const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  note: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;
type PlaceOrderResponse = { id: string };

export default function CheckoutPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 1. Setup Form
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
      note: "",
    },
  });

  // 2. Setup Mutation
  const orderMutation = useMutation({
    mutationFn: async (values: CheckoutFormValues) => {
        // Backend expects { shippingAddress } inside body
        // We might need to adjust based on exact backend DTO.
        // Assuming PlaceOrderRequest(String shippingAddress)
        // We'll concatenate values for now or just send address.
        const payload = {
            shippingAddress: `${values.fullName}, ${values.phone}, ${values.address} ${values.note ? `(Note: ${values.note})` : ''}`
        };
        const response = await api.post<ApiResponse<PlaceOrderResponse>>("/orders/place", payload);
        return response.data.data;
    },
    onSuccess: () => {
        toast.success("Order placed successfully!");
        queryClient.invalidateQueries({ queryKey: ["cart"] }); // Cart is now empty
        // Redirect to success page or order history
        router.push("/checkout/success"); 
    },
    onError: (error: unknown) => {
        const axiosError = error as AxiosError<{ message?: string }>;
        console.error("Order failed:", error);
        toast.error(axiosError.response?.data?.message || "Failed to place order. Please try again.");
    }
  });

  function onSubmit(values: CheckoutFormValues) {
    orderMutation.mutate(values);
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/cart" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Cart
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Column: Form */}
        <div>
           <div className="mb-8">
             <h1 className="text-3xl font-bold mb-2">Checkout</h1>
             <p className="text-muted-foreground">Please enter your shipping details.</p>
           </div>

           <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="0912345678" type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shipping Address</FormLabel>
                      <FormControl>
                        <Textarea 
                            placeholder="123 Street Name, District, City" 
                            className="resize-none min-h-[100px]"
                            {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                 <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order Note (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Gate code, delivery instructions..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full text-lg h-12" disabled={orderMutation.isPending}>
                    {orderMutation.isPending ? (
                         <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                         </>
                    ) : (
                        "Place Order"
                    )}
                </Button>
            </form>
          </Form>
        </div>

        {/* Right Column: Trust Badges / Info */}
        <div className="hidden md:flex flex-col justify-center space-y-8 p-8 bg-secondary/10 rounded-xl">
             <div className="flex items-start gap-4">
                 <ShieldCheck className="h-10 w-10 text-primary" />
                 <div>
                     <h3 className="font-bold text-lg">Secure Payment</h3>
                     <p className="text-muted-foreground text-sm">Your payment information is processed securely. We do not store credit card details.</p>
                 </div>
             </div>
             {/* Can add more trust signals here */}
             <Separator />
             <div className="text-center">
                 <p className="font-medium">Need Help?</p>
                 <p className="text-sm text-muted-foreground">Contact us at support@fashionthesis.com</p>
             </div>
        </div>
      </div>
    </div>
  );
}
