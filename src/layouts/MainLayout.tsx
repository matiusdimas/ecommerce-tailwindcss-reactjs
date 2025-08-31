import type { ReactNode } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface MainLayoutProps {
    children: ReactNode
    title?: string
}

function MainLayout({ children, title }: MainLayoutProps) {
    if (title) {
        document.title = `${title} - E-Commerce`
    } else {
        document.title = "E-Commerce"
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout
