"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { quote, type Config } from "@/lib/product";

export type CartItem = Config & {
  id: string;
  qty: number;
  unitPrice: number;
};

type CartContextValue = {
  items: CartItem[];
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (cfg: Config, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const KEY = "quietera-cart-v2";

function same(a: Config, b: Config) {
  return (
    a.category === b.category &&
    a.color === b.color &&
    a.size === b.size &&
    a.material === b.material &&
    a.pack === b.pack
  );
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const add = useCallback((cfg: Config, qty = 1) => {
    const price = quote(cfg).price;
    setItems((prev) => {
      const existing = prev.find((i) => same(i, cfg));
      if (existing) {
        return prev.map((i) => (i.id === existing.id ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { ...cfg, id: `${Date.now()}-${Math.random()}`, qty, unitPrice: price }];
    });
    setOpen(true);
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)).filter((i) => i.qty > 0));
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((n, i) => n + i.unitPrice * i.qty, 0),
    [items],
  );

  const value = useMemo(
    () => ({ items, open, setOpen, add, setQty, remove, clear, count, subtotal }),
    [items, open, add, setQty, remove, clear, count, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
