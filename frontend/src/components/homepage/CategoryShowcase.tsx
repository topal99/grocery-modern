// src/components/homepage/CategoryShowcase.tsx
'use client';

import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import Autoplay from "embla-carousel-autoplay"
import {
    Egg,
    Cookie,
    Carrot,
    CupSoda,
    Coffee,
    CakeSlice, 
    Fish,
    HelpCircle } 
  from "lucide-react";

interface Category {
    id: number;
    name: string;
    slug: string;
    icon: string; // Backend mengirim string nama ikon
}

// Buat objek pemetaan dari string nama ikon ke Komponen Ikon React
const iconMap: { [key: string]: React.ElementType } = {
    egg: Egg,
    cookie: Cookie,
    carrot: Carrot,
    'cup-soda': CupSoda,
    coffee: Coffee,
    cake: CakeSlice,
    fish: Fish,
};

export default function CategoryShowcase({ categories }: { categories: Category[] }) {
    
    return (
    <section className="py-8">
        <h2 className="text-2xl font-bold font-headline mb-8">Featured Categories</h2>
            <Carousel 
                opts={{
                    align: "start",
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                        delay: 5000,
                        stopOnInteraction: true,
                    }),
                ]}
                className="w-full"
            >
                <CarouselContent>
                    {categories.map((category) => {
                        // 👇 PERUBAHAN DI SINI
                        // 1. Ambil komponen Ikon dari map menggunakan nama string dari kategori.
                        // 2. Sediakan ikon default (HelpCircle) jika nama ikon tidak ditemukan di map.
                        const IconComponent = iconMap[category.icon] || HelpCircle;

                        return (
                            <CarouselItem key={category.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
                                <Link href={`/categories/${category.slug}`}>
                                    <Card className="hover:shadow-lg transition-shadow duration-300">
                                        <CardContent className="flex flex-col items-center justify-center p-4 gap-4">
                                            {/* 3. Render komponen Ikon yang sudah ditemukan */}
                                            <IconComponent className="w-8 h-8 text-gray-700" />
                                            <span className="font-semibold text-center text-sm">{category.name}</span>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-4 bg-background/50 hover:bg-background/80" />
                <CarouselNext className="hidden md:flex -right-4 bg-background/50 hover:bg-background/80" />
            </Carousel>
    </section>
    );
}