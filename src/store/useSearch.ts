// store/useSearch.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SearchState {
    searchTerm: string
    recentSearches: string[]
    setSearchTerm: (term: string) => void
    clearSearchTerm: () => void
    addToRecentSearches: (term: string) => void
    clearRecentSearches: () => void
}

export const useSearch = create<SearchState>()(
    persist(
        (set, get) => ({
            searchTerm: '',
            recentSearches: [],

            setSearchTerm: (term) => set({ searchTerm: term }),
            clearSearchTerm: () => set({ searchTerm: '' }),

            addToRecentSearches: (term) => {
                if (!term.trim()) return

                const currentSearches = get().recentSearches
                const updatedSearches = [
                    term,
                    ...currentSearches.filter(search => search !== term)
                ].slice(0, 5)

                set({ recentSearches: updatedSearches })
            },

            clearRecentSearches: () => set({ recentSearches: [] }),
        }),
        {
            name: 'search-storage',
        }
    )
)