import { Product, ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const featuredProducts: Product[] = [
    {
        id: "1",
        name: "Oversized Cotton T-Shirt",
        price: 49.99,
        category: "Tops",
        image: "bg-slate-200", // placeholder class
        isNew: true,
    },
    {
        id: "2",
        name: "Classic Denim Jacket",
        price: 129.99,
        salePrice: 89.99,
        category: "Outerwear",
        image: "bg-blue-100",
        isSale: true,
    },
    {
        id: "3",
        name: "Slim Fit Chino Pants",
        price: 69.99,
        category: "Bottoms",
        image: "bg-stone-200",
    },
    {
        id: "4",
        name: "Minimalist Leather Sneakers",
        price: 159.00,
        category: "Footwear",
        image: "bg-gray-100",
    },
    {
        id: "5",
        name: "Textured Knit Sweater",
        price: 79.99,
        category: "Knitwear",
        image: "bg-orange-100",
        isNew: true,
    },
    {
        id: "6",
        name: "Waterproof Trench Coat",
        price: 249.99,
        category: "Outerwear",
        image: "bg-amber-100",
    },
    {
        id: "7",
        name: "Linen Blend Shorts",
        price: 55.00,
        salePrice: 35.00,
        category: "Bottoms",
        image: "bg-emerald-100",
        isSale: true,
    },
    {
        id: "8",
        name: "Canvas Tote Bag",
        price: 39.99,
        category: "Accessories",
        image: "bg-yellow-100",
    },
];

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

export function FeaturedProducts() {
    return (
        <section className="container mx-auto px-4 py-16 md:py-24">
            <div className="flex flex-col md:flex-row items-end justify-between gap-4 mb-10">
                <div className="space-y-2">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Featured Collection</h2>
                    <p className="text-muted-foreground text-lg max-w-[600px]">
                        Handpicked essentials for your seasonal wardrobe.
                    </p>
                </div>
                <Button variant="ghost" className="gap-2 group" asChild>
                    <Link href="/shop">
                        View All Products <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </div>

            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-4">
                    {featuredProducts.map((product) => (
                        <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/4">
                            <ProductCard product={product} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="flex justify-end gap-2 mt-6">
                    <CarouselPrevious className="relative left-0 top-0 translate-y-0 h-10 w-10 border-primary/20 hover:bg-primary hover:text-primary-foreground" />
                    <CarouselNext className="relative right-0 top-0 translate-y-0 h-10 w-10 border-primary/20 hover:bg-primary hover:text-primary-foreground" />
                </div>
            </Carousel>
        </section>
    );
}
