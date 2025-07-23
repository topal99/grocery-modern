'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type Product } from "@/lib/types";
import ReviewSection from "./reviews/ReviewSection";
import QnaSection from "./qna/QnaSection";

interface InfoTabsProps {
    product: Product;
    onInfoSubmitted: () => void; // Fungsi "penyegar" umum
}

export default function InfoTabs({ product, onInfoSubmitted }: InfoTabsProps) {
    return (
        <Tabs defaultValue="deskripsi_produk" className="w-full">
            {/* PERUBAHAN DISINI: 
              - TabsList: Dihapus grid-cols-3 agar lebar bisa dinamis dan ditambah border bawah.
              - TabsTrigger: Ditambahkan kelas untuk styling active state.
            */}
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-transparent p-0 border-b">
                <TabsTrigger 
                    value="deskripsi_produk"
                    className="data-[state=active]:text-green-600 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-green-600 rounded-none border-b-2 border-transparent"
                >
                    Deskripsi
                </TabsTrigger>
                <TabsTrigger 
                    value="reviews"
                    className="data-[state=active]:text-green-600 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-green-600 rounded-none border-b-2 border-transparent"
                >
                    Review
                </TabsTrigger>
                <TabsTrigger 
                    value="qna"
                    className="data-[state=active]:text-green-600 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-green-600 rounded-none border-b-2 border-transparent"
                >
                    Question
                </TabsTrigger>
            </TabsList>
            
            {/* KOREKSI: value diubah dari "deskripsi" menjadi "deskripsi_produk" agar cocok */}
            <TabsContent value="deskripsi_produk">
                {/* Asumsi Anda ingin menampilkan deskripsi produk, bukan harga */}
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </TabsContent>

            <TabsContent value="reviews">
                <ReviewSection product={product} onReviewSubmitted={onInfoSubmitted} />
            </TabsContent>
            <TabsContent value="qna">
                <QnaSection product={product} onQuestionSubmitted={onInfoSubmitted} />
            </TabsContent>
        </Tabs>
    );
}