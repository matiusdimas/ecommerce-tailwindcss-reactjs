import { z } from "zod"
import sanitizeHtml from "sanitize-html"

export const registerSchema = z.object({
    name: z.string()
        .min(3, { message: "Nama minimal 3 karakter" })
        .max(100, { message: "Nama terlalu panjang" })
        .regex(/^[a-zA-Z\s]+$/, { message: "Nama hanya boleh mengandung huruf dan spasi" }),

    username: z.string()
        .min(3, { message: "Username minimal 3 karakter" })
        .max(20, { message: "Username terlalu panjang" })
        .regex(/^[a-zA-Z0-9_]+$/, { message: "Username hanya boleh mengandung huruf, angka, dan underscore" }),

    email: z.email({ message: "Format email tidak valid" })
        .max(100, { message: "Email terlalu panjang" }),

    password: z.string()
        .min(6, { message: "Password minimal 6 karakter" })
        .max(50, { message: "Password terlalu panjang" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
            message: "Password harus mengandung minimal 1 huruf kecil, 1 huruf besar, dan 1 angka"
        }),

    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak sesuai",
    path: ["confirmPassword"],
})

// Fungsi sanitize input (biar aman dari XSS)
export function sanitizeInput(input: string): string {
    return sanitizeHtml(input, {
        allowedTags: [],        // hapus semua tag HTML
        allowedAttributes: {},  // hapus semua atribut
    })
}

// Type untuk data registrasi
export type RegisterFormData = z.infer<typeof registerSchema>