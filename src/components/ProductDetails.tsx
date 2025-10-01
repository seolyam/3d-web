"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useProductStore } from "@/hooks/useProductStore";
import { ShoppingCart, Check, Star } from "lucide-react";

export function ProductDetails() {
  const { product, selectedVariant } = useProductStore();
  const currentVariant =
    product.variants.find((v) => v.id === selectedVariant) ||
    product.variants[0];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
        <p className="text-xl text-muted-foreground mt-2">
          {product.description}
        </p>

        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-yellow-400 text-yellow-400"
              />
            ))}
            <span className="text-sm text-muted-foreground ml-2">
              (4.8/5 • 2,847 reviews)
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="flex items-baseline gap-4">
          <span className="text-3xl font-light">
            {currentVariant.price === 0
              ? "Coming Soon"
              : `$${currentVariant.price}`}
          </span>
          <Badge
            variant="secondary"
            className="bg-white/10 text-white border-white/20"
          >
            Free Shipping
          </Badge>
        </div>
      </motion.div>

      <Separator />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Specifications</CardTitle>
            <CardDescription>Technical details and features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-muted-foreground">
                  Battery Life:
                </span>
                <p>{product.specs.battery}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">
                  Connectivity:
                </span>
                <p>{product.specs.connectivity}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">
                  Weight:
                </span>
                <p>{product.specs.weight}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {product.specs.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex gap-4"
      >
        <Button
          size="lg"
          className="flex-1 bg-white text-black hover:bg-white/90"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
        <Button
          size="lg"
          className="flex-1 bg-white text-black hover:bg-white/90"
        >
          Try in Store
        </Button>
      </motion.div>
    </div>
  );
}
