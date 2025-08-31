// schemas/searchSchema.ts (versi komprehensif)
import { z } from 'zod';

// Schema untuk validasi pencarian
export const searchSchema = z.object({
    query: z.string()
        .max(100, { message: "Pencarian tidak boleh lebih dari 100 karakter" })
        .optional(),
});

// Type inference dari schema
export type SearchInput = z.infer<typeof searchSchema>;

// Type untuk error result
export interface ValidationResult {
    success: boolean;
    data?: SearchInput;
    error?: string;
}

// Fungsi untuk memvalidasi input pencarian dengan safeParse
export const safeValidateSearchInput = (input: unknown): ValidationResult => {
    const result = searchSchema.safeParse(input);

    if (!result.success) {
        // Mengumpulkan semua error messages
        const errorMessages = result.error.issues.map(issue => issue.message);
        return {
            success: false,
            error: errorMessages.join(', ')
        };
    }

    return {
        success: true,
        data: result.data
    };
};

// Fungsi untuk validasi yang melemparkan error
export const validateSearchInput = (input: unknown): SearchInput => {
    const result = safeValidateSearchInput(input);

    if (!result.success) {
        throw new Error(result.error || "Input pencarian tidak valid");
    }

    return result.data as SearchInput;
};

// Fungsi untuk sanitasi input
export const sanitizeSearchQuery = (query: string): string => {
    return query
        .trim()
        .replace(/[<>]/g, '')
        .slice(0, 100);
};