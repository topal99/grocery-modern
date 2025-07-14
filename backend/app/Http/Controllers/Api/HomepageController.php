<?php

namespace Grocery\Http\Controllers\Api;

use Grocery\Http\Controllers\Controller;
use Grocery\Models\Category;
use Grocery\Models\Product;
use Illuminate\Http\Request;

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
        $banners = [
            ['image_url' => 'heroslider/slide-1.jpg', 'title' => 'Mega Sale Diskon 50%', 'subtitle' => 'Untuk semua produk fashion wanita', 'link' => '/categories/pakaian'],
            ['image_url' => 'heroslider/slide-2.jpg', 'title' => 'Gadget Terbaru 2025', 'subtitle' => 'Teknologi terdepan di ujung jari Anda', 'link' => '/categories/elektronik'],
            ['image_url' => 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070', 'title' => 'Elektronik Terbaru 2025', 'subtitle' => 'Teknologi terdepan di ujung jari Anda', 'link' => '/categories/elektronik'],
            // ['image_url' => 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070', 'title' => 'Fashion Terbaru 2025', 'subtitle' => 'Teknologi terdepan di ujung jari Anda', 'link' => '/categories/elektronik'],
            // ['image_url' => 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070', 'title' => 'Furniture Terbaru 2025', 'subtitle' => 'Teknologi terdepan di ujung jari Anda', 'link' => '/categories/elektronik'],
        ];

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