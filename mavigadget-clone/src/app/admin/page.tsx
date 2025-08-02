'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAdminStore } from '@/store/admin';

export default function AdminLoginPage() {
  const router = useRouter();
  const { adminLogin, isAdminAuthenticated } = useAdminStore();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 如果已经登录，直接跳转到管理面板
  if (isAdminAuthenticated) {
    router.push('/admin/dashboard');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // 模拟登录延迟
    await new Promise(resolve => setTimeout(resolve, 500));

    const success = adminLogin(credentials.username, credentials.password);

    if (success) {
      router.push('/admin/dashboard');
    } else {
      setError('用户名或密码错误');
    }

    setIsLoading(false);
  };

  const fillDemoCredentials = () => {
    setCredentials({
      username: 'admin',
      password: 'mavigadget2025'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">管理员登录</h1>
          <p className="mt-2 text-gray-600">登录后台管理您的网站</p>
        </div>

        {/* 管理员账号信息 */}
        <Alert className="border-blue-200 bg-blue-50">
          <AlertDescription className="text-blue-800">
            <div className="space-y-1">
              <p><strong>管理员账号信息：</strong></p>
              <p>用户名：admin</p>
              <p>密码：mavigadget2025</p>
              <Button
                variant="link"
                size="sm"
                onClick={fillDemoCredentials}
                className="p-0 h-auto text-blue-600"
              >
                点击自动填入
              </Button>
            </div>
          </AlertDescription>
        </Alert>

        {/* 登录表单 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              管理员登录
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  管理员用户名
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="输入管理员用户名"
                    value={credentials.username}
                    onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                    className="pl-10"
                    required
                  />
                  <User className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  管理员密码
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="输入管理员密码"
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10 pr-10"
                    required
                  />
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    登录中...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    登录管理后台
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* 说明 */}
        <div className="text-center text-sm text-gray-500">
          <p>🔒 这是您网站的管理后台</p>
          <p>登录后可以管理产品、查看订单等</p>
        </div>

        {/* 返回网站链接 */}
        <div className="text-center">
          <Button variant="outline" asChild>
            <Link href="/">← 返回网站首页</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
