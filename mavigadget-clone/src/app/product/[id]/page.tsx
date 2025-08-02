import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { getProductById, products } from '@/data/products';
import { getFeaturedProducts } from '@/data/products';
import ProductDetailClient from '@/components/ProductDetailClient';
import AIRecommendationBanner from '@/components/AIRecommendationBanner';

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id: productId } = await params;
  const product = getProductById(productId);
  const featuredProducts = getFeaturedProducts().filter(p => p.id !== productId).slice(0, 4);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
            <li>/</li>
            <li><Link href={`/category/${product.category}`} className="hover:text-gray-900 capitalize">{product.category.replace('-', ' ')}</Link></li>
            <li>/</li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductDetailClient product={product} />
        </div>

        {/* AI Recommendation Banner */}
        <div className="mt-8">
          <AIRecommendationBanner compact={true} showCloseButton={true} />
        </div>

        {/* Related Products */}
        {featuredProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="group overflow-hidden">
                  <Link href={`/product/${relatedProduct.id}`}>
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-sm line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="font-semibold text-gray-900">
                        ${relatedProduct.price.toFixed(2)}
                      </p>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
