'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import type { Product } from '@/types';

interface ProductGridProps {
  products: Product[];
  title?: string;
  showSeeAll?: boolean;
  seeAllHref?: string;
  columns?: number;
  className?: string;
}

const ProductGrid = ({
  products,
  title,
  showSeeAll = false,
  seeAllHref = '#',
  columns = 4,
  className = ''
}: ProductGridProps) => {
  const [displayCount, setDisplayCount] = useState(8);

  const displayedProducts = products.slice(0, displayCount);
  const hasMore = products.length > displayCount;

  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + 8, products.length));
  };

  const getGridCols = () => {
    switch (columns) {
      case 2: return 'grid-cols-1 sm:grid-cols-2';
      case 3: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      case 5: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5';
      case 6: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6';
      default: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    }
  };

  if (products.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <section className={`py-8 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        {title && (
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            {showSeeAll && (
              <Button variant="outline" asChild>
                <a href={seeAllHref}>See all</a>
              </Button>
            )}
          </div>
        )}

        <div className={`grid gap-6 ${getGridCols()}`}>
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-8">
            <Button onClick={loadMore} variant="outline">
              Load More Products
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
