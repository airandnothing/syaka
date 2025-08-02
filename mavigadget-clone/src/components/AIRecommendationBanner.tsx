'use client';

import Link from 'next/link';
import { Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

interface AIRecommendationBannerProps {
  showCloseButton?: boolean;
  compact?: boolean;
}

const AIRecommendationBanner = ({ showCloseButton = true, compact = false }: AIRecommendationBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardContent className={`relative ${compact ? 'p-4' : 'p-6'}`}>
        {showCloseButton && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 w-6 h-6 p-0"
            onClick={() => setIsVisible(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        )}

        <div className={`flex items-center ${compact ? 'gap-3' : 'gap-4'}`}>
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-blue-600" />
          </div>

          <div className="flex-1">
            <h3 className={`font-semibold text-gray-900 ${compact ? 'text-sm' : 'text-base'}`}>
              Get AI-Powered Product Recommendations
            </h3>
            <p className={`text-gray-600 ${compact ? 'text-xs' : 'text-sm'}`}>
              Use our face analysis to find products perfect for your style and preferences.
            </p>
          </div>

          <Button asChild size={compact ? 'sm' : 'default'} className="bg-blue-600 hover:bg-blue-700">
            <Link href="/ai-face-test">
              <Sparkles className="w-4 h-4 mr-1" />
              Try Now
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIRecommendationBanner;
