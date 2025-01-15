'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link'; // Link component import karna
import { Product } from '../app/types/product'; // Product type import karna
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]); // Products state with Product type
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch products when the page loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data); // Products ko set karna
        setLoading(false); // Loading ko false kar dena
      } catch (error) {
        console.error('Error fetching products:', error); // Agar error aaye toh handle karna
        setLoading(false); // Loading ko false kar dena
      }
    };

    fetchProducts(); // Fetch products function ko call karna
  }, []);

  if (loading) return <p className="text-center text-xl">Loading...</p>; // Agar loading hai toh yeh message show hoga

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar/>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-4xl font-semibold text-center mb-8 text-gray-800">Our Products</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img src={product.image} alt={product.title} className="w-full h-64 object-contain rounded-md mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h2>
              <p className="text-gray-600 text-sm mb-4">{product.description.substring(0, 100)}...</p>
              <p className="text-lg font-bold text-gray-900 mb-4">Price: ${product.price}</p>
              
              {/* Product details page ke liye dynamic link create karna */}
              <Link href={`/products/${product.id}`} className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
