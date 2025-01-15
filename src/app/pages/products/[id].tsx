'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Product } from '@/app/types/product';

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);

  // Check if id is available
  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`https://fakestoreapi.com/products/${id}`);
          const data = await response.json();
          setProduct(data);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (!id) {
    return <p>No product selected</p>;  // If no product id is available
  }

  if (!product) return <p>Loading...</p>;  // Wait until the product is fetched

  // Check if product is loaded and has necessary properties
  return (
    <div>
      {product && (
        <>
          <h1>{product.title}</h1>
          <img src={product.image} alt={product.title} />
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
