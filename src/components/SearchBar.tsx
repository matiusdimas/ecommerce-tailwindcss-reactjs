// components/SearchBar.tsx
import { useState, useEffect, useRef } from "react"
import { useSearchHook } from "../hooks/useSearchHook"
import { useSearch } from "../store/useSearch"

function SearchBar() {
    const [query, setQuery] = useState("")
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const { error, handleSearch } = useSearchHook()
    const { recentSearches } = useSearch()
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setIsDropdownOpen(false)
            handleSearch(query)
        } else if (e.key === "Escape") {
            setIsDropdownOpen(false)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsDropdownOpen(false)
        handleSearch(query)
    }

    const handleSuggestionClick = (suggestion: string) => {
        setQuery(suggestion)
        setIsDropdownOpen(false)
        handleSearch(suggestion)
    }

    const showSuggestions = isDropdownOpen && recentSearches.length > 0

    return (
        <div className="flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full" ref={dropdownRef}>
                <form onSubmit={handleSubmit} className="relative w-full">
                    <input
                        type="text"
                        placeholder="Cari produk..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setIsDropdownOpen(true)}
                        className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </form>

                {/* Dropdown suggestions */}
                {showSuggestions && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                        <div className="py-2">
                            <div className="px-4 py-1 text-xs text-gray-500 font-medium">
                                Pencarian Terakhir
                            </div>
                            {recentSearches.map((search, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSuggestionClick(search)}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    {search}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Error message */}
                {error && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm z-20">
                        {error}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchBar