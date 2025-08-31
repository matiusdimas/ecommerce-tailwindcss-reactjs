import { useState } from "react"

interface CategoryFilterProps {
    selectedCategory: string
    onCategoryChange: (category: string) => void
}

// Data kategori dengan ikon
const categories = [
    { name: "All", icon: "📁" },
    { name: "Electronics", icon: "📱" },
    { name: "Clothing", icon: "👕" },
    { name: "Books", icon: "📚" },
    { name: "Home & Kitchen", icon: "🏠" },
    { name: "Beauty", icon: "💄" },
    { name: "Sports", icon: "⚽" },
    { name: "Toys", icon: "🧸" }
]

function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
    const [showMobileMenu, setShowMobileMenu] = useState(false)

    return (
        <section className="py-8 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Kategori</h2>

                {/* Mobile filter toggle */}
                <div className="lg:hidden mb-4">
                    <button
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                        className="flex items-center justify-between w-full px-6 py-3 bg-gray-100 rounded-lg transition-colors hover:bg-gray-200"
                    >
                        <div className="flex items-center space-x-2">
                            <span className="text-lg">
                                {categories.find(cat => cat.name === selectedCategory)?.icon}
                            </span>
                            <span className="font-medium text-gray-700">
                                {selectedCategory}
                            </span>
                        </div>
                        <svg
                            className={`w-5 h-5 text-gray-500 transform transition-transform ${showMobileMenu ? "rotate-180" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                </div>

                {/* Category list - Desktop */}
                <div className="hidden lg:flex flex-wrap gap-4 justify-center">
                    {categories.map((category) => (
                        <button
                            key={category.name}
                            onClick={() => onCategoryChange(category.name)}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${selectedCategory === category.name
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            <span className="text-lg">{category.icon}</span>
                            <span>{category.name}</span>
                        </button>
                    ))}
                </div>

                {/* Category list - Mobile (shown when toggled) */}
                {showMobileMenu && (
                    <div className="lg:hidden grid grid-cols-2 gap-3 mt-4">
                        {categories.map((category) => (
                            <button
                                key={category.name}
                                onClick={() => {
                                    onCategoryChange(category.name)
                                    setShowMobileMenu(false)
                                }}
                                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${selectedCategory === category.name
                                    ? "bg-indigo-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                <span className="text-lg">{category.icon}</span>
                                <span className="text-sm">{category.name}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default CategoryFilter