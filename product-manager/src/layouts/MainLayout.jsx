import { Link } from "react-router-dom";

function MainLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* 🔥 Sidebar */}
            <div className="w-64 bg-white shadow-md p-5 hidden md:block">
                <h2 className="text-xl font-bold text-blue-600 mb-6">
                    Admin Panel
                </h2>

                <ul className="space-y-4">
                    <li>
                        <Link
                            to="/add-product"
                            className="block px-3 py-2 rounded text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                        >
                            ➕ Add Product
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/products"
                            className="block px-3 py-2 rounded text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                        >
                            🛍️ Products
                        </Link>
                    </li>

                </ul>
            </div>

            {/* 🔥 Main Content */}
            <div className="flex-1 flex flex-col">

                {/* 🔥 Topbar */}
                <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
                    <h1 className="font-semibold text-lg text-gray-700">
                        Dashboard
                    </h1>

                    <Link to="/add-product">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded transition">
                            Add Product
                        </button>
                    </Link>
                </div>

                {/* 🔥 Page Content */}
                <div className="p-6">
                    {children}
                </div>

            </div>
        </div>
    );
}

export default MainLayout;