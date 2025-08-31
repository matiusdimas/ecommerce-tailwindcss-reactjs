import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../store/useAuth"
import { loginSchema, sanitizeInput } from "../utils/loginValidation"
import { ZodError } from "zod" // Import ZodError

function Login() {
    const navigate = useNavigate()
    const login = useAuth((state) => state.login)
    const [form, setForm] = useState({ identifier: "", password: "" })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [loginError, setLoginError] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (errors[e.target.name]) {
            setErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[e.target.name]
                return newErrors
            })
        }
        if (loginError) {
            setLoginError("")
        }
        setForm({
            ...form,
            [e.target.name]: sanitizeInput(e.target.value),
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setLoginError("")
        setErrors({}) // Reset errors sebelum validasi

        try {
            // Validasi dengan Zod
            loginSchema.parse(form)

            // Simulasi API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            try {
                await login(form.identifier, form.password)
                navigate("/home")
            } catch (error) {
                setLoginError(error instanceof Error ? error.message : "Login failed")
            }
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
            } else {
                setLoginError("An unexpected error occurred")
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
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-center text-sm text-indigo-200">
                        Sign in to your account
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="px-8 py-6">
                    {/* Tampilan Error Login */}
                    {loginError && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
                            <div className="flex-shrink-0">
                                <svg className="w-5 h-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">
                                    Gagal masuk
                                </h3>
                                <p className="text-sm text-red-700 mt-1">
                                    {loginError}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="mb-5">
                        <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-1">
                            Username or Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="identifier"
                            type="text"
                            name="identifier"
                            value={form.identifier}
                            onChange={handleChange}
                            className={`mt-1 appearance-none relative block w-full px-3 py-3 border placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:z-10 sm:text-sm ${errors.identifier ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                }`}
                            placeholder="Enter your username or email"
                        />
                        {errors.identifier && (
                            <p className="mt-1 text-red-500 text-sm flex items-center">
                                <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                                {errors.identifier}
                            </p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className={`mt-1 appearance-none relative block w-full px-3 py-3 border placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:z-10 sm:text-sm ${errors.password ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                }`}
                            placeholder="Enter your password"
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

                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </a>
                        </div>
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
                                Signing in...
                            </span>
                        ) : "Sign in"}
                    </button>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Sign up now
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login