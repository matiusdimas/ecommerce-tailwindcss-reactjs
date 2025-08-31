import z from "zod";

export const addressSchema = z.object({
    type: z.enum(["home", "work", "other"]),
    label: z.string().optional().or(z.literal("")),
    recipientName: z.string().min(1, "Nama penerima harus diisi"),
    phone: z.string()
        .regex(/^[0-9]*$/, "Nomor telepon hanya boleh mengandung angka")
        .min(8, "Nomor telepon minimal 8 digit")
        .max(15, "Nomor telepon maksimal 15 digit"),
    line1: z.string().min(1, "Alamat lengkap harus diisi"),
    line2: z.string().optional().or(z.literal("")),
    city: z.string().min(1, "Kota harus diisi"),
    state: z.string().min(1, "Provinsi harus diisi"),
    postalCode: z.string()
        .regex(/^[0-9]*$/, "Kode pos hanya boleh mengandung angka")
        .min(5, "Kode pos minimal 5 digit")
        .max(6, "Kode pos maksimal 6 digit"),
    country: z.string().min(1, "Negara harus diisi"),
    isDefault: z.boolean()
});

export type AddressFormData = z.infer<typeof addressSchema>;