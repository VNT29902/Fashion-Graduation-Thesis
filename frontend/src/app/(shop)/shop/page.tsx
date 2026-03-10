"use client";

import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/product/ProductCard";
import { Loader2 } from "lucide-react";

export default function ShopPage() {
    const { data: products, isLoading, isError } = useProducts();

    if (isLoading) {
        return (
            <div className="flex h-[50vh] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex h-[50vh] w-full items-center justify-center text-destructive">
                Failed to load products. Please try again later.
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Shop All</h1>
                <p className="text-muted-foreground">
                    Explore our latest collection of premium fashion essentials.
                </p>
            </header>

            {products && products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-muted-foreground">
                    No products found.
                </div>
            )}
        </div>
    );
}
