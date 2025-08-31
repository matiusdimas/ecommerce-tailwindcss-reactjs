import { Link } from "react-router-dom"

function Logo() {
    return (
        <Link to="/home" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">E-Commerce</span>
        </Link>
    )
}

export default Logo