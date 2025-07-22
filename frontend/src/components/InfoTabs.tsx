'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type Product, type Question } from "@/lib/types";
import ReviewSection from "./reviews/ReviewSection";
import QnaSection from "./qna/QnaSection";

interface InfoTabsProps {
    product: Product;
    onInfoSubmitted: () => void; // Fungsi "penyegar" umum
}

export default function InfoTabs({ product, onInfoSubmitted }: InfoTabsProps) {
    return (
        <Tabs defaultValue="reviews" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="reviews">Review ({product.reviews_count || 0})</TabsTrigger>
                <TabsTrigger value="qna">Question</TabsTrigger>
            </TabsList>
            <TabsContent value="reviews">
                <ReviewSection product={product} onReviewSubmitted={onInfoSubmitted} />
            </TabsContent>
            <TabsContent value="qna">
                <QnaSection product={product} onQuestionSubmitted={onInfoSubmitted} />
            </TabsContent>
        </Tabs>
    );
}
