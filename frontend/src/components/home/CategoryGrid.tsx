import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const categories = [
    {
        id: "men",
        title: "MEN",
        href: "/shop/men",
        image: "bg-slate-300", // placeholder
        description: "Sharp tailoring & casual essentials"
    },
    {
        id: "women",
        title: "WOMEN",
        href: "/shop/women",
        image: "bg-stone-300", // placeholder
        description: "Contemporary silhouettes for her"
    },
    {
        id: "accessories",
        title: "ACCESSORIES",
        href: "/shop/accessories",
        image: "bg-neutral-300", // placeholder
        description: "The perfect finishing touches"
    },
];

export function CategoryGrid() {
    return (
        <section className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[400px] md:h-[600px]">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={category.href}
                        className="group relative overflow-hidden rounded-lg block h-full w-full"
                    >
                        {/* Background Image Placeholder */}
                        <div className={`absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105 ${category.image}`} />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />

                        {/* Content */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                            <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-3xl font-black tracking-tighter uppercase">{category.title}</h3>
                                    <ArrowUpRight className="h-6 w-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                                </div>
                                <p className="text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    {category.description}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
