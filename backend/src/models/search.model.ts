export interface SearchRequest {
    title: string;
    location: string;
    minPrice: number;
    maxPrice: number;
    isDeliverable: boolean;
}
