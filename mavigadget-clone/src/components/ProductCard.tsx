'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCartStore } from '@/store/cart';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className = '' }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const discountPercentage = product.originalPrice && product.price < product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.discount;

  return (
    <Card
      className={`group overflow-hidden transition-all duration-300 hover:shadow-lg ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          {discountPercentage && (
            <Badge className="absolute top-2 left-2 z-10 bg-red-500 hover:bg-red-600">
              Save {discountPercentage}%
            </Badge>
          )}

          {product.isNew && (
            <Badge className="absolute top-2 right-2 z-10 bg-blue-500 hover:bg-blue-600">
              New
            </Badge>
          )}

          <Image
            src={imageError ? '/placeholder-product.jpg' : product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />

          {/* Overlay on hover */}
          <div className={`absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 ${
            isHovered ? 'bg-opacity-20' : ''
          }`}>
            <div className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              <Button
                onClick={handleAddToCart}
                className="w-full bg-white text-black hover:bg-gray-100"
                size="sm"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-medium text-sm line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>

            {product.rating && product.reviews && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <div className="flex items-center">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1">{product.rating}</span>
                </div>
                <span>({product.reviews} reviews)</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {!product.inStock && (
              <Badge variant="secondary" className="text-xs">
                Out of Stock
              </Badge>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;
