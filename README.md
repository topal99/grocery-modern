# Mini Project Grocery-mart

## Project Overview

Proyek ini adalah sebuah platform E-Commerce modern yang dibangun dengan arsitektur headless, memisahkan antara backend (API) dan frontend (Client). Tujuannya adalah untuk menyediakan solusi pasar digital yang skalabel, aman, dan kaya fitur, yang melayani tiga peran utama: Pelanggan (Customer), Pemilik Toko (Owner), dan Admin.

Dengan backend yang kokoh menggunakan Laravel dan frontend yang interaktif serta cepat menggunakan Next.js, platform ini dirancang untuk memberikan pengalaman pengguna yang mulus, sekaligus memudahkan manajemen bagi penjual dan pengawasan bagi administrator. Arsitektur ini juga memungkinkan fleksibilitas untuk pengembangan di masa depan, seperti ekspansi ke aplikasi mobile tanpa perlu membangun ulang logika bisnis inti.

## Arsitektur & Teknologi

-   **Backend (API): Laravel 11**

    -   Bahasa: PHP 8.2+

    -   Database: MySQL

    -   Manajemen Paket: Composer

    -   Fitur Utama: API RESTful, otentikasi via Sanctum, manajemen peran, integrasi layanan pihak ketiga.


-   **Frontend (Client): Next.js 14**

    -   Bahasa: TypeScript

    -   Framework: React

    -   Manajemen Paket: npm / yarn

    -   Fitur Utama: Server-Side Rendering (SSR) & Static Site Generation (SSG) untuk performa optimal, routing berbasis App Router, desain responsif dengan Tailwind CSS.


-   **Arsitektur: Headless/Decoupled**

    -   Backend hanya berfungsi sebagai penyedia data melalui API.

    -   Frontend berfungsi sebagai "kepala" yang mengonsumsi API untuk menampilkan data kepada pengguna.

## Rincian Fitur Berdasarkan Peran

### a. Customer (Pelanggan)

Fokus pada pengalaman belanja yang intuitif dan lengkap.

-   **Otentikasi & Akun:**

    -   Registrasi akun dengan verifikasi email.

    -   Login standar (email & password) dan Login via Google (OAuth 2.0).

    -   Manajemen profil, alamat pengiriman, dan perubahan password.


-   **Alur Belanja:**

    -   Katalog produk dengan pencarian, filter kategori, dan paginasi.

    -   Halaman detail produk dengan galeri gambar, deskripsi, stok, ulasan, dan sesi Tanya Jawab.

    -   Sistem Wishlist untuk menyimpan produk idaman.

-   **Transaksi:**

    -   Keranjang belanja dinamis (tambah, hapus, update kuantitas).

    -   Proses Checkout multi-langkah:

        1.  Pilih alamat.

        2.  Pilih kurir & cek ongkos kirim (Integrasi RajaOngkir API).

        3.  Pilih metode pembayaran (Integrasi Midtrans Payment Gateway).

        4.  Ringkasan pesanan & konfirmasi.

-   **Pasca-Transaksi:**

    -   Halaman "Pesanan Saya" dengan riwayat dan status real-time.

    -   Kemampuan untuk memberikan ulasan dan rating pada produk yang telah dibeli.

    -   Sistem Poin Loyalitas yang didapat dari setiap transaksi selesai.

### b. Owner (Pemilik Toko)

Ditujukan untuk mengelola toko dan produk secara efisien.

-   **Manajemen Produk:**
    -   Menambah, mengedit, menghapus produk dengan detail (nama, deskripsi, harga, stok, gambar).
    -   Melihat daftar produk mereka dengan opsi pencarian dan paginasi.
-   **Manajemen Pesanan:**
    -   Melihat daftar pesanan yang masuk ke toko mereka.
    -   Memperbarui status pesanan (misalnya: diproses, dikirim, selesai).
    -   Melihat detail pesanan termasuk item, informasi pengiriman, dan pembayaran.
-   **Manajemen Pertanyaan & Jawaban:**
    -   Melihat pertanyaan yang diajukan oleh pelanggan terkait produk mereka.
    -   Memberikan jawaban atas pertanyaan pelanggan.
-   **Manajemen Ulasan:**
    -   Melihat ulasan dan rating yang diberikan pelanggan pada produk mereka.
-   **Dashboard & Statistik:**
    -   Melihat ringkasan penjualan, produk terlaris, dan statistik penting lainnya.
-   **Profil Toko:**
    -   Mengelola informasi profil toko (nama toko, deskripsi, dll.).
    -   Melihat notifikasi terkait aktivitas toko (pesanan baru, stok habis, dll.).
-   **Manajemen Pengembalian Barang:**
    -   Melihat dan memproses permintaan pengembalian barang dari pelanggan.
    -   Memperbarui status permintaan pengembalian (disetujui, ditolak, dll.).

### c. Admin

Memiliki kontrol penuh atas seluruh sistem dan data.

-   **Manajemen Pengguna:**
    -   Melihat, menambah, mengedit, dan menghapus pengguna (Customer, Owner, Admin).
    -   Mengelola peran (role) pengguna.
-   **Manajemen Kategori:**
    -   Menambah, mengedit, menghapus kategori produk.
-   **Manajemen Kupon:**
    -   Membuat, mengedit, menghapus kupon diskon.
    -   Mengatur detail kupon (kode, nilai diskon, tanggal kadaluwarsa, batasan penggunaan).
-   **Manajemen Konten Sistem:**
    -   Mengelola data master lainnya (jika ada).
-   **Dashboard & Laporan Global:**
    -   Melihat statistik dan laporan menyeluruh mengenai penjualan, pengguna, dan aktivitas sistem.
-   **Pengawasan Transaksi:**
    -   Melihat seluruh transaksi yang terjadi di platform.
-   **Manajemen Return Request Global:**
    -   Mengelola semua permintaan pengembalian barang di seluruh platform.

## Konfigurasi & Instalasi

Untuk menjalankan proyek ini, pastikan Anda memiliki lingkungan pengembangan berikut:

-   PHP >= 8.2
-   Composer
-   Node.js >= 14
-   npm atau yarn
-   MySQL Database
-   Web Server (Apache/Nginx atau menggunakan PHP built-in server)

Langkah-langkah instalasi:

1.  Clone repository ini.
2.  Masuk ke direktori `backend`:
    ```bash
    cd backend
    ```
3.  Install dependensi Composer:
    ```bash
    composer install
    ```
4.  Copy file `.env.example` menjadi `.env` dan sesuaikan konfigurasi database serta kunci aplikasi:
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```
    Edit file `.env` untuk mengkonfigurasi database (`DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`) dan konfigurasi layanan eksternal seperti RajaOngkir dan Midtrans.
5.  Jalankan migrasi database:
    ```bash
    php artisan migrate
    ```
6.  (Opsional) Jalankan seeder untuk mengisi data awal:
    ```bash
    php artisan db:seed
    ```
7.  Jalankan backend server:
    ```bash
    php artisan serve
    ```
8.  Buka terminal baru, masuk ke direktori `frontend`:
    ```bash
    cd ../frontend
    ```
9.  Install dependensi npm/yarn:
    ```bash
    npm install # atau yarn install
    ```
10. Copy file `.env.local.example` menjadi `.env.local` dan sesuaikan URL API backend:
    ```bash
    cp .env.local.example .env.local
    ```
    Edit file `.env.local` untuk mengkonfigurasi `NEXT_PUBLIC_BACKEND_URL` sesuai dengan alamat backend Anda (contoh: `http://127.0.0.1:8000`).
11. Jalankan frontend development server:
    ```bash
    npm run dev # atau yarn dev
    ```

## Mengaktifkan Fitur Notifikasi dan Poin (Queue Worker)

Beberapa fitur pada proyek ini, seperti notifikasi (misalnya notifikasi stok kembali) dan pemberian poin loyalitas setelah transaksi selesai, diimplementasikan menggunakan sistem antrian (queue) Laravel. Untuk memproses antrian ini, Anda perlu menjalankan worker antrian.

Buka terminal baru, masuk ke direktori `backend`, dan jalankan perintah berikut:

```bash
php artisan queue:work
```

Perintah ini akan menjalankan worker yang terus memantau dan memproses job-job dalam antrian. Pastikan worker ini berjalan di latar belakang agar fitur-fitur yang bergantung pada antrian dapat berfungsi dengan baik.

## Kebutuhan Environment Tambahan

Selain konfigurasi database, Anda perlu mengatur variabel environment untuk layanan eksternal:

-   **RajaOngkir API:** Untuk cek ongkos kirim. Anda perlu mendaftar di RajaOngkir dan mendapatkan API Key. Tambahkan konfigurasi di file `.env` backend:
    ```env
    RAJAONGKIR_API_KEY=your_rajaongkir_api_key
    RAJAONGKIR_ACCOUNT_TYPE=starter_or_basic_or_pro
    RAJAONGKIR_ORIGIN=origin_city_id
    ```
    Ganti `your_rajaongkir_api_key`, `starter_or_basic_or_pro`, dan `origin_city_id` sesuai dengan akun dan lokasi toko Anda.

-   **Midtrans Payment Gateway:** Untuk proses pembayaran. Anda perlu mendaftar di Midtrans dan mendapatkan Server Key serta Client Key. Tambahkan konfigurasi di file `.env` backend:
    ```env
    MIDTRANS_SERVER_KEY=your_midtrans_server_key
    MIDTRANS_CLIENT_KEY=your_midtrans_client_key
    MIDTRANS_IS_PRODUCTION=false # Ubah menjadi true untuk production
    ```
    Ganti `your_midtrans_server_key` dan `your_midtrans_client_key` sesuai dengan kunci Midtrans Anda.

-   **Google OAuth:** Untuk fitur login dengan Google. Konfigurasi kredensial OAuth 2.0 dari Google Developer Console perlu ditambahkan di file `.env` backend:
    ```env
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    GOOGLE_REDIRECT_URI=your_google_redirect_uri
    ```

-   **Mail Configuration:** Untuk fitur verifikasi email dan notifikasi email lainnya. Konfigurasi SMTP atau layanan email lainnya perlu ditambahkan di file `.env` backend:
    ```env
    MAIL_MAILER=smtp
    MAIL_HOST=your_mail_host
    MAIL_PORT=your_mail_port
    MAIL_USERNAME=your_mail_username
    MAIL_PASSWORD=your_mail_password
    MAIL_ENCRYPTION=tls
    MAIL_FROM_ADDRESS=your_mail_from_address
    MAIL_FROM_NAME="${APP_NAME}"
    ```

## Catatan Pengembangan Lainnya (Khusus Customer)

Berikut adalah beberapa catatan mengenai fitur atau area yang masih bisa dikembangkan lebih lanjut, khususnya untuk peran Customer:

-   **Integrasi API Tracking Paket yang Lebih Komprehensif:** Saat ini, informasi tracking mungkin masih terbatas. Integrasi dengan API layanan pengiriman pihak ketiga (selain informasi dasar dari RajaOngkir jika ada) dapat memberikan detail tracking yang lebih akurat dan real-time kepada pelanggan.
-   **Fitur Notifikasi Real-time yang Lebih Kaya:** Notifikasi saat ini mungkin terbatas pada email atau notifikasi dalam aplikasi dasar. Integrasi dengan layanan notifikasi real-time seperti Firebase Cloud Messaging (FCM) [5] atau WebSocket dapat memberikan pengalaman notifikasi yang lebih baik (contoh: notifikasi status pesanan berubah, notifikasi balasan pertanyaan).
-   **Peningkatan Sistem Poin Loyalitas:** Pengembangan lebih lanjut dapat mencakup:
    -   Tiering poin (level anggota berdasarkan poin).
    -   Penukaran poin dengan diskon atau reward eksklusif.
    -   Riwayat penggunaan dan perolehan poin yang lebih detail.
-   **Variasi Metode Pembayaran Tambahan:** Menambahkan lebih banyak opsi pembayaran selain Midtrans (misalnya transfer bank manual dengan konfirmasi upload bukti bayar, e-wallet spesifik) dapat meningkatkan kemudahan bagi pelanggan.
-   **Fitur Pembatalan Pesanan dengan Logika Bisnis:** Mengimplementasikan alur pembatalan pesanan dengan mempertimbangkan status pesanan (misal: hanya bisa dibatalkan jika belum diproses penjual) dan potensi pengembalian dana.
-   **Personalisasi Produk:** Merekomendasikan produk berdasarkan riwayat belanja, wishlist, atau produk yang dilihat pelanggan.
-   **Fitur Langganan Newsletter atau Notifikasi Promosi:** Memberikan opsi bagi pelanggan untuk mendapatkan informasi terbaru mengenai produk atau promo.

Catatan ini merupakan ide untuk pengembangan di masa mendatang guna memperkaya fitur dan pengalaman pengguna pada sisi Customer.