import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HeroBanner } from "@/components/home/HeroBanner";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <HeroBanner />
            <CategoryGrid />
            <FeaturedProducts />

            {/* Additional Section: Brand Values / Newsletter can be added here */}
            <section className="bg-secondary/30 py-20">
                <div className="container mx-auto px-4 text-center space-y-8">
                    <h2 className="text-3xl font-bold tracking-tight">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="p-6 bg-background rounded-2xl shadow-sm">
                            <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <h3 className="font-bold text-lg mb-2">Quality Guarantee</h3>
                            <p className="text-muted-foreground text-sm">We ensure every piece meets our strict quality standards before shipping.</p>
                        </div>
                        <div className="p-6 bg-background rounded-2xl shadow-sm">
                            <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <h3 className="font-bold text-lg mb-2">Fast Shipping</h3>
                            <p className="text-muted-foreground text-sm">Express delivery options available for all orders worldwide.</p>
                        </div>
                        <div className="p-6 bg-background rounded-2xl shadow-sm">
                            <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            </div>
                            <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
                            <p className="text-muted-foreground text-sm">Our dedicated support team is always ready to assist you.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
