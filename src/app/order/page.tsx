"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const shippingOptions = [
  { id: "standard", label: "Standard Shipping", eta: "3–5 business days", cost: 0 },
  { id: "express", label: "Express Shipping", eta: "1–2 business days", cost: 19 },
  { id: "priority", label: "Priority Overnight", eta: "Next business day", cost: 35 },
];

const colors = [
  { id: "black", label: "Midnight Black", swatch: "#111111" },
  { id: "silver", label: "Platinum Silver", swatch: "#d6d6d6" },
];

export default function OrderPage() {
  const [shipping, setShipping] = useState("standard");
  const [finish, setFinish] = useState("black");
  const [quantity, setQuantity] = useState(1);
  const [orderStatus, setOrderStatus] = useState<"idle" | "success">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const shippingCost = useMemo(() => {
    const selected = shippingOptions.find((option) => option.id === shipping);
    return selected?.cost ?? 0;
  }, [shipping]);

  const selectedFinish = useMemo(
    () => colors.find((color) => color.id === finish) ?? colors[0],
    [finish]
  );

  const subtotal = 399 * quantity;
  const total = subtotal + shippingCost;

  useEffect(() => {
    return () => {
      if (submitTimeoutRef.current) {
        clearTimeout(submitTimeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    if (submitTimeoutRef.current) {
      clearTimeout(submitTimeoutRef.current);
      submitTimeoutRef.current = null;
    }

    setIsSubmitting(true);
    setOrderStatus("idle");

    submitTimeoutRef.current = setTimeout(() => {
      setOrderStatus("success");
      setIsSubmitting(false);
      submitTimeoutRef.current = null;
    }, 900);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute -left-32 top-16 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-32 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_60%)]" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-6 py-24 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-xl space-y-4">
            <Badge className="bg-white/15 text-white/80 border-white/25">Limited Pre-Order</Badge>
            <h1 className="text-3xl font-light tracking-tight md:text-4xl">
              Complete your Audionix WH‑1000XM5 order
            </h1>
            <p className="text-base text-white/70 md:text-lg">
              Personalize your build, choose delivery preferences, and secure a pair of our flagship
              noise canceling headphones in just a few steps.
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            className="rounded-full border-white/20 bg-white/5 px-6 py-5 text-sm text-white hover:bg-white/10"
          >
            <Link href="/">← Back to showcase</Link>
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Order Summary</CardTitle>
              <CardDescription className="text-white/60">
                Review your selection and confirm the configuration before checkout.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-black/40 p-5 md:flex-row md:items-center md:gap-6">
                <div className="relative mx-auto h-28 w-28 flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-[0_12px_35px_rgba(17,24,39,0.6)] md:mx-0 md:h-32 md:w-32">
                  <Image
                    src="/images/xm5.avif"
                    alt="Audionix WH-1000XM5 headphones"
                    fill
                    priority
                    className="object-cover object-center"
                  />
                </div>
                <div className="space-y-2 text-center md:text-left">
                  <p className="text-lg font-medium text-white">Audionix WH‑1000XM5</p>
                  <p className="text-sm text-white/60">
                    Adaptive noise canceling, Hi‑Res Audio + LDAC, 30mm precision drivers.
                  </p>
                  <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                    Finish · <span className="text-white/80 tracking-normal">{selectedFinish.label}</span>
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-white/50 md:justify-start">
                    <Badge className="border-white/10 bg-white/10 text-white/70">Edge-AI Upscaling</Badge>
                    <Badge className="border-white/10 bg-white/10 text-white/70">30 hr battery</Badge>
                    <Badge className="border-white/10 bg-white/10 text-white/70">Ambient Sound</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
                  Included in your bundle
                </h2>
                <ul className="grid gap-3 text-sm text-white/70 md:grid-cols-2">
                  <li className="rounded-lg border border-white/10 bg-black/30 px-4 py-3">
                    Premium carry case + cable organizer
                  </li>
                  <li className="rounded-lg border border-white/10 bg-black/30 px-4 py-3">
                    3.5mm Aux cable + USB‑C fast charge cable
                  </li>
                  <li className="rounded-lg border border-white/10 bg-black/30 px-4 py-3">
                    Spatial audio enhancer trial (90 days)
                  </li>
                  <li className="rounded-lg border border-white/10 bg-black/30 px-4 py-3">
                    Priority support &amp; tuning concierge
                  </li>
                </ul>
              </div>

              <Separator className="border-white/10 bg-white/10" />

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between text-white/70">
                  <span>Unit price</span>
                  <span>$399</span>
                </div>
                <div className="flex items-center justify-between text-white/70">
                  <span>Quantity</span>
                  <span>×{quantity}</span>
                </div>
                <div className="flex items-center justify-between text-white/70">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? "Complimentary" : `$${shippingCost}`}</span>
                </div>
                <Separator className="border-white/10 bg-white/5" />
                <div className="flex items-center justify-between text-base font-semibold text-white">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <p className="text-xs text-white/50">
                Taxes calculated at checkout. Complimentary returns within 30 days.
              </p>
              <Button size="lg" className="rounded-full px-7 py-6">
                Secure Checkout
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Your Details</CardTitle>
              <CardDescription className="text-white/60">
                Shipping, billing, and personalization preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {orderStatus === "success" && (
                  <motion.div
                    key="order-success"
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="mb-6 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200 shadow-[0_0_25px_rgba(16,185,129,0.2)]"
                    role="status"
                    aria-live="polite"
                  >
                    <p className="font-medium text-emerald-100">Order placed successfully!</p>
                    <p className="text-xs text-emerald-200/80">
                      We&apos;ll send a confirmation email with tracking details as soon as it ships.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="first-name" className="text-sm font-medium text-white/80">
                      First name
                    </label>
                    <input
                      id="first-name"
                      name="first-name"
                      autoComplete="given-name"
                      placeholder="Ada"
                      className="w-full rounded-lg border border-white/15 bg-black/50 px-4 py-3 text-sm text-white/90 transition focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="last-name" className="text-sm font-medium text-white/80">
                      Last name
                    </label>
                    <input
                      id="last-name"
                      name="last-name"
                      autoComplete="family-name"
                      placeholder="Lovelace"
                      className="w-full rounded-lg border border-white/15 bg-black/50 px-4 py-3 text-sm text-white/90 transition focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/80">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-white/15 bg-black/50 px-4 py-3 text-sm text-white/90 transition focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium text-white/80">
                    Shipping address
                  </label>
                  <input
                    id="address"
                    name="address"
                    autoComplete="street-address"
                    placeholder="742 Evergreen Terrace"
                    className="w-full rounded-lg border border-white/15 bg-black/50 px-4 py-3 text-sm text-white/90 transition focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  <div className="space-y-2">
                    <label htmlFor="city" className="text-sm font-medium text-white/80">
                      City
                    </label>
                    <input
                      id="city"
                      name="city"
                      placeholder="Neo Tokyo"
                      className="w-full rounded-lg border border-white/15 bg-black/50 px-4 py-3 text-sm text-white/90 transition focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="postal-code" className="text-sm font-medium text-white/80">
                      Postal code
                    </label>
                    <input
                      id="postal-code"
                      name="postal-code"
                      autoComplete="postal-code"
                      placeholder="100-8111"
                      className="w-full rounded-lg border border-white/15 bg-black/50 px-4 py-3 text-sm text-white/90 transition focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="country" className="text-sm font-medium text-white/80">
                      Country
                    </label>
                    <input
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      placeholder="Japan"
                      className="w-full rounded-lg border border-white/15 bg-black/50 px-4 py-3 text-sm text-white/90 transition focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-3">
                    <span className="text-sm font-medium text-white/80">Finish</span>
                    <div className="flex flex-wrap gap-3">
                      {colors.map((color) => (
                        <label
                          key={color.id}
                          className={cn(
                            "flex min-w-[140px] flex-1 cursor-pointer items-center gap-3 rounded-lg border border-white/15 bg-black/50 px-4 py-3 text-sm text-white/80 transition hover:border-white/30 focus-within:border-white/40 focus-within:ring-2 focus-within:ring-white/40",
                            finish === color.id && "border-white/40 bg-white/10 text-white"
                          )}
                        >
                          <input
                            type="radio"
                            id={`finish-${color.id}`}
                            name="color"
                            value={color.id}
                            checked={finish === color.id}
                            onChange={() => setFinish(color.id)}
                            className="sr-only"
                          />
                          <span
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20"
                            style={{ backgroundColor: color.swatch }}
                            aria-hidden
                          />
                          {color.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="quantity" className="text-sm font-medium text-white/80">
                      Quantity
                    </label>
                    <input
                      id="quantity"
                      name="quantity"
                      type="number"
                      step={1}
                      min={1}
                      max={5}
                      value={quantity}
                      onChange={(event) => {
                        const parsed = Number(event.target.value);
                        setQuantity(Number.isNaN(parsed) ? 1 : Math.min(Math.max(parsed, 1), 5));
                      }}
                      inputMode="numeric"
                      className="w-full rounded-lg border border-white/15 bg-black/50 px-4 py-3 text-sm text-white/90 transition focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 [appearance:textfield] [::-webkit-inner-spin-button]:appearance-none [::-webkit-outer-spin-button]:appearance-none"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <span className="text-sm font-medium text-white/80">Shipping speed</span>
                  <div className="grid gap-3">
                    {shippingOptions.map((option) => (
                      <label
                        key={option.id}
                        className="flex items-center justify-between gap-4 rounded-xl border border-white/15 bg-black/50 px-4 py-4 text-sm text-white/80 transition hover:border-white/30"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shipping"
                            value={option.id}
                            checked={shipping === option.id}
                            onChange={(event) => setShipping(event.target.value)}
                            className="size-4 rounded-full border-white/40 bg-black"
                          />
                          <div>
                            <p className="font-medium text-white">{option.label}</p>
                            <p className="text-xs text-white/60">{option.eta}</p>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-white/80">
                          {option.cost === 0 ? "Included" : `+$${option.cost}`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-full px-7 py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Processing..."
                    : orderStatus === "success"
                    ? "Order Placed"
                    : "Place Order"}
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-white/50">
                Your payment details are encrypted and processed securely. By placing this order you
                agree to the Audionix terms of sale.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
