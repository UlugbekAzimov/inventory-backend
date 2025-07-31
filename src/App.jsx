import React, { useEffect, useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

export default function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState('');

  // 🔄 Mahsulotlarni olish
  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Xatolik:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 💾 Saqlash (yangi yoki tahrir)
  const handleSaveProduct = async (product) => {
    const method = product._id ? 'PUT' : 'POST';
    const url = product._id
      ? `http://localhost:5000/api/products/${product._id}`
      : 'http://localhost:5000/api/products';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (!res.ok) throw new Error('Server bilan muammo');
      await fetchProducts();
      setSelectedProduct(null);
    } catch (err) {
      alert('Saqlashda xatolik yuz berdi');
      console.error(err);
    }
  };

  // 🗑 O‘chirish
  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Haqiqatan ham o‘chirmoqchimisiz?')) return;

    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
      });
      await fetchProducts();
    } catch (err) {
      alert('O‘chirishda xatolik');
      console.error(err);
    }
  };

  // 🔍 Qidiruv filtri
  const filteredProducts = products.filter((product) => {
    const term = search.toLowerCase();
    return (
      product.name?.toLowerCase().includes(term) ||
      product.category?.toLowerCase().includes(term) ||
      product.barcode?.toLowerCase().includes(term) ||
      product.serialNumber?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">📦 Mahsulotlar boshqaruvi</h1>

      {/* 🔍 Qidiruv + Forma */}
      <ProductForm
        onSubmit={handleSaveProduct}
        onCancel={() => setSelectedProduct(null)}
        selectedProduct={selectedProduct}
        searchTerm={search}
        onSearch={setSearch}
      />

      {/* 📋 Jadval ko‘rinishida mahsulotlar ro‘yxati */}
      <ProductList
        products={filteredProducts}
        onEdit={setSelectedProduct}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
}
