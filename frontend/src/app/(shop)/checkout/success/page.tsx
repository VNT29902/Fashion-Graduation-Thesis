"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrderSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center space-y-6">
      <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle2 className="h-12 w-12 text-green-600" />
      </div>
      
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Thank You!</h1>
        <h2 className="text-xl font-medium text-muted-foreground">Your order has been placed successfully.</h2>
      </div>

      <p className="text-muted-foreground max-w-md">
        We have received your order and are getting it ready to be shipped. You will receive an email confirmation shortly.
      </p>

      <div className="flex gap-4 pt-4">
        <Button asChild size="lg">
          <Link href="/shop">Continue Shopping</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/account/orders">View Order</Link>
        </Button>
      </div>
    </div>
  );
}
