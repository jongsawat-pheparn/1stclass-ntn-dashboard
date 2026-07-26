'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Lock, Mail, ArrowRight, Shield, LogIn, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      } else if (err.code === 'auth/too-many-requests') {
        setError('คุณพยายามเข้าสู่ระบบหลายครั้งเกินไป กรุณาลองใหม่ภายหลัง');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('กรุณากรอกอีเมล');
      return;
    }
    setError('');
    setMessage('');
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('ส่งคำขอรีเซ็ตรหัสผ่านไปยังอีเมลของคุณแล้ว โปรดตรวจสอบกล่องจดหมาย');
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        setError('ไม่พบบัญชีผู้ใช้ที่ลงทะเบียนด้วยอีเมลนี้');
      } else {
        setError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A2540] via-[#003366] to-[#0096C7] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#0096C7] rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-[#F97316] rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            1st Class Employee & Corporate
          </h1>
          <p className="text-white/80 text-sm">
            Secure Portal & Business Intelligence Hub
          </p>
        </div>

        {/* Card */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          <CardContent className="p-8">
            {/* Alert Messages */}
            {error && (
              <div className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {message && (
              <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-3 rounded-lg mb-6 text-sm">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{message}</span>
              </div>
            )}

            {!isResetMode ? (
              /* Login Form */
              <>
                <h2 className="text-xl font-bold text-[#0A2540] mb-2">เข้าสู่ระบบ</h2>
                <p className="text-sm text-gray-500 mb-6">
                  กรุณาใช้อีเมลบริษัท (เช่น @ntntrading.co.th)
                </p>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">
                      อีเมลองค์กร (Email)
                    </Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10"
                        placeholder="yourname@company.com"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-sm font-medium">
                      รหัสผ่าน (Password)
                    </Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pl-10"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#F97316] to-[#F97316]/90 hover:from-[#F97316]/90 hover:to-[#F97316] text-white font-semibold py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        กำลังเข้าสู่ระบบ...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <LogIn className="w-4 h-4" />
                        ลงชื่อเข้าใช้งาน
                      </span>
                    )}
                  </Button>
                </form>
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsResetMode(true);
                      setError('');
                      setMessage('');
                    }}
                    className="text-sm text-[#0096C7] hover:underline font-medium"
                  >
                    ลืมรหัสผ่าน?
                  </button>
                  <span className="text-sm text-gray-500 mx-2">|</span>
                  <span className="text-sm text-[#0096C7] hover:underline font-medium cursor-pointer">
                    รีเซ็ตผ่านอีเมล
                  </span>
                </div>
              </>
            ) : (
              /* Reset Password Form */
              <>
                <h2 className="text-xl font-bold text-[#0A2540] mb-2">รีเซ็ตรหัสผ่าน</h2>
                <p className="text-sm text-gray-500 mb-6">
                  กรอกอีเมลองค์กรของคุณเพื่อรับลิงก์รีเซ็ตรหัสผ่าน
                </p>
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div>
                    <Label htmlFor="reset-email" className="text-sm font-medium">
                      อีเมลองค์กร (Email)
                    </Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="reset-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10"
                        placeholder="yourname@company.com"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#F97316] to-[#F97316]/90 hover:from-[#F97316]/90 hover:to-[#F97316] text-white font-semibold py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        กำลังส่งคำขอ...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Mail className="w-4 h-4" />
                        ส่งคำขอรีเซ็ตรหัสผ่าน
                      </span>
                    )}
                  </Button>
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setIsResetMode(false);
                        setError('');
                        setMessage('');
                      }}
                      className="text-sm text-[#0096C7] hover:underline font-medium flex items-center justify-center gap-1 mx-auto"
                    >
                      <ArrowRight className="w-4 h-4 rotate-180" />
                      กลับไปหน้าเข้าสู่ระบบ
                    </button>
                  </div>
                </form>
              </>
            )}

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-center text-gray-500">
                ระบบสารสนเทศนี้สงวนสิทธิ์เฉพาะพนักงานบริษัทในเครือ NTN Medical Team เท่านั้น
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}