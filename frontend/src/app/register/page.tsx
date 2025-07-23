'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, MailCheck } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [role, setRole] = useState('customer');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      toast.error("Password dan konfirmasi password tidak cocok.");
      return;
    }
    
    setIsLoading(true);
    const toastId = toast.loading('Membuat akun...');
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await fetch(`${apiUrl}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, password, password_confirmation: passwordConfirmation, role }),
      });

      const data = await res.json();
      if (!res.ok) {
        const errorMessages = data.errors ? Object.values(data.errors).flat().join('\n') : data.message;
        throw new Error(errorMessages || 'Gagal mendaftar.');
      }
      
      toast.success('Registrasi berhasil!', { id: toastId });
      setIsSuccess(true); 

    } catch (err: any) {
      toast.error(err.message, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="text-center p-8 max-w-md mx-auto">
                <MailCheck className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-4">Pendaftaran Berhasil!</h1>
                <p className="text-muted-foreground">
                  Satu langkah lagi! Kami telah mengirimkan link verifikasi ke email <strong>{email}</strong>. 
                  Silakan cek kotak masuk (atau folder spam) untuk mengaktifkan akun Anda.
                </p>
                <Button asChild className="mt-6">
                    <Link href="/login">Kembali ke Halaman Login</Link>
                </Button>
            </div>
        </div>
    );
  }

  return (
    // Struktur utama diubah menjadi grid dengan 2 kolom pada layar besar (lg)
    <div className="w-full lg:grid lg:grid-cols-2 pt-4">
      <Toaster position="top-center" />

      {/* Kolom Kiri: Gambar */}    
            {/* 'hidden' di mobile, dan 'block' (terlihat) di layar besar (lg) */}
      <div className="hidden lg:block relative">
        <Image
          // Ganti dengan URL gambar Anda dari Unsplash, atau path lokal di folder /public
          src="http://localhost:8000/storage/banners/signin-g.svg"
          alt="Gambar Dekoratif Halaman Registrasi"
          fill // 'fill' akan membuat gambar mengisi seluruh div
          priority // 'priority' agar gambar dimuat lebih awal
          className="object-cover" // 'object-cover' agar gambar tidak terdistorsi
        />
      </div>

      {/* Kolom Kanan: Form Registrasi */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-[380px] space-y-6">
          <CardHeader className="text-center p-0 mb-6">
            <CardTitle className="text-3xl font-bold">Buat Akun Baru</CardTitle>
            <CardDescription>Isi data di bawah untuk memulai perjalanan Anda.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input id="name" value={name} placeholder="Nama Lengkap" onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Input id="email" type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Input id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Input id="password_confirmation" type="password" placeholder="Konfirmasi Password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required />
              </div>
              <div className="space-y-3 pt-2">
                <Label>Daftar sebagai:</Label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="role" value="customer" checked={role === 'customer'} onChange={() => setRole('customer')} className="form-radio"/>
                    Customer
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="role" value="store_owner" checked={role === 'store_owner'} onChange={() => setRole('store_owner')} className="form-radio" />
                    Pemilik Toko
                  </label>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin mx-auto" /> : 'Daftar'}
              </Button>
            </form>
          </CardContent>
          <div className="mt-4 text-center text-sm">
            Sudah punya akun?{" "}
            <Link href="/login" className="underline">Login di sini</Link>
          </div>
        </div>
      </div>
      
    </div>
  );
}