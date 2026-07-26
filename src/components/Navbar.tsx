'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useState } from 'react';
import {
  Menu, X, Home, Info, Package, Shield, Mail,
  Megaphone, LayoutDashboard, Briefcase, LogOut,
  Sun, Moon, Sunrise, Minus, Plus, UserPlus
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, setTheme, fontSize, increaseFontSize, decreaseFontSize } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  // เลือกโลโก้ตามสถานะ login
  const logoSrc = user
    ? '/image/Logo-Firstclass.png'
    : '/image/Logo-NTNMedicalTeam.png';

  return (
    <nav className="bg-[var(--navbar-bg)] backdrop-blur-md border-b border-[var(--border-color)] sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src={logoSrc}
              alt="Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/about" className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[#0096C7] text-sm transition-all duration-200 hover:-translate-y-0.5">
              <Info className="w-4 h-4" /> รู้จักเรา
            </Link>
            <Link href="/products" className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[#0096C7] text-sm transition-all duration-200 hover:-translate-y-0.5">
              <Package className="w-4 h-4" /> สินค้า
            </Link>
            <Link href="/governance" className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[#0096C7] text-sm transition-all duration-200 hover:-translate-y-0.5">
              <Shield className="w-4 h-4" /> บรรษัทภิบาล
            </Link>
            <Link href="/contact" className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[#0096C7] text-sm transition-all duration-200 hover:-translate-y-0.5">
              <Mail className="w-4 h-4" /> ติดต่อเรา
            </Link>

            {/* ปุ่มร่วมงานกับเรา (สาธารณะ) */}
            <a
              href="https://ntnmedicalteam.com/office/application/jobs/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[#F97316] text-sm transition-all duration-200 hover:-translate-y-0.5"
            >
              <UserPlus className="w-4 h-4" /> ร่วมงานกับเรา
            </a>

            {user && (
              <>
                <Link href="/announcements" className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[#0096C7] text-sm transition-all duration-200 hover:-translate-y-0.5">
                  <Megaphone className="w-4 h-4" /> ประกาศ
                </Link>
                <Link href="/dashboard" className="flex items-center gap-1 text-[#0096C7] font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <Link href="/hr-portal" className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[#0096C7] text-sm transition-all duration-200 hover:-translate-y-0.5">
                  <Briefcase className="w-4 h-4" /> HR Portal
                </Link>
              </>
            )}
          </div>

          {/* Right Section: Accessibility + User */}
          <div className="flex items-center gap-2">
            {/* Font Size Controls */}
            <div className="hidden md:flex items-center gap-1 border-r border-[var(--border-color)] pr-3 mr-1">
              <button
                onClick={decreaseFontSize}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-[var(--text-secondary)]"
                title="ลดขนาดตัวอักษร"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-xs text-[var(--text-secondary)] min-w-[20px] text-center">{fontSize}</span>
              <button
                onClick={increaseFontSize}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-[var(--text-secondary)]"
                title="เพิ่มขนาดตัวอักษร"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Theme Switcher */}
            <div className="hidden md:flex items-center gap-1 border-r border-[var(--border-color)] pr-3 mr-1">
              <button
                onClick={() => setTheme('light')}
                className={`p-1 rounded ${theme === 'light' ? 'bg-[#0096C7] text-white' : 'text-[var(--text-secondary)] hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                title="โหมดสว่าง"
              >
                <Sun className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme('dim')}
                className={`p-1 rounded ${theme === 'dim' ? 'bg-[#0096C7] text-white' : 'text-[var(--text-secondary)] hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                title="โหมดสว่างปานกลาง"
              >
                <Sunrise className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`p-1 rounded ${theme === 'dark' ? 'bg-[#0096C7] text-white' : 'text-[var(--text-secondary)] hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                title="โหมดมืด"
              >
                <Moon className="w-4 h-4" />
              </button>
            </div>

            {/* User Section */}
            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-[var(--text-secondary)] truncate max-w-[120px]">{user.email}</span>
                <button onClick={logout} className="flex items-center gap-1 text-red-500 text-sm hover:underline">
                  <LogOut className="w-4 h-4" /> ออก
                </button>
              </div>
            ) : (
              <Link href="/login" className="hidden md:inline-block bg-[#0096C7] text-white px-3 py-1.5 rounded text-sm hover:bg-[#007BA1] transition">
                เข้าสู่ระบบ
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-[var(--text-primary)]"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 space-y-2">
          <Link href="/about" className="block py-1 text-[var(--text-primary)]">รู้จักเรา</Link>
          <Link href="/products" className="block py-1 text-[var(--text-primary)]">สินค้า</Link>
          <Link href="/governance" className="block py-1 text-[var(--text-primary)]">บรรษัทภิบาล</Link>
          <Link href="/contact" className="block py-1 text-[var(--text-primary)]">ติดต่อเรา</Link>
          <a
            href="https://ntnmedicalteam.com/office/application/jobs/"
            target="_blank"
            rel="noopener noreferrer"
            className="block py-1 text-[var(--text-primary)] hover:text-[#F97316]"
          >
            ร่วมงานกับเรา
          </a>
          {user && (
            <>
              <Link href="/announcements" className="block py-1 text-[var(--text-primary)]">ประกาศ</Link>
              <Link href="/dashboard" className="block py-1 text-[#0096C7] font-semibold">Dashboard</Link>
              <Link href="/hr-portal" className="block py-1 text-[var(--text-primary)]">HR Portal</Link>
              <button onClick={logout} className="block text-red-500 py-1">ออกจากระบบ</button>
            </>
          )}
          {!user && (
            <Link href="/login" className="block bg-[#0096C7] text-white text-center py-2 rounded">เข้าสู่ระบบ</Link>
          )}
          {/* Accessibility in mobile */}
          <div className="flex items-center gap-2 pt-2 border-t border-[var(--border-color)]">
            <button onClick={decreaseFontSize} className="p-1"><Minus className="w-4 h-4" /></button>
            <span className="text-sm">{fontSize}</span>
            <button onClick={increaseFontSize} className="p-1"><Plus className="w-4 h-4" /></button>
            <div className="flex gap-1 ml-auto">
              <button onClick={() => setTheme('light')} className={`p-1 rounded ${theme === 'light' ? 'bg-[#0096C7] text-white' : ''}`}><Sun className="w-4 h-4" /></button>
              <button onClick={() => setTheme('dim')} className={`p-1 rounded ${theme === 'dim' ? 'bg-[#0096C7] text-white' : ''}`}><Sunrise className="w-4 h-4" /></button>
              <button onClick={() => setTheme('dark')} className={`p-1 rounded ${theme === 'dark' ? 'bg-[#0096C7] text-white' : ''}`}><Moon className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}