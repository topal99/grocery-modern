// frontend/src/app/owner/profile/page.tsx

'use client';

import { useEffect, useState, useCallback } from 'react';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import ProfileUpdateForm from '@/components/customer/ProfileUpdateForm';
import PasswordUpdateForm from '@/components/customer/PasswordUpdateForm';
import { useAuthStore } from '@/stores/authStore';

interface UserProfile {
  name: string;
  email: string;
}

export default function OwnerProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const updateUserProfile = useAuthStore((state) => state.updateUserProfile);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    const token = Cookies.get('auth_token');
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
      // Ganti endpoint ke rute owner yang baru
      const res = await fetch(`${apiUrl}/api/owner/profile`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
      });
      if (!res.ok) throw new Error("Gagal memuat profil.");
      const data = await res.json();
      setUser(data.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleProfileUpdate = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    updateUserProfile(updatedUser);
  };

  if (isLoading) {
    return <div className="p-8 text-center flex items-center justify-center gap-2"><Loader2 className="animate-spin" /><span>Memuat profil...</span></div>;
  }

  if (!user) {
    return <div className="p-8 text-center">Tidak dapat memuat data profil.</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Toaster position="top-center" />
      <h1 className="text-3xl font-bold mb-6">Pengaturan Akun Toko</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Informasi Profil</h2>
            <ProfileUpdateForm currentUser={user} onProfileUpdate={handleProfileUpdate} />
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Ganti Password</h2>
            <PasswordUpdateForm />
          </div>
        </div>
      </div>
    </div>
  );
}