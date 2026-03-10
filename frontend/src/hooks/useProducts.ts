import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Product } from "@/components/product/ProductCard";

interface ProductResponse {
    id: string;
    name: string;
    price: number;
    description: string;
    category: {
        id: string;
        name: string;
        slug: string;
    };
    images?: string[];
    variants?: any[];
}

interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
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
                price: item.price,
                category: item.category?.name || "Uncategorized",
                image: "bg-slate-200", // Default placeholder for now as backend might not return images yet
                // Logic to interpret 'isNew' or 'isSale' can be added here if backend provides 'createdAt' or 'salePrice'
            }));
        },
    });
};
