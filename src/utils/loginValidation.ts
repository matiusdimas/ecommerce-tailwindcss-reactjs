import { z } from "zod"
import sanitizeHtml from "sanitize-html"

export const loginSchema = z.object({
    identifier: z.string()
        .min(3, { message: "Username/Email minimal 3 karakter" })
        .max(100, { message: "Username/Email terlalu panjang" }),
    password: z.string()
        .min(6, { message: "Password minimal 6 karakter" }),
})

// Fungsi sanitize input (biar aman dari XSS)
export function sanitizeInput(input: string): string {
    return sanitizeHtml(input, {
        allowedTags: [],        // hapus semua tag HTML
        allowedAttributes: {},  // hapus semua atribut
    })
}
