"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import PageHeading from "@/components/page-heading";
import { useCart } from "@/lib/cart";
import { formatPrice, RESTAURANT } from "@/data/config";
import { ordersService } from "@/lib/services/orders";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [type, setType] = useState<"delivery" | "pickup">("delivery");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const deliveryFee = type === "delivery" ? RESTAURANT.deliveryFee : 0;
  const total = subtotal + deliveryFee;

  const disabled = items.length === 0 || !name.trim() || !phone.trim() || (type === "delivery" && !address.trim());

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (disabled) return;
    const order = await ordersService.create({ customer: name, phone, address: type === "delivery" ? address : undefined, city, type, items, notes });
    setOrderId(order.id);
    clear();
    setDone(true);
  }

  if (done) {
    return (
      <section className="flex min-h-[80svh] items-center justify-center bg-navy px-5 py-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
          >
            <CheckCircle2 className="mx-auto text-orange" size={74} strokeWidth={1.5} />
          </motion.div>
          <p className="mt-6 font-display text-xs tracking-[0.3em] text-orange">ORDER RECEIVED</p>
          <h1 className="headline mt-3 text-[clamp(2.8rem,8vw,6rem)] leading-[0.85] text-white">
            YOUR BROTHERS
            <br />
            <span className="text-orange">ARE ON IT.</span>
          </h1>
          {orderId && (
            <p className="mt-6 font-display text-xl tracking-[0.2em] text-white">ORDER {orderId}</p>
          )}
          <Link href="/menu" className="mt-8 inline-flex bg-orange px-8 py-4 font-display text-black transition-colors hover:bg-white">
            BACK TO MENU →
          </Link>
        </motion.div>
      </section>
    );
  }

  return (
    <>
      <PageHeading eyebrow="BROTHERS FOOD / CHECKOUT" title="CHECKOUT">
        <p className="mt-6 max-w-xl text-black/75 text-lg">Complete your order. Payment is currently cash on delivery.</p>
      </PageHeading>

      <section className="bg-black py-16 md:py-24">
        <div className="mx-auto max-w-shell px-5 md:px-10 grid lg:grid-cols-[1.2fr_.8fr] gap-8">
          <form onSubmit={submit} className="bg-navy border border-white/10 p-6 md:p-9">
            <div className="grid sm:grid-cols-2 gap-4">
              <label>
                <span className="font-display text-white/50 text-xs tracking-[0.2em]">FULL NAME</span>
                <input value={name} onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full bg-black/40 border border-white/10 px-4 py-3 text-white outline-none focus:border-orange" />
              </label>
              <label>
                <span className="font-display text-xs tracking-[0.2em] text-white/50">PHONE NUMBER</span>
                <input value={phone} onChange={(e) => setPhone(e.target.value)}
                  className="mt-2 w-full bg-black/40 border border-white/10 px-4 py-3 text-white outline-none focus:border-orange" />
              </label>
              <label className="sm:col-span-2">
                <span className="font-display text-white/50 text-xs tracking-[0.2em]">CITY</span>
                <input value={city} onChange={(e) => setCity(e.target.value)}
                  className="mt-2 w-full bg-black/40 border border-white/10 px-4 py-3 text-white outline-none focus:border-orange" />
              </label>
            </div>

            <div className="mt-6">
              <p className="font-display text-white/50 text-xs tracking-[0.2em]">ORDER TYPE</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {(["delivery", "pickup"] as const).map((v) => (
                  <button type="button" key={v} onClick={() => setType(v)}
                    className={`py-3 font-display border ${type === v ? "bg-orange text-black border-orange" : "border-white/15 text-white/70"}`}>
                    {v.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {type === "delivery" && (
              <label className="block mt-6">
                <span className="font-display text-white/50 text-xs tracking-[0.2em]">ADDRESS</span>
                <input value={address} onChange={(e) => setAddress(e.target.value)}
                  className="mt-2 w-full bg-black/40 border border-white/10 px-4 py-3 text-white outline-none focus:border-orange" />
              </label>
            )}

            <div className="mt-6">
              <p className="font-display text-xs tracking-[0.2em] text-white/50">PAYMENT</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="border border-orange bg-orange px-2 py-3 text-center font-display text-[11px] leading-tight text-black sm:text-sm">CASH ON DELIVERY</div>
                <div className="border border-white/15 px-2 py-3 text-center font-display text-[11px] leading-tight text-white/35 sm:text-sm" aria-disabled="true">
                  ONLINE · SOON
                </div>
              </div>
            </div>

            <label className="mt-6 block">
              <span className="font-display text-xs tracking-[0.2em] text-white/50">NOTES</span>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4}
                className="mt-2 w-full resize-none bg-black/40 border border-white/10 px-4 py-3 text-white outline-none focus:border-orange" />
            </label>

            <button disabled={disabled} className="mt-6 w-full bg-orange text-black font-display py-4 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white transition-colors">
              CONFIRM ORDER →
            </button>
            <Link href="/menu" className="mt-4 flex items-center justify-center gap-2 text-white/50 hover:text-orange text-sm">
              <ArrowLeft size={16} /> Back to menu
            </Link>
          </form>

          <aside className="bg-navy border border-white/10 p-6 md:p-9 h-fit">
            <p className="font-display text-orange text-xs tracking-[0.25em]">ORDER SUMMARY</p>
            <div className="mt-5 space-y-4">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}-${item.extras.join(",")}`} className="flex justify-between gap-4 text-sm">
                  <span className="text-white/70">{item.qty} × {item.product.name}</span>
                  <span className="text-white">{formatPrice(item.qty * item.product.price)}</span>
                </div>
              ))}
              {items.length === 0 && <p className="text-white/40">Your cart is empty.</p>}
            </div>
            <div className="mt-6 border-t border-white/10 pt-5 space-y-2">
              <div className="flex justify-between text-white/60"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between text-white/60"><span>Delivery</span><span>{formatPrice(deliveryFee)}</span></div>
              <div className="pt-3 flex justify-between"><span className="font-display">TOTAL</span><span className="font-display text-orange text-2xl">{formatPrice(total)}</span></div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
