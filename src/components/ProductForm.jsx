import React, { useState, useEffect } from 'react';

export default function ProductForm({ onSubmit, onCancel, selectedProduct, searchTerm, onSearch }) {
  const [form, setForm] = useState({
    name: '',
    category: '',
    quantity: '',
    perBox: '',
    price: '',
    expiryDate: '',
    barcode: '',
    serialNumber: '',
    image: '',
  });

  useEffect(() => {
    if (selectedProduct) {
      setForm(selectedProduct);
    } else {
      setForm({
        name: '',
        category: '',
        quantity: '',
        perBox: '',
        price: '',
        expiryDate: '',
        barcode: '',
        serialNumber: '',
        image: '',
      });
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.quantity) {
      alert('Iltimos, nomi va soni to‘ldirilsin');
      return;
    }
    onSubmit(form);
    setForm({
      name: '',
      category: '',
      quantity: '',
      perBox: '',
      price: '',
      expiryDate: '',
      barcode: '',
      serialNumber: '',
      image: '',
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">

      {/* 📝 Forma */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="category" value={form.category} onChange={handleChange} placeholder="Kategoriya" className="border p-2 rounded" />
        <input name="serialNumber" value={form.serialNumber} onChange={handleChange} placeholder="🆔 Tartib raqam" className="border p-2 rounded" />
        <input name="name" value={form.name} onChange={handleChange} placeholder="Mahsulot nomi" className="border p-2 rounded" />
        <input name="quantity" type="number" value={form.quantity} onChange={handleChange} placeholder="Jami soni" className="border p-2 rounded" />
        <input name="perBox" type="number" value={form.perBox} onChange={handleChange} placeholder="1 karobkada nechta" className="border p-2 rounded" />
        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Narxi (💲 USD)" className="border p-2 rounded" />
        <input name="expiryDate" type="date" value={form.expiryDate} onChange={handleChange} className="border p-2 rounded" />
        <input name="barcode" value={form.barcode} onChange={handleChange} placeholder="Shtrix kod" className="border p-2 rounded" />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Rasm URL manzili  🔗" className="border p-2 rounded" />

        <div className="col-span-full flex gap-2 mt-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {selectedProduct ? 'Saqlash' : 'Qo‘shish'}
          </button>
          {selectedProduct && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Bekor qilish
            </button>
          )}
        </div>
      </form>
      {/* 🔍 Qidiruv maydoni */}
      <div className="mb-2 mt-5">
        <input
          type="text"
          placeholder="🔍 Qidiruv: nom, kategoriya, shtrix kod..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
    </div>
  );
}
