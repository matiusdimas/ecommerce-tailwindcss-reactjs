import z from "zod";

export const profileSchema = z.object({
    name: z.string().min(1, "Nama lengkap harus diisi"),
    email: z.email("Email tidak valid"),
    phone: z.string()
        .regex(/^[0-9]*$/, "Nomor telepon hanya boleh mengandung angka")
        .optional()
        .or(z.literal("")),
    birthDate: z.string().optional().or(z.literal("")),
    gender: z.enum(["male", "female", "other", "prefer_not_to_say", ""]).optional()
});

export type ProfileFormData = z.infer<typeof profileSchema>;