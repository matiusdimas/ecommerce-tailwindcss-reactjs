import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import ProductCard from "../components/ProductCard"
import CategoryFilter from "../components/CategoryFilter"
import { sampleProducts } from "../services/sampleProduct"
import FeatureList from "../components/FeatureList"
import { featuresData } from "../data/featuresData"
import { useCart } from "../store/useCart"

// Data produk contoh - hanya ambil 10 data pertama
const Products = sampleProducts.slice(0, 10)

function Home() {
  const location = useLocation()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm] = useState("")
  const { addToCart } = useCart()
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  useEffect(() => {
    if (location.state?.message) {
      setShowSuccessMessage(true)
      const timer = setTimeout(() => {
        setShowSuccessMessage(false)
        window.history.replaceState({}, document.title)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [location.state])

  const filteredProducts = Products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <MainLayout title="Home">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  {location.state?.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Selamat Datang di E-Commerce</h1>
            <p className="text-xl mb-8">Temukan produk terbaik dengan harga terbaik</p>
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Belanja Sekarang
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Products Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Produk Terbaru</h2>
            <span className="text-gray-600">{filteredProducts.length} produk ditemukan</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-4 text-gray-600">Tidak ada produk yang ditemukan</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <FeatureList
        features={featuresData}
        title="Mengapa Memilih Kami?"
        description="Kami memberikan pelayanan terbaik dengan jaminan kepuasan pelanggan"
      />
    </MainLayout>
  )
}

export default Home