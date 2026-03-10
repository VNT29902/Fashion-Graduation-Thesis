import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    isNew?: boolean;
    isSale?: boolean;
    salePrice?: number;
}

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Card className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-0 relative aspect-[3/4] overflow-hidden bg-secondary/10">
                {/* Badges */}
                <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                    {product.isNew && <Badge className="bg-blue-600 hover:bg-blue-700">NEW</Badge>}
                    {product.isSale && <Badge variant="destructive">SALE</Badge>}
                </div>

                {/* Wishlist Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 z-20 h-9 w-9 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm hover:bg-background rounded-full"
                >
                    <Heart className="h-5 w-5" />
                    <span className="sr-only">Add to wishlist</span>
                </Button>

                {/* Product Image Placeholder (Gradient/Color for now) */}
                {/* Product Image Placeholder (Gradient/Color for now) */}
                <Link href={`/product/${product.id}`} className="block w-full h-full">
                    <div className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${product.image}`} />
                </Link>

                {/* Quick Add Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                    <Button className="w-full gap-2 shadow-lg" size="lg" asChild>
                        <Link href={`/product/${product.id}`}>
                            <ShoppingCart className="h-4 w-4" /> Select Options
                        </Link>
                    </Button>
                </div>
            </CardContent>

            <CardFooter className="flex flex-col items-start gap-1 p-4">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {product.category}
                </p>
                <Link href={`/product/${product.id}`} className="font-semibold text-lg hover:underline decoration-1 underline-offset-4 line-clamp-1">
                    {product.name}
                </Link>
                <div className="flex items-center gap-2 mt-1">
                    {product.isSale && product.salePrice ? (
                        <>
                            <span className="font-bold text-lg">${product.salePrice.toFixed(2)}</span>
                            <span className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                        </>
                    ) : (
                        <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}
