'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Star,
  Package,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAdminStore } from '@/store/admin';
import { useProductsStore } from '@/store/products';

export default function AdminProductsPage() {
  const router = useRouter();
  const { isAdminAuthenticated } = useAdminStore();
  const { products, deleteProduct } = useProductsStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    if (!isAdminAuthenticated) {
      router.push('/admin');
    }
  }, [isAdminAuthenticated, router]);

  if (!isAdminAuthenticated) {
    return null;
  }

  // 过滤产品
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 获取所有分类
  const categories = Array.from(new Set(products.map(p => p.category)));

  const handleDeleteProduct = (productId: string, productName: string) => {
    if (window.confirm(`确定要删除产品 "${productName}" 吗？此操作无法撤销。`)) {
      deleteProduct(productId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/admin/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回仪表板
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">产品管理</h1>
                <p className="text-gray-600">管理您的产品库存和信息</p>
              </div>
            </div>

            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/admin/products/new">
                <Plus className="w-4 h-4 mr-2" />
                添加新产品
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总产品数</CardTitle>
              <Package className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-gray-600">产品库存总数</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">有库存产品</CardTitle>
              <Star className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {products.filter(p => p.inStock).length}
              </div>
              <p className="text-xs text-gray-600">可售产品数量</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">平均价格</CardTitle>
              <DollarSign className="w-4 h-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${(products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(0)}
              </div>
              <p className="text-xs text-gray-600">产品平均售价</p>
            </CardContent>
          </Card>
        </div>

        {/* 搜索和过滤 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>搜索和筛选</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="搜索产品名称..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="md:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">所有分类</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {searchTerm || selectedCategory !== 'all' ? (
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  找到 {filteredProducts.length} 个产品
                  {searchTerm && ` 包含 "${searchTerm}"`}
                  {selectedCategory !== 'all' && ` 在分类 "${selectedCategory}"`}
                </p>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* 产品列表 */}
        {filteredProducts.length === 0 ? (
          <Alert>
            <AlertDescription>
              没有找到匹配的产品。试试调整搜索条件或添加新产品。
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* 产品图片 */}
                    <div className="md:w-32 md:h-32 w-full h-48 relative bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* 产品信息 */}
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {product.description}
                          </p>
                        </div>

                        <div className="flex flex-row md:flex-col gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/product/${product.id}`}>
                              <Eye className="w-3 h-3 mr-1" />
                              预览
                            </Link>
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/admin/products/${product.id}/edit`}>
                              <Edit className="w-3 h-3 mr-1" />
                              编辑
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteProduct(product.id, product.name)}
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            删除
                          </Button>
                        </div>
                      </div>

                      {/* 产品详情 */}
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">价格:</span>
                          <span className="text-lg font-bold text-green-600">
                            ${product.price}
                          </span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-gray-500 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-medium">分类:</span>
                          <Badge variant="secondary">
                            {product.category.replace('-', ' ')}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-medium">库存:</span>
                          <Badge variant={product.inStock ? "default" : "destructive"}>
                            {product.inStock ? '有库存' : '缺货'}
                          </Badge>
                        </div>

                        {product.rating && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium">评分:</span>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>{product.rating}</span>
                              {product.reviews && (
                                <span className="text-gray-500 ml-1">
                                  ({product.reviews})
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 标签 */}
                      {product.tags && product.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {product.tags.slice(0, 5).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {product.tags.length > 5 && (
                            <Badge variant="outline" className="text-xs">
                              +{product.tags.length - 5}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
