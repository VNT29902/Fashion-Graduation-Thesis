"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

// Types matching Backend DTOs
type CartItem = {
  id: string;
  productVariantId: string;
  productName: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  subtotal: number;
};

type Cart = {
  id: string;
  items: CartItem[];
  totalAmount: number;
};

// API Functions
const fetchCart = async (): Promise<Cart> => {
  const { data } = await api.get("/cart");
  return data;
};

export default function CartPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Queries
  const { data: cart, isLoading, isError } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
    retry: false, // Don't retry if 401/404
  });

  // Mutations
  const updateMutation = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      await api.put("/cart/update", { cartItemId: itemId, quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      toast.error("Failed to update cart");
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (itemId: string) => {
      await api.delete(`/cart/remove/${itemId}`);
    },
    onSuccess: () => {
        toast.success("Item removed");
        queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
        toast.error("Failed to remove item");
    }
  });

  const handleQuantityChange = (itemId: string, currentQty: number, delta: number) => {
    const newQty = currentQty + delta;
    if (newQty < 1) return;
    updateMutation.mutate({ itemId, quantity: newQty });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Shopping Bag</h1>
        <div className="space-y-4">
           {[1, 2, 3].map((i) => (
               <Skeleton key={i} className="h-24 w-full" />
           ))}
        </div>
      </div>
    );
  }

  // Empty State - Check if cart exists and has items
  if (!cart || !cart.items || cart.items.length === 0 || isError) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center space-y-6">
        <div className="h-24 w-24 bg-secondary/30 rounded-full flex items-center justify-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold">Your bag is empty</h1>
        <p className="text-muted-foreground max-w-md">
          Looks like you haven't added anything to your bag yet. Start browsing our collection to find something you love.
        </p>
        <Button asChild size="lg" className="mt-4">
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 tracking-tight">Shopping Bag ({cart.items.length})</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-8">
            <div className="space-y-6">
                {cart.items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border rounded-lg bg-card group transition-colors hover:border-primary/20">
                        {/* Placeholder Image - Backend DTO doesn't have image yet */}
                        <div className="h-24 w-20 bg-secondary rounded-md object-cover flex-shrink-0" />
                        
                        <div className="flex-1 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-lg">{item.productName}</h3>
                                    <p className="text-sm text-muted-foreground">Size: {item.size} | Color: {item.color}</p>
                                </div>
                                <p className="font-bold text-lg">
                                    {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item.price)}
                                </p>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <div className="flex items-center gap-2 border rounded-md p-1">
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-6 w-6"
                                        disabled={updateMutation.isPending || item.quantity <= 1}
                                        onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                                    >
                                        <Minus className="h-3 w-3" />
                                    </Button>
                                    <span className="text-sm w-4 text-center">{updateMutation.isPending ? "..." : item.quantity}</span>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-6 w-6"
                                        disabled={updateMutation.isPending}
                                        onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                                    >
                                        <Plus className="h-3 w-3" />
                                    </Button>
                                </div>
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                    onClick={() => removeMutation.mutate(item.id)}
                                    disabled={removeMutation.isPending}
                                >
                                    {removeMutation.isPending ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Trash2 className="h-4 w-4 mr-2" />
                                    )}
                                    Remove
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-card border rounded-lg p-6 sticky top-24 shadow-sm">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cart.totalAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="text-green-600 font-medium">Free</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cart.totalAmount)}</span>
                    </div>
                </div>
                <Button className="w-full mt-6" size="lg" asChild>
                    <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
                <div className="mt-4 text-xs text-center text-muted-foreground">
                    Secure Checkout - 30 Day Returns
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
