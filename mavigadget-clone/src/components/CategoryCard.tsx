'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  className?: string;
}

const CategoryCard = ({ category, className = '' }: CategoryCardProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className={`group overflow-hidden transition-all duration-300 hover:shadow-lg ${className}`}>
      <Link href={`/category/${category.slug}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={imageError ? '/placeholder-category.jpg' : category.image}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-lg font-bold mb-2 text-center">{category.name}</h3>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button variant="secondary" size="sm" className="w-full">
                Explore
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default CategoryCard;
