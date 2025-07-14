<?php

namespace Grocery\Http\Controllers\Api;

use Grocery\Http\Controllers\Controller;
use Grocery\Models\Category;
use Grocery\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage; 

class HomepageController extends Controller
{
    public function index()
    {
        // 1. Mengambil Produk Terbaru (New Arrivals)
        $newArrivals = Product::with('category')->withCount('reviews')->withAvg('reviews', 'rating')->latest()->get();
        $bestSellers = Product::with('category')->withCount(['reviews', 'orderItems'])->withAvg('reviews', 'rating')->orderBy('order_items_count', 'desc')->take(4)->get();
        // 3. Mengambil Kategori Unggulan
        $featuredCategories = Category::get();

        // 4. Data Banner & Testimoni (Hardcoded)
        // Untuk saat ini, kita buat data palsu langsung di sini.
        $bannerFiles = Storage::disk('public')->files('banners');
        $banners = [];
        foreach ($bannerFiles as $file) {
            $banners[] = [
                // 3. Buat URL lengkap untuk setiap gambar
                'image_url' => url('storage/' . $file),
                'title' => 'Judul Banner Anda', // Ganti dengan judul yang sesuai
                'subtitle' => 'Subjudul untuk banner ini', // Ganti dengan subjudul
                'link' => '/products' // Tautan tujuan saat banner di-klik
            ];
        }

        // Jika tidak ada gambar di folder banners, gunakan gambar default
        if (empty($banners)) {
            $banners = [
                ['image_url' => 'https://via.placeholder.com/1920x1080.png/0077ff?text=Banner+1', 'title' => 'Banner Default 1', 'subtitle' => 'Silakan upload gambar ke folder storage/app/public/banners', 'link' => '/'],
                ['image_url' => 'https://via.placeholder.com/1920x1080.png/ff0055?text=Banner+2', 'title' => 'Banner Default 2', 'subtitle' => 'Gambar akan tampil di sini', 'link' => '/'],
            ];
        }

        // Gabungkan semua data menjadi satu response
        return response()->json([
            'success' => true,
            'data' => [
                'banners' => $banners,
                'new_arrivals' => $newArrivals,
                'best_sellers' => $bestSellers,
                'featured_categories' => $featuredCategories,
            ]
        ]);
    }
}