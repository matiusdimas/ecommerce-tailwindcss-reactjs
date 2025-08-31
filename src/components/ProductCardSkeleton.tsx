// components/ProductCardSkeleton.tsx
function ProductCardSkeleton() {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="bg-gray-300 h-48 w-full"></div>
            <div className="p-4">
                <div className="bg-gray-300 h-4 rounded mb-2"></div>
                <div className="bg-gray-300 h-4 rounded w-3/4 mb-4"></div>
                <div className="flex items-center mb-2">
                    <div className="bg-gray-300 h-4 rounded w-1/4"></div>
                    <div className="bg-gray-300 h-4 rounded w-1/4 ml-2"></div>
                </div>
                <div className="bg-gray-300 h-6 rounded w-1/2 mb-4"></div>
                <div className="bg-gray-400 h-10 rounded"></div>
            </div>
        </div>
    )
}

export default ProductCardSkeleton