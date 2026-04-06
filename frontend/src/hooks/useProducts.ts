import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Product } from "@/components/product/ProductCard";
import { ApiResponse } from "@/types/auth";

interface ProductResponse {
    id: string;
    name: string;
    basePrice: number;
    description: string;
    categoryName: string;
    variants?: unknown[];
    createdAt?: string;
    updatedAt?: string;
}

interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

export const useProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: async (): Promise<Product[]> => {
            const { data: apiResponse } = await api.get<ApiResponse<Page<ProductResponse>>>("/products");
            
            // Map backend response to frontend Product interface
            return apiResponse.data.content.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.basePrice || 0,
                category: item.categoryName || "Uncategorized",
                image: "bg-slate-200", // Default placeholder for now
            }));
        },
    });
};
