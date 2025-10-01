import { create } from "zustand";

export interface ProductVariant {
  id: string;
  name: string;
  color: string;
  price: number;
  image: string;
  modelPath?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  variants: ProductVariant[];
  specs: {
    battery: string;
    connectivity: string;
    weight: string;
    features: string[];
  };
}

interface ProductStore {
  selectedVariant: string;
  setSelectedVariant: (variantId: string) => void;
  product: Product;
}

const sampleProduct: Product = {
  id: "wh-1000xm5",
  name: "WH-1000XM5",
  description:
    "Industry-leading noise canceling with two processors controlling eight microphones. Premium sound quality with LDAC and DSEE Extreme for a superior listening experience.",
  variants: [
    {
      id: "space-black",
      name: "Black",
      color: "#1d1d1f",
      price: 399,
      image: "/models/wh1000xm5-black.jpg",
    },
    {
      id: "silver",
      name: "Silver",
      color: "#e8e8e8",
      price: 399,
      image: "/models/wh1000xm5-silver.jpg",
    },
    {
      id: "midnight-blue",
      name: "Midnight Blue",
      color: "#1e3a5f",
      price: 399,
      image: "/models/wh1000xm5-blue.jpg",
    },
  ],
  specs: {
    battery: "Up to 30 hours (NC ON), up to 40 hours (NC OFF)",
    connectivity: "Bluetooth 5.2, LDAC, AAC, SBC, Multipoint",
    weight: "Approx. 250g (8.8 oz)",
    features: [
      "Industry-Leading Noise Canceling (8 Microphones)",
      "Integrated Processor V1 + HD NC Processor QN1",
      "30mm Driver with Carbon Fiber Dome",
      "Hi-Res Audio & LDAC Codec Support",
      "DSEE Extreme AI Upscaling",
      "Speak-to-Chat & Quick Attention",
      "Multipoint Connection (2 Devices)",
      "360 Reality Audio Support",
      "Precise Voice Pickup Technology",
      "Fast Charging (3 min = 3 hours)",
      "Soft-Fit Leather Earcups",
      "Foldable Design with Carry Case",
    ],
  },
};

export const useProductStore = create<ProductStore>((set) => ({
  selectedVariant: "space-black",
  setSelectedVariant: (variantId) => set({ selectedVariant: variantId }),
  product: sampleProduct,
}));
