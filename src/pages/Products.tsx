// pages/Products.tsx
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import ProductCard from "../components/ProductCard"
import FilterBar from "../components/FilterBar"
import { sampleProducts } from "../services/sampleProduct"
import { useCart } from "../store/useCart"
import { useSearch } from "../store/useSearch"
import ProductCardSkeleton from "../components/ProductCardSkeleton"

interface FilterOptions {
    category: string
    minPrice: number | null
    maxPrice: number | null
    minRating: number | null
    sortBy: string
}

function Products() {
    const location = useLocation()
    const navigate = useNavigate()
    const { addToCart } = useCart()
    const { searchTerm, setSearchTerm, clearSearchTerm } = useSearch()
    const [filters, setFilters] = useState<FilterOptions>({
        category: "All",
        minPrice: null,
        maxPrice: null,
        minRating: null,
        sortBy: "default"
    })
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5)

    // Extract categories from products
    const categories = Array.from(new Set(sampleProducts.map(product => product.category)))

    // Get search term from URL params if exists
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const search = searchParams.get('search')

        if (search) {
            setSearchTerm(decodeURIComponent(search))
        } else {
            clearSearchTerm()
        }
    }, [location.search, setSearchTerm, clearSearchTerm])

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1500)

        return () => clearTimeout(timer)
    }, [])

    const filteredProducts = sampleProducts
        .filter(product => {
            const matchesSearch = searchTerm === "" ||
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesCategory = filters.category === "All" || product.category === filters.category
            const matchesMinPrice = filters.minPrice === null || product.price >= filters.minPrice
            const matchesMaxPrice = filters.maxPrice === null || product.price <= filters.maxPrice
            const matchesRating = filters.minRating === null || product.rating >= filters.minRating

            return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice && matchesRating
        })
        .sort((a, b) => {
            switch (filters.sortBy) {
                case "price-asc":
                    return a.price - b.price
                case "price-desc":
                    return b.price - a.price
                case "rating":
                    return b.rating - a.rating
                case "newest":
                    return b.id - a.id
                default:
                    return 0
            }
        })

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

    const handleFilterChange = (newFilters: FilterOptions) => {
        setFilters(newFilters)
        setCurrentPage(1) // Reset to first page when filters change
    }

    const clearSearch = () => {
        clearSearchTerm()
        setFilters({
            category: "All",
            minPrice: null,
            maxPrice: null,
            minRating: null,
            sortBy: "default"
        })
        setCurrentPage(1)
        navigate('/products', { replace: true })
    }

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <MainLayout title="Semua Produk">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Semua Produk</h1>
                    <p className="text-gray-600 mt-2">
                        Menampilkan {filteredProducts.length} produk
                        {searchTerm && (
                            <span>
                                {" untuk pencarian "}
                                <span className="font-medium">"{searchTerm}"</span>
                                <button
                                    onClick={clearSearch}
                                    className="ml-2 text-indigo-600 hover:text-indigo-800 text-sm"
                                >
                                    (Hapus pencarian)
                                </button>
                            </span>
                        )}
                    </p>
                </div>

                <FilterBar
                    onFilterChange={handleFilterChange}
                    categories={categories}
                />

                {isLoading ? (
                    // Loading Skeleton
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({ length: itemsPerPage }).map((_, index) => (
                            <ProductCardSkeleton key={index} />
                        ))}
                    </div>
                ) : filteredProducts.length === 0 ? (
                    // No products found
                    <div className="text-center py-12">
                        <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="mt-4 text-gray-600">Tidak ada produk yang ditemukan</p>
                        <button
                            onClick={clearSearch}
                            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Reset Pencarian & Filter
                        </button>
                    </div>
                ) : (
                    // Products with Pagination
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {currentItems.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={addToCart}
                                />
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-8">
                                <nav className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Previous
                                    </button>

                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`px-3 py-1 rounded-md border ${currentPage === page
                                                    ? 'bg-indigo-600 text-white border-indigo-600'
                                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                    </button>
                                </nav>
                            </div>
                        )}
                    </>
                )}
            </div>
        </MainLayout>
    )
}

export default Products