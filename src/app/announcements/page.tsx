'use client';
import { useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Megaphone,
  Plus,
  Trash2,
  Download,
  X,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle2,
  Pin,
  Search,
  Filter,
  Clock,
  Archive,
  User,
  Link as LinkIcon,
  Copy,
} from 'lucide-react';

// ==================== Types & Config ====================
interface Announcement {
  id: string;
  title: string;
  date: string;
  description: string;
  excerpt: string;
  category: 'urgent' | 'policy' | 'event';
  isPinned: boolean;
  authorName: string;
  fileUrl: string;
  fileName: string;
  createdAt: any;
}

const categoryConfig = {
  urgent: { label: 'ด่วนมาก', color: 'bg-red-100 text-red-700 border-red-200', icon: AlertCircle },
  policy: { label: 'นโยบาย', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: FileText },
  event: { label: 'กิจกรรม', color: 'bg-green-100 text-green-700 border-green-200', icon: Calendar },
};

// ==================== Content Component ====================
function AnnouncementsContent() {
  const { user, userData } = useAuth();
  const isAdmin = userData?.role === 'admin';
  const searchParams = useSearchParams();
  const router = useRouter();

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // UI state
  const [viewMode, setViewMode] = useState<'recent' | 'archive'>('recent');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'urgent' | 'policy' | 'event'>('all');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [isInitialOpen, setIsInitialOpen] = useState(false);

  // Add modal state
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newCategory, setNewCategory] = useState<'urgent' | 'policy' | 'event'>('policy');
  const [newIsPinned, setNewIsPinned] = useState(false);
  const [newAuthorName, setNewAuthorName] = useState('');
  const [newFileUrl, setNewFileUrl] = useState('');
  const [newFileName, setNewFileName] = useState('');

  // Load announcements from Firestore
  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: Announcement[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        list.push({
          id: docSnap.id,
          title: data.title || '',
          date: data.date || '',
          description: data.description || '',
          excerpt: data.excerpt || '',
          category: data.category || 'policy',
          isPinned: data.isPinned || false,
          authorName: data.authorName || '',
          fileUrl: data.fileUrl || '',
          fileName: data.fileName || '',
          createdAt: data.createdAt,
        });
      });
      setAnnouncements(list);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Deep link handling
  useEffect(() => {
    const id = searchParams.get('id');
    if (id && announcements.length > 0 && !isInitialOpen) {
      const found = announcements.find(a => a.id === id);
      if (found) {
        setSelectedAnnouncement(found);
        setIsInitialOpen(true);
      }
    }
  }, [searchParams, announcements, isInitialOpen]);

  // Open/close modal with URL update
  const openAnnouncement = useCallback((ann: Announcement) => {
    setSelectedAnnouncement(ann);
    router.replace(`/announcements?id=${ann.id}`, { scroll: false });
  }, [router]);

  const closeAnnouncement = useCallback(() => {
    setSelectedAnnouncement(null);
    setIsInitialOpen(false);
    router.replace('/announcements', { scroll: false });
  }, [router]);

  // Copy link
  const copyLink = async (annId: string) => {
    const link = `${window.location.origin}/announcements?id=${annId}`;
    try {
      await navigator.clipboard.writeText(link);
      setMessage({ type: 'success', text: 'คัดลอกลิงก์แล้ว!' });
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = link;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setMessage({ type: 'success', text: 'คัดลอกลิงก์แล้ว!' });
    }
    setTimeout(() => setMessage(null), 2000);
  };

  // Filtering logic
  const now = useMemo(() => new Date(), []);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const filteredAnnouncements = useMemo(() => {
    let filtered = announcements;

    if (viewMode === 'recent') {
      filtered = filtered.filter((a) => {
        if (!a.createdAt || !a.createdAt.toDate) return true;
        return a.createdAt.toDate() >= thirtyDaysAgo;
      });
    } else {
      filtered = filtered.filter((a) => {
        if (!a.createdAt || !a.createdAt.toDate) return true;
        return a.createdAt.toDate() < thirtyDaysAgo;
      });
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter((a) => a.category === filterCategory);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(term) ||
          a.excerpt.toLowerCase().includes(term) ||
          a.description.toLowerCase().includes(term)
      );
    }

    return [...filtered].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });
  }, [announcements, viewMode, filterCategory, searchTerm, thirtyDaysAgo]);

  // Add & Delete handlers
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDate) return;
    try {
      await addDoc(collection(db, 'announcements'), {
        title: newTitle,
        date: newDate,
        description: newDesc,
        excerpt: newExcerpt,
        category: newCategory,
        isPinned: newIsPinned,
        authorName: newAuthorName || user?.email?.split('@')[0] || 'Admin',
        fileUrl: newFileUrl,
        fileName: newFileName,
        createdAt: Timestamp.now(),
      });
      // Reset form
      setNewTitle('');
      setNewDate('');
      setNewDesc('');
      setNewExcerpt('');
      setNewCategory('policy');
      setNewIsPinned(false);
      setNewAuthorName('');
      setNewFileUrl('');
      setNewFileName('');
      setShowModal(false);
      setMessage({ type: 'success', text: 'เพิ่มประกาศเรียบร้อย' });
    } catch (err: any) {
      setMessage({ type: 'error', text: 'เกิดข้อผิดพลาด: ' + err.message });
    }
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('คุณแน่ใจหรือไม่ที่จะลบประกาศนี้?')) return;
    try {
      await deleteDoc(doc(db, 'announcements', id));
      setMessage({ type: 'success', text: 'ลบประกาศเรียบร้อย' });
    } catch (err: any) {
      setMessage({ type: 'error', text: 'เกิดข้อผิดพลาด: ' + err.message });
    }
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
        {/* Header */}
        <section className="bg-gradient-to-br from-[#0A2540] to-[#0096C7] text-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <Megaphone className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h1 className="text-3xl md:text-5xl font-bold mb-2">ประกาศบริษัท</h1>
            <p className="opacity-90">ติดตามข่าวสารและเอกสารสำคัญภายในองค์กร</p>
          </div>
        </section>

        {/* Toast Message */}
        {message && (
          <div className={`fixed top-20 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-white ${
            message.type === 'success' ? 'bg-[#10B981]' : 'bg-[#DC2626]'
          }`}>
            {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {message.text}
            <button onClick={() => setMessage(null)}><X className="w-4 h-4" /></button>
          </div>
        )}

        {/* Controls: Admin Button, Tabs, Search, Filter */}
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-4 space-y-4">
          {isAdmin && (
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 bg-[#F97316] text-white px-5 py-2.5 rounded-xl font-semibold shadow hover:bg-[#e06814] transition"
              >
                <Plus className="w-5 h-5" />
                สร้างประกาศใหม่
              </button>
            </div>
          )}

          {/* Tabs: Recent / Archive */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('recent')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                viewMode === 'recent' ? 'bg-[#0096C7] text-white' : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
              }`}
            >
              <Clock className="w-4 h-4 inline mr-1" />
              ประกาศล่าสุด
            </button>
            <button
              onClick={() => setViewMode('archive')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                viewMode === 'archive' ? 'bg-[#0096C7] text-white' : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
              }`}
            >
              <Archive className="w-4 h-4 inline mr-1" />
              คลังประกาศย้อนหลัง
            </button>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ค้นหาประกาศ..."
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] text-sm"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {(['all', 'urgent', 'policy', 'event'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                    filterCategory === cat
                      ? 'bg-[#0096C7] text-white border-[#0096C7]'
                      : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-color)]'
                  }`}
                >
                  {cat === 'all' ? 'ทั้งหมด' : categoryConfig[cat].label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Announcements List – Notion-style */}
        <section className="max-w-7xl mx-auto px-4 pb-16">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-[#0096C7] border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>กำลังโหลด...</p>
            </div>
          ) : filteredAnnouncements.length === 0 ? (
            <div className="text-center py-12 text-[var(--text-secondary)]">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>{viewMode === 'recent' ? 'ไม่มีประกาศล่าสุด' : 'ไม่มีประกาศในคลัง'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredAnnouncements.map((ann) => {
                const cat = categoryConfig[ann.category] || categoryConfig.policy;
                const CatIcon = cat.icon;
                // กำหนดขนาดการ์ดตาม viewMode หรือ isPinned
                const isPinnedOrRecent = viewMode === 'recent' && ann.isPinned;
                const cardClass = `bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-5 shadow-sm hover:shadow-md transition cursor-pointer ${
                  ann.isPinned ? 'border-l-4 border-l-[#F97316]' : ''
                } ${isPinnedOrRecent ? 'col-span-2 row-span-2' : ''}`;

                return (
                  <div
                    key={ann.id}
                    className={cardClass}
                    onClick={() => openAnnouncement(ann)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        {ann.isPinned && (
                          <span className="inline-flex items-center gap-1 text-xs text-[#F97316] font-medium">
                            <Pin className="w-3 h-3" /> ปักหมุด
                          </span>
                        )}
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cat.color}`}>
                          <CatIcon className="w-3 h-3" />
                          {cat.label}
                        </span>
                      </div>
                      {isAdmin && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(ann.id);
                          }}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <h3 className="font-bold text-[var(--color-heading)] mb-1 line-clamp-2">{ann.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] mb-2">
                      <Calendar className="w-3 h-3" />
                      <span>{ann.date}</span>
                      {ann.authorName && (
                        <>
                          <User className="w-3 h-3 ml-1" />
                          <span>{ann.authorName}</span>
                        </>
                      )}
                    </div>
                    {ann.excerpt && (
                      <p className="text-sm text-[var(--text-secondary)] line-clamp-3">{ann.excerpt}</p>
                    )}
                    {ann.fileUrl && (
                      <div className="mt-3 pt-3 border-t border-[var(--border-color)] text-xs">
                        <a
                          href={ann.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[#0096C7] hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Download className="w-3 h-3" />
                          {ann.fileName || 'เอกสารแนบ'}
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Detail Modal with share link */}
        {selectedAnnouncement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-[var(--color-heading)]">{selectedAnnouncement.title}</h2>
                  <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)] mt-2">
                    <Calendar className="w-4 h-4" /> {selectedAnnouncement.date}
                    {selectedAnnouncement.authorName && (
                      <span className="flex items-center gap-1"><User className="w-4 h-4" /> {selectedAnnouncement.authorName}</span>
                    )}
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${categoryConfig[selectedAnnouncement.category].color}`}>
                      {categoryConfig[selectedAnnouncement.category].label}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyLink(selectedAnnouncement.id)}
                    className="text-gray-400 hover:text-[#0096C7] transition"
                    title="คัดลอกลิงก์"
                  >
                    <LinkIcon className="w-5 h-5" />
                  </button>
                  <button onClick={closeAnnouncement} className="text-gray-400 hover:text-red-500">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="prose prose-sm max-w-none text-[var(--text-primary)] whitespace-pre-line">
                {selectedAnnouncement.description || selectedAnnouncement.excerpt}
              </div>
              {selectedAnnouncement.fileUrl && (
                <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
                  <a
                    href={selectedAnnouncement.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#0096C7] hover:underline font-medium"
                  >
                    <Download className="w-4 h-4" />
                    {selectedAnnouncement.fileName || 'ดาวน์โหลดเอกสารแนบ'}
                  </a>
                </div>
              )}
              <div className="mt-4 pt-4 border-t border-[var(--border-color)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
                <span className="truncate mr-2">{`${window.location.origin}/announcements?id=${selectedAnnouncement.id}`}</span>
                <button
                  onClick={() => copyLink(selectedAnnouncement.id)}
                  className="flex items-center gap-1 text-[#0096C7] hover:underline shrink-0"
                >
                  <Copy className="w-3 h-3" />
                  คัดลอก
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Announcement Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl p-6 w-full max-w-lg mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[var(--color-heading)]">สร้างประกาศใหม่</h2>
                <button onClick={() => setShowModal(false)} className="text-[var(--text-secondary)] hover:text-red-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">หัวข้อ *</label>
                  <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">วันที่ *</label>
                  <input type="text" value={newDate} onChange={(e) => setNewDate(e.target.value)} required placeholder="เช่น 10 เมษายน 2568"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">หมวดหมู่</label>
                    <select value={newCategory} onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)]">
                      <option value="urgent">🔴 ด่วนมาก</option>
                      <option value="policy">🔵 นโยบาย/ทั่วไป</option>
                      <option value="event">🟢 กิจกรรม</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <input type="checkbox" id="isPinned" checked={newIsPinned} onChange={(e) => setNewIsPinned(e.target.checked)} className="w-4 h-4" />
                    <label htmlFor="isPinned" className="text-sm font-medium">ปักหมุด</label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">คำโปรย (1-2 บรรทัด)</label>
                  <input type="text" value={newExcerpt} onChange={(e) => setNewExcerpt(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">เนื้อหาฉบับเต็ม</label>
                  <textarea value={newDesc} onChange={(e) => setNewDesc(e.target.value)} rows={5}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">ผู้ประกาศ (ชื่อ/แผนก)</label>
                  <input type="text" value={newAuthorName} onChange={(e) => setNewAuthorName(e.target.value)} placeholder="HR Department"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">ลิงก์ไฟล์ (URL หรือ path)</label>
                  <input type="text" value={newFileUrl} onChange={(e) => setNewFileUrl(e.target.value)} placeholder="/docs/announcement.pdf"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">ชื่อไฟล์</label>
                  <input type="text" value={newFileName} onChange={(e) => setNewFileName(e.target.value)} placeholder="ประกาศวันหยุด.pdf"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)]" />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)]">ยกเลิก</button>
                  <button type="submit"
                    className="px-4 py-2 rounded-lg bg-[#F97316] text-white font-semibold hover:bg-[#e06814]">บันทึก</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

// ==================== Export with Suspense ====================
export default function AnnouncementsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-[#0096C7] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-[var(--text-secondary)]">กำลังโหลด...</p>
        </div>
      </div>
    }>
      <AnnouncementsContent />
    </Suspense>
  );
}