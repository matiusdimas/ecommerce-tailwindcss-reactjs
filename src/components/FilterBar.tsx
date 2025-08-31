// components/FilterBar.tsx
import { useState } from "react"

interface FilterOptions {
    category: string
    minPrice: number | null
    maxPrice: number | null
    minRating: number | null
    sortBy: string
}

interface FilterBarProps {
    onFilterChange: (filters: FilterOptions) => void
    categories: string[]
}

function FilterBar({ onFilterChange, categories }: FilterBarProps) {
    const [filters, setFilters] = useState<FilterOptions>({
        category: "All",
        minPrice: null,
        maxPrice: null,
        minRating: null,
        sortBy: "default"
    })

    const handleFilterChange = (key: keyof FilterOptions, value: any) => {
        const newFilters = { ...filters, [key]: value }
        setFilters(newFilters)
        onFilterChange(newFilters)
    }

    const clearFilters = () => {
        const resetFilters = {
            category: "All",
            minPrice: null,
            maxPrice: null,
            minRating: null,
            sortBy: "default"
        }
        setFilters(resetFilters)
        onFilterChange(resetFilters)
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filter Produk</h3>
                <button
                    onClick={clearFilters}
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                    Reset Filter
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Kategori
                    </label>
                    <select
                        value={filters.category}
                        onChange={(e) => handleFilterChange("category", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="All">Semua Kategori</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Price Range Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Harga Minimum
                    </label>
                    <input
                        type="number"
                        placeholder="Rp Min"
                        value={filters.minPrice || ""}
                        onChange={(e) => handleFilterChange("minPrice", e.target.value ? parseInt(e.target.value) : null)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Harga Maksimum
                    </label>
                    <input
                        type="number"
                        placeholder="Rp Max"
                        value={filters.maxPrice || ""}
                        onChange={(e) => handleFilterChange("maxPrice", e.target.value ? parseInt(e.target.value) : null)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Rating Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Minimum Rating
                    </label>
                    <select
                        value={filters.minRating || ""}
                        onChange={(e) => handleFilterChange("minRating", e.target.value ? parseInt(e.target.value) : null)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Semua Rating</option>
                        <option value="4">4 bintang ke atas</option>
                        <option value="3">3 bintang ke atas</option>
                        <option value="2">2 bintang ke atas</option>
                        <option value="1">1 bintang ke atas</option>
                    </select>
                </div>

                {/* Sort Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Urutkan Berdasarkan
                    </label>
                    <select
                        value={filters.sortBy}
                        onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="default">Default</option>
                        <option value="price-asc">Harga: Rendah ke Tinggi</option>
                        <option value="price-desc">Harga: Tinggi ke Rendah</option>
                        <option value="rating">Rating Tertinggi</option>
                        <option value="newest">Terbaru</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default FilterBar