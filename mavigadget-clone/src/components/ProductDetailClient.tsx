'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, ShoppingCart, Heart, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/cart';
import type { Product } from '@/types';

interface ProductDetailClientProps {
  product: Product;
}

const ProductDetailClient = ({ product }: ProductDetailClientProps) => {
  const { addItem } = useCartStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const discountPercentage = product.originalPrice && product.price < product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.discount;

  return (
    <>
      {/* Product Images */}
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          {discountPercentage && (
            <Badge className="absolute top-4 left-4 z-10 bg-red-500 hover:bg-red-600">
              Save {discountPercentage}%
            </Badge>
          )}

          {product.isNew && (
            <Badge className="absolute top-4 right-4 z-10 bg-blue-500 hover:bg-blue-600">
              New
            </Badge>
          )}

          <Image
            src={imageError[selectedImage] ? '/placeholder-product.jpg' : product.images[selectedImage]}
            alt={product.name}
            fill
            className="object-cover"
            onError={() => setImageError(prev => ({ ...prev, [selectedImage]: true }))}
          />
        </div>

        {/* Thumbnail images */}
        {product.images.length > 1 && (
          <div className="flex space-x-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                }`}
              >
                <Image
                  src={imageError[index] ? '/placeholder-product.jpg' : image}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                  onError={() => setImageError(prev => ({ ...prev, [index]: true }))}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

          {product.rating && product.reviews && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating!) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          )}

          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xl text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <div className="prose max-w-none">
          <p className="text-gray-600">{product.description}</p>
        </div>

        {/* Quantity and Add to Cart */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-900">Quantity:</span>
            <div className="flex items-center border rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="px-4 py-2 text-center min-w-[60px]">{quantity}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={incrementQuantity}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 h-12"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3 pt-6 border-t">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Truck className="w-5 h-5" />
            <span>Free shipping on orders over $50</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Shield className="w-5 h-5" />
            <span>30-day satisfaction guarantee</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <RotateCcw className="w-5 h-5" />
            <span>Easy returns & exchanges</span>
          </div>
        </div>

        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="pt-6 border-t">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetailClient;
