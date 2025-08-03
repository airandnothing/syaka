'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Shield,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Plus,
  BarChart3,
  Eye,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminStore } from '@/store/admin';
import { useCartStore } from '@/store/cart';
import { products } from '@/data/products';

export default function AdminDashboard() {
  const router = useRouter();
  const { isAdminAuthenticated, adminUser, adminLogout } = useAdminStore();
  const { items } = useCartStore();

  // 检查管理员是否已登录
  useEffect(() => {
    if (!isAdminAuthenticated) {
      router.push('/admin');
    }
  }, [isAdminAuthenticated, router]);

  if (!isAdminAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    adminLogout();
    router.push('/admin');
  };

  // 统计数据
  const stats = {
    totalProducts: products.length,
    totalOrders: items.length, // 模拟订单数据
    totalUsers: 125, // 模拟用户数据
    totalRevenue: 12580 // 模拟收入数据
  };

  const quickActions = [
    {
      title: '管理产品',
      description: '添加、编辑或删除产品',
      icon: Package,
      href: '/admin/products',
      color: 'blue'
    },
    {
      title: '查看订单',
      description: '查看和管理客户订单',
      icon: ShoppingCart,
      href: '/admin/orders',
      color: 'green'
    },
    {
      title: '用户管理',
      description: '查看注册用户信息',
      icon: Users,
      href: '/admin/users',
      color: 'purple'
    },
    {
      title: '网站设置',
      description: '修改网站配置和外观',
      icon: Settings,
      href: '/admin/settings',
      color: 'orange'
    }
  ];

  const recentActivities = [
    { action: '新用户注册', details: 'user123@email.com', time: '5分钟前' },
    { action: '新订单', details: 'Nordic Wall Lamp - $57.95', time: '1小时前' },
    { action: 'AI分析完成', details: '用户使用了人脸分析功能', time: '2小时前' },
    { action: '产品浏览', details: 'Astronaut Moon Light 被浏览30次', time: '3小时前' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 管理员头部导航 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Mavigadget 管理后台</h1>
                <p className="text-sm text-gray-600">欢迎，{adminUser?.username}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link href="/">
                  <Eye className="w-4 h-4 mr-2" />
                  查看网站
                </Link>
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                退出登录
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 欢迎信息 */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">仪表板概览</h2>
          <p className="text-gray-600">管理您的 Mavigadget 网站，查看统计数据和执行管理操作</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总产品数</CardTitle>
              <Package className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-gray-600">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                在线产品
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">模拟订单</CardTitle>
              <ShoppingCart className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-gray-600">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                当前购物车
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">模拟用户</CardTitle>
              <Users className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-gray-600">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                注册用户
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">模拟收入</CardTitle>
              <BarChart3 className="w-4 h-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue}</div>
              <p className="text-xs text-gray-600">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                本月模拟收入
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 快速操作 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                快速操作
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {quickActions.map((action) => (
                  <Link key={action.title} href={action.href}>
                    <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${action.color}-100`}>
                        <action.icon className={`w-5 h-5 text-${action.color}-600`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{action.title}</h4>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 最近活动 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                最近活动
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-600">{activity.details}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 快速添加产品按钮 */}
        <div className="mt-8 text-center">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/admin/products/new">
              <Plus className="w-5 h-5 mr-2" />
              快速添加新产品
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
