"use client";

import { CartProvider } from "@/components/cart-context";
import { CartDrawer } from "@/components/cart-drawer";
import { Footer, Header } from "@/components/chrome";
import { ThemeProvider } from "@/components/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CartProvider>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <CartDrawer />
      </CartProvider>
    </ThemeProvider>
  );
}
