function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">E-Commerce</h3>
                        <p className="text-gray-400">Toko online terpercaya dengan berbagai produk berkualitas</p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Tautan Cepat</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white">Tentang Kami</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Kontak</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Layanan</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white">Bantuan</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Pengembalian</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Status Pesanan</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Newsletter</h4>
                        <p className="text-gray-400 mb-4">Dapatkan penawaran spesial</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Email Anda"
                                className="px-3 py-2 bg-gray-800 text-white rounded-l focus:outline-none flex-1"
                            />
                            <button className="bg-indigo-600 px-4 py-2 rounded-r hover:bg-indigo-700">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; {currentYear} E-Commerce. All rights reserved. | Made By : Matius Dimas </p>
                    <a href="https://linkedin.com/in/matiusdimas">https://linkedin.com/in/matiusdimas</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;