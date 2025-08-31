// hooks/useSearch.ts (versi komprehensif)
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { safeValidateSearchInput, sanitizeSearchQuery } from '../utils/searchValidation';
import { useSearch } from '../store/useSearch';

export const useSearchHook = () => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { addToRecentSearches } = useSearch();

    const handleSearch = (rawQuery: string) => {
        try {
            // Reset error state
            setError(null);

            // Sanitasi input terlebih dahulu
            const sanitizedQuery = sanitizeSearchQuery(rawQuery);

            // Validasi input menggunakan Zod dengan safeParse
            const validationResult = safeValidateSearchInput({ query: sanitizedQuery });

            if (!validationResult.success) {
                setError(validationResult.error || "Input pencarian tidak valid");
                setTimeout(() => setError(null), 3000);
                return;
            }

            // Navigasi ke halaman produk dengan query yang sudah divalidasi
            if (validationResult.data?.query && validationResult.data.query.trim() !== '') {
                addToRecentSearches(validationResult.data.query);
                navigate(`/products?search=${encodeURIComponent(validationResult.data.query)}`);
            } else {
                // Jika query kosong, navigasi ke halaman semua produk tanpa parameter
                navigate('/products');
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Terjadi kesalahan saat melakukan pencarian');
            }

            // Hapus error setelah 3 detik
            setTimeout(() => setError(null), 3000);
        }
    };

    return {
        error,
        handleSearch,
    };
};