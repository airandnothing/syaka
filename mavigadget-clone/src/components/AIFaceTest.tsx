'use client';

import { useState, useRef, useEffect } from 'react';
import { Camera, RotateCcw, Sparkles, User, Heart, Home, Wrench, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

interface FaceAnalysis {
  ageRange: string;
  gender: string;
  mood: string;
  style: string;
  confidence: number;
}

interface ProductRecommendation {
  category: string;
  reason: string;
  products: typeof products;
}

const AIFaceTest = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [analysis, setAnalysis] = useState<FaceAnalysis | null>(null);
  const [recommendations, setRecommendations] = useState<ProductRecommendation[]>([]);
  const [error, setError] = useState<string>('');
  const [step, setStep] = useState<'start' | 'camera' | 'analyzing' | 'results'>('start');

  const startCamera = async () => {
    try {
      setError('');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 640,
          height: 480,
          facingMode: 'user'
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
        setStep('camera');
      }
    } catch (err) {
      setError('Unable to access camera. Please make sure you have granted camera permissions.');
      console.error('Camera error:', err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    setStep('start');
  };

  const analyzeImage = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsLoading(true);
    setStep('analyzing');

    // Capture frame from video
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0);

    // Simulate AI analysis (in real implementation, this would use MediaPipe or similar)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate mock analysis based on random factors (for demo purposes)
    const mockAnalysis: FaceAnalysis = generateMockAnalysis();
    setAnalysis(mockAnalysis);

    // Generate product recommendations based on analysis
    const mockRecommendations = generateRecommendations(mockAnalysis);
    setRecommendations(mockRecommendations);

    setIsLoading(false);
    setStep('results');
    stopCamera();
  };

  const generateMockAnalysis = (): FaceAnalysis => {
    const ageRanges = ['18-25', '25-35', '35-45', '45-55', '55+'];
    const genders = ['Male', 'Female'];
    const moods = ['Happy', 'Neutral', 'Focused', 'Relaxed'];
    const styles = ['Modern', 'Classic', 'Trendy', 'Practical', 'Luxurious'];

    return {
      ageRange: ageRanges[Math.floor(Math.random() * ageRanges.length)],
      gender: genders[Math.floor(Math.random() * genders.length)],
      mood: moods[Math.floor(Math.random() * moods.length)],
      style: styles[Math.floor(Math.random() * styles.length)],
      confidence: 0.85 + Math.random() * 0.1 // 85-95% confidence
    };
  };

  const generateRecommendations = (analysis: FaceAnalysis): ProductRecommendation[] => {
    const recommendations: ProductRecommendation[] = [];

    // Age-based recommendations
    if (analysis.ageRange.includes('18-25') || analysis.ageRange.includes('25-35')) {
      recommendations.push({
        category: 'Tech & Gadgets',
        reason: `Based on your ${analysis.ageRange} age group, you might enjoy innovative tech gadgets and smart home solutions.`,
        products: products.filter(p =>
          p.category === 'daily-discovery' ||
          p.category === 'home-gadgets' ||
          p.tags.some(tag => ['tech', 'smart', 'innovative'].includes(tag.toLowerCase()))
        ).slice(0, 3)
      });
    }

    // Gender-based recommendations
    if (analysis.gender === 'Female') {
      recommendations.push({
        category: 'Home & Lifestyle',
        reason: 'Perfect items to enhance your living space with style and functionality.',
        products: products.filter(p =>
          p.category === 'home-stuff' ||
          p.category === 'bed-bath' ||
          p.tags.some(tag => ['decorative', 'beautiful', 'elegant'].includes(tag.toLowerCase()))
        ).slice(0, 3)
      });
    } else {
      recommendations.push({
        category: 'Tools & Outdoor',
        reason: 'Practical and functional items for your daily activities and hobbies.',
        products: products.filter(p =>
          p.category === 'daily-discovery' ||
          p.tags.some(tag => ['outdoor', 'tool', 'practical'].includes(tag.toLowerCase()))
        ).slice(0, 3)
      });
    }

    // Mood-based recommendations
    if (analysis.mood === 'Happy' || analysis.mood === 'Relaxed') {
      recommendations.push({
        category: 'Comfort & Wellness',
        reason: `Your ${analysis.mood.toLowerCase()} mood suggests you'd enjoy items that bring joy and relaxation.`,
        products: products.filter(p =>
          p.tags.some(tag => ['cozy', 'comfort', 'relaxing', 'fun'].includes(tag.toLowerCase())) ||
          p.name.toLowerCase().includes('cozy') ||
          p.name.toLowerCase().includes('comfort')
        ).slice(0, 3)
      });
    }

    // Style-based recommendations
    if (analysis.style === 'Modern' || analysis.style === 'Trendy') {
      recommendations.push({
        category: 'Modern Design',
        reason: `Your ${analysis.style.toLowerCase()} style preference aligns with these contemporary designs.`,
        products: products.filter(p =>
          p.tags.some(tag => ['modern', 'minimalist', 'contemporary'].includes(tag.toLowerCase())) ||
          p.name.toLowerCase().includes('modern') ||
          p.name.toLowerCase().includes('minimalist')
        ).slice(0, 3)
      });
    }

    return recommendations.filter(r => r.products.length > 0);
  };

  const resetTest = () => {
    setAnalysis(null);
    setRecommendations([]);
    setStep('start');
    setError('');
  };

  const getStepIcon = (currentStep: string) => {
    switch (currentStep) {
      case 'camera':
        return <Camera className="w-5 h-5" />;
      case 'analyzing':
        return <Sparkles className="w-5 h-5 animate-spin" />;
      case 'results':
        return <Heart className="w-5 h-5" />;
      default:
        return <User className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">AI Face Analysis</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Let our AI analyze your facial features and recommend products perfectly suited for you.
          Your photo is processed locally and never stored or shared.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {['start', 'camera', 'analyzing', 'results'].map((stepName, index) => (
          <div key={stepName} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
              step === stepName
                ? 'bg-blue-600 border-blue-600 text-white'
                : index < ['start', 'camera', 'analyzing', 'results'].indexOf(step)
                ? 'bg-green-600 border-green-600 text-white'
                : 'border-gray-300 text-gray-400'
            }`}>
              {getStepIcon(stepName)}
            </div>
            {index < 3 && (
              <div className={`w-12 h-0.5 mx-2 ${
                index < ['start', 'camera', 'analyzing', 'results'].indexOf(step)
                  ? 'bg-green-600'
                  : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Error Alert */}
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Start Step */}
      {step === 'start' && (
        <Card className="text-center">
          <CardContent className="pt-6 space-y-6">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Camera className="w-12 h-12 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Start?</h3>
              <p className="text-gray-600 mb-6">
                Click the button below to start your AI face analysis. We'll recommend products based on your unique features.
              </p>
              <Button onClick={startCamera} size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Camera className="w-5 h-5 mr-2" />
                Start Face Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Camera Step */}
      {step === 'camera' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Position Your Face
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative bg-gray-900 rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                className="w-full h-auto max-h-96 object-cover"
                autoPlay
                playsInline
                muted
              />
              <canvas ref={canvasRef} className="hidden" />

              {/* Face outline guide */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-64 border-2 border-white border-dashed rounded-full opacity-50"></div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Position your face within the oval guide and look directly at the camera.
              </p>
              <div className="flex justify-center gap-3">
                <Button
                  onClick={analyzeImage}
                  disabled={isLoading}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Analyze My Face
                </Button>
                <Button onClick={stopCamera} variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analyzing Step */}
      {step === 'analyzing' && (
        <Card>
          <CardContent className="pt-6 text-center space-y-6">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-12 h-12 text-blue-600 animate-spin" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Your Features...</h3>
              <p className="text-gray-600">
                Our AI is processing your facial features to find the perfect product recommendations.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Step */}
      {step === 'results' && analysis && (
        <div className="space-y-6">
          {/* Analysis Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Your AI Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Age Range</p>
                  <p className="font-semibold text-gray-900">{analysis.ageRange}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Gender</p>
                  <p className="font-semibold text-gray-900">{analysis.gender}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Mood</p>
                  <p className="font-semibold text-gray-900">{analysis.mood}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Style</p>
                  <p className="font-semibold text-gray-900">{analysis.style}</p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Badge variant="secondary">
                  Confidence: {(analysis.confidence * 100).toFixed(1)}%
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Product Recommendations */}
          {recommendations.map((recommendation, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {recommendation.category.includes('Tech') && <Gamepad2 className="w-5 h-5" />}
                  {recommendation.category.includes('Home') && <Home className="w-5 h-5" />}
                  {recommendation.category.includes('Tools') && <Wrench className="w-5 h-5" />}
                  {!recommendation.category.includes('Tech') && !recommendation.category.includes('Home') && !recommendation.category.includes('Tools') && <Heart className="w-5 h-5" />}
                  {recommendation.category}
                </CardTitle>
                <p className="text-gray-600">{recommendation.reason}</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommendation.products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <Button onClick={resetTest} variant="outline" size="lg">
              <RotateCcw className="w-5 h-5 mr-2" />
              Try Again
            </Button>
            <p className="text-xs text-gray-500">
              🔒 Your photo was processed locally and not stored or shared.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIFaceTest;
