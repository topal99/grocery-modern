<?php

namespace Database\Factories;

use Grocery\Models\Category; // <-- Import Category
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str; // <-- Import Str
use Grocery\Models\Product;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        $productImages = [
        'product-img-1.jpg',
        'product-img-2.jpg',
        'product-img-3.jpg',
        'product-img-4.jpg',
        'product-img-5.jpg',
        'product-img-6.jpg',
        'product-img-7.jpg',
        'product-img-8.jpg',
        'product-img-9.jpg',
        'product-img-10.jpg',
        'product-img-11.jpg',
        'product-img-12.jpg',
        'product-img-13.jpg',
        ];

        $name = fake()->words(rand(2, 4), true); // Nama produk dari 2-4 kata
        $categoryIds = Category::pluck('id')->all();

        return [
            'user_id' => 2,
            'name' => Str::title($name), // Dibuat menjadi Title Case
            'slug' => Str::slug($name), // Slug unik
            'description' => fake()->paragraph(3),
            'price' => fake()->numberBetween(50000, 3000000),
            'stock' => fake()->numberBetween(5, 50),
            'category_id' => !empty($categoryIds) ? fake()->randomElement($categoryIds) : null,
            'image_url' => 'products/' . fake()->randomElement($productImages),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Product $product) {
            // Daftar gambar contoh untuk galeri
            $galleryImages = [
                'products/product-img-13.jpg',
                'products/product-img-11.jpg',
                'products/product-img-12.jpg',
                'products/product-img-1.jpg',
            ];

            // Buat 2-4 gambar galeri acak untuk setiap produk
            for ($i = 0; $i < rand(2, 4); $i++) {
                $product->images()->create([
                    'image_url' => collect($galleryImages)->random()
                ]);
            }
        });
    }
}