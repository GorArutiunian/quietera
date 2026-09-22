"use client";

import { CartProvider } from "@/components/cart-context";
import { CartDrawer } from "@/components/cart-drawer";
import { Footer, Header } from "@/components/chrome";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      {children}
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
