import type { Product } from '../types/product'

interface ProductCardProps {
    product: Product
    onAddToCart: (product: Product) => void
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price)
    }

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <span
                key={index}
                className={index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}
            >
                ★
            </span>
        ))
    }

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                />
                {product.discount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                        -{product.discount}%
                    </div>
                )}
                {product.isNew && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold">
                        Baru
                    </div>
                )}
                {product.isHot && (
                    <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded text-sm font-semibold">
                        Hot
                    </div>
                )}
            </div>

            <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-gray-900">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{product.category}</p>

                <div className="flex items-center mb-3">
                    <div className="flex">
                        {renderStars(product.rating)}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">({product.reviewCount})</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                        )}
                    </div>
                </div>

                <button
                    onClick={() => onAddToCart(product)}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                >
                    Tambah ke Keranjang
                </button>
            </div>
        </div>
    )
}

export default ProductCard