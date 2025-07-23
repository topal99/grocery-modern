<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        DB::table('categories')->delete();

        $categories = [
            ['name' => 'Dairy, Bread & Eggs', 'icon' => 'egg'],
            ['name' => 'Snacks & Munchies', 'icon' => 'cookie'],
            ['name' => 'Fruits & Vegetables', 'icon' => 'carrot'],
            ['name' => 'Cold Drinks & Juices', 'icon' => 'cup-soda'],
            ['name' => 'Breakfast & Instant Food', 'icon' => 'coffee'],
            ['name' => 'Bakery & Biscuits', 'icon' => 'cake'],
            ['name' => 'Chicken, Meat & Fish', 'icon' => 'fish'],
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insert([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
                'icon' => $category['icon'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}