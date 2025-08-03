import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeroCarousel from '@/components/HeroCarousel';
import ProductGrid from '@/components/ProductGrid';
import { getFeaturedProducts, getNewProducts } from '@/data/products';

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts();

  return (
    <div className="min-h-screen">
      {/* Hero Categories Carousel */}
      <HeroCarousel />

      {/* AI Face Test Feature Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 mr-3 animate-pulse" />
            <h2 className="text-3xl font-bold">NEW: AI Face Analysis</h2>
          </div>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Let our advanced AI analyze your face and recommend products perfectly suited for your style, age, and preferences.
            Get personalized recommendations in seconds!
          </p>
          <div className="space-y-4">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/ai-face-test">
                <Sparkles className="w-5 h-5 mr-2" />
                Try AI Face Analysis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <p className="text-sm opacity-75">
              🔒 100% Privacy Protected - Photos processed locally and never stored
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <ProductGrid
        products={featuredProducts}
        title="Editor's Favorites"
        showSeeAll={true}
        seeAllHref="/favorites/editors"
        columns={4}
      />

      {/* New Products Section */}
      {newProducts.length > 0 && (
        <ProductGrid
          products={newProducts}
          title="Just added.."
          showSeeAll={true}
          seeAllHref="/products/new"
          columns={4}
          className="bg-gray-50"
        />
      )}

      {/* Additional sections can be added here */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Find something for your home
          </h2>
          <p className="text-gray-600 mb-8">
            Discover something unique for your place.
          </p>

          {/* Category grid could go here */}
        </div>
      </section>
    </div>
  );
}
