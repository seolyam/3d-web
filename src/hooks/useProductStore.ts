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
  id: "premium-earbuds",
  name: "Premium Wireless Earbuds",
  description:
    "Experience the future of wireless audio with our premium earbuds featuring cutting-edge technology and exceptional sound quality.",
  variants: [
    {
      id: "space-black",
      name: "Space Black",
      color: "#1d1d1f",
      price: 0,
      image: "/models/earbuds-space-black.jpg",
    },
    {
      id: "silver",
      name: "Silver",
      color: "#f2f2f7",
      price: 0,
      image: "/models/earbuds-silver.jpg",
    },
    {
      id: "deep-blue",
      name: "Deep Blue",
      color: "#007aff",
      price: 0,
      image: "/models/earbuds-deep-blue.jpg",
    },
  ],
  specs: {
    battery: "Extended battery life with case",
    connectivity: "Latest wireless technology",
    weight: "Ultra-lightweight design",
    features: [
      "Advanced Audio Technology",
      "Intelligent Noise Control",
      "Spatial Audio Experience",
      "Water & Sweat Resistant",
      "Fast & Wireless Charging",
      "Seamless Connectivity",
    ],
  },
};

export const useProductStore = create<ProductStore>((set) => ({
  selectedVariant: "space-black",
  setSelectedVariant: (variantId) => set({ selectedVariant: variantId }),
  product: sampleProduct,
}));
