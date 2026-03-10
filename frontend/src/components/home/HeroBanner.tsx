"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const banners = [
    {
        id: 1,
        title: "NEW COLLECTION 2026",
        subtitle: "The Future of Fashion is Here",
        description: "Experience the perfect blend of sustainable materials and avant-garde design. Our 2026 collection redefines luxury for the modern era.",
        cta: "Shop Now",
        bgClass: "bg-gradient-to-r from-stone-200 to-stone-400 dark:from-stone-900 dark:to-stone-950",
        image: "/models/hero-1.jpg" // Placeholder for now, using gradient
    },
    {
        id: 2,
        title: "URBAN MINIMALISM",
        subtitle: "Effortless Style for City Life",
        description: "Clean lines, neutral tones, and premium fabrics. Elevate your everyday wardrobe with our curated urban essentials.",
        cta: "Explore Urban",
        bgClass: "bg-gradient-to-r from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900",
    },
    {
        id: 3,
        title: "SUMMER EDIT",
        subtitle: "Sun-Kissed Sophistication",
        description: "Lightweight linens and breezy silhouettes ready for your next getaway. Embrace the season in comfort and style.",
        cta: "View Summer",
        bgClass: "bg-gradient-to-r from-orange-50 to-amber-100 dark:from-orange-950/30 dark:to-amber-900/30",
    },
];

export function HeroBanner() {
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );

    return (
        <section className="w-full">
            <Carousel
                plugins={[plugin.current]}
                className="w-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {banners.map((banner) => (
                        <CarouselItem key={banner.id}>
                            <div className={`relative h-[calc(100dvh-4rem)] min-h-[500px] w-full flex items-center justify-center overflow-hidden ${banner.bgClass}`}>
                                {/* Abstract overlay shapes for visual interest */}
                                <div className="absolute inset-0 opacity-30">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/20 rounded-full blur-3xl" />
                                </div>

                                <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center space-y-4 max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700">
                                    <span className="inline-block rounded-full bg-background/50 px-4 py-1.5 text-sm font-semibold tracking-wider backdrop-blur-sm uppercase">
                                        {banner.subtitle}
                                    </span>
                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-foreground uppercase">
                                        {banner.title}
                                    </h1>
                                    <p className="text-lg md:text-xl text-muted-foreground max-w-[600px]">
                                        {banner.description}
                                    </p>
                                    <Button size="lg" className="h-12 px-8 text-base rounded-full gap-2 transition-all hover:scale-105">
                                        {banner.cta} <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 border-none bg-background/20 hover:bg-background/40 backdrop-blur-sm h-12 w-12" />
                <CarouselNext className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 border-none bg-background/20 hover:bg-background/40 backdrop-blur-sm h-12 w-12" />
            </Carousel>
        </section>
    );
}
