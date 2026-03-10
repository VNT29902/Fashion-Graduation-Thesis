import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground mt-auto">
            <div className="container mx-auto px-4 py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold tracking-widest uppercase">Fashion.Thesis</h3>
                        <p className="text-sm text-primary-foreground/80 leading-relaxed max-w-xs">
                            Redefining modern elegance. Sustainable materials meets contemporary design for the conscious consumer.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="hover:text-primary-foreground/70 transition-colors">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="#" className="hover:text-primary-foreground/70 transition-colors">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link href="#" className="hover:text-primary-foreground/70 transition-colors">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-sm font-bold uppercase tracking-widest">Shop</h4>
                        <ul className="space-y-3 text-sm text-primary-foreground/70">
                            <li><Link href="/shop" className="hover:text-primary-foreground transition-colors">All Products</Link></li>
                            <li><Link href="/new-arrivals" className="hover:text-primary-foreground transition-colors">New Arrivals</Link></li>
                            <li><Link href="/featured" className="hover:text-primary-foreground transition-colors">Featured Collection</Link></li>
                            <li><Link href="/accessories" className="hover:text-primary-foreground transition-colors">Accessories</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-sm font-bold uppercase tracking-widest">Support</h4>
                        <ul className="space-y-3 text-sm text-primary-foreground/70">
                            <li><Link href="/faq" className="hover:text-primary-foreground transition-colors">FAQ</Link></li>
                            <li><Link href="/shipping" className="hover:text-primary-foreground transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="/sizing" className="hover:text-primary-foreground transition-colors">Sizing Guide</Link></li>
                            <li><Link href="/contact" className="hover:text-primary-foreground transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-sm font-bold uppercase tracking-widest">Newsletter</h4>
                        <p className="text-sm text-primary-foreground/70">
                            Join our exclusive community for early access to drops and events.
                        </p>
                        <form className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="YOUR EMAIL"
                                className="bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 px-4 py-2 text-sm focus:outline-none focus:border-primary-foreground/50 transition-colors"
                                aria-label="Email address"
                            />
                            <button
                                type="submit"
                                className="bg-primary-foreground text-primary px-4 py-2 text-sm font-bold tracking-widest hover:bg-white/90 transition-colors uppercase"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-primary-foreground/10 text-center text-xs text-primary-foreground/50 tracking-wide">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p>&copy; {new Date().getFullYear()} FASHION.THESIS. All rights reserved.</p>
                        <div className="flex gap-6">
                            <Link href="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-primary-foreground transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
