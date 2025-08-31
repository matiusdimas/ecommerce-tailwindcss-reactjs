import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../store/useAuth"
import { registerSchema, sanitizeInput, type RegisterFormData } from "../utils/registerValidation"
import { ZodError } from "zod"


function Register() {
    const register = useAuth((state) => state.register)
    const navigate = useNavigate()
    const [form, setForm] = useState<RegisterFormData>({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [registerError, setRegisterError] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (errors[e.target.name]) {
            setErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[e.target.name]
                return newErrors
            })
        }
        if (registerError) {
            setRegisterError("")
        }
        setForm({
            ...form,
            [e.target.name]: sanitizeInput(e.target.value),
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setRegisterError("")
        setErrors({}) // Reset errors sebelum validasi

        try {
            registerSchema.parse(form)

            await new Promise(resolve => setTimeout(resolve, 1000))

            const userData = {
                name: form.name,
                username: form.username,
                email: form.email,
                password: form.password,
            }

            await register(userData)
            navigate("/home", { state: { message: "Registrasi berhasil! Silakan login." } })
        } catch (error) {
            if (error instanceof ZodError) {
                const fieldErrors: Record<string, string> = {}
                error.issues.forEach((issue) => {
                    if (issue.path && issue.path.length > 0) {
                        const firstPath = issue.path[0];
                        if (typeof firstPath === 'string' || typeof firstPath === 'number') {
                            fieldErrors[String(firstPath)] = issue.message;
                        }
                    }
                })
                setErrors(fieldErrors)
            } else if (error instanceof Error) {
                setRegisterError(error.message)
            } else {
                setRegisterError("Registration failed")
            }
        } finally {
            setIsSubmitting(false)
        }
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-indigo-600 py-4 px-6">
                    <h2 className="text-center text-3xl font-extrabold text-white">
                        Create Account
                    </h2>
                    <p className="mt-2 text-center text-sm text-indigo-200">
                        Join us to get started
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="px-8 py-6">
                    {/* Tampilan Error Registrasi */}
                    {registerError && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
                            <div className="flex-shrink-0">
                                <svg className="w-5 h-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">
                                    Gagal registrasi
                                </h3>
                                <p className="text-sm text-red-700 mt-1">
                                    {registerError}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className={`mt-1 appearance-none relative block w-full px-3 py-3 border placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:z-10 sm:text-sm ${errors.name ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                }`}
                            placeholder="Enter your full name"
                        />
                        {errors.name && (
                            <p className="mt-1 text-red-500 text-sm flex items-center">
                                <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Username <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            required
                            className={`mt-1 appearance-none relative block w-full px-3 py-3 border placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:z-10 sm:text-sm ${errors.username ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                }`}
                            placeholder="Choose a username"
                        />
                        {errors.username && (
                            <p className="mt-1 text-red-500 text-sm flex items-center">
                                <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                                {errors.username}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className={`mt-1 appearance-none relative block w-full px-3 py-3 border placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:z-10 sm:text-sm ${errors.email ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                }`}
                            placeholder="Enter your email address"
                        />
                        {errors.email && (
                            <p className="mt-1 text-red-500 text-sm flex items-center">
                                <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className={`mt-1 appearance-none relative block w-full px-3 py-3 border placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:z-10 sm:text-sm ${errors.password ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                }`}
                            placeholder="Create a password"
                        />
                        {errors.password && (
                            <p className="mt-1 text-red-500 text-sm flex items-center">
                                <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                            className={`mt-1 appearance-none relative block w-full px-3 py-3 border placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:z-10 sm:text-sm ${errors.confirmPassword ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                }`}
                            placeholder="Confirm your password"
                        />
                        {errors.confirmPassword && (
                            <p className="mt-1 text-red-500 text-sm flex items-center">
                                <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating account...
                            </span>
                        ) : "Create Account"}
                    </button>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register