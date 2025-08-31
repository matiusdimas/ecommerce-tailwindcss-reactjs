export interface Product {
    id: number
    name: string
    price: number
    originalPrice?: number
    image: string
    category: string
    rating: number
    reviewCount: number
    isNew?: boolean
    isHot?: boolean
    discount?: number
}