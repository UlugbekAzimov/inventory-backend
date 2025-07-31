import React, { useState } from 'react';

export default function ProductList({ products, onEdit, onDelete }) {
  const [zoomedImage, setZoomedImage] = useState(null);

  const getBoxCount = (quantity, perBox) => {
    if (!quantity || !perBox) return 0;
    return Math.ceil(quantity / perBox);
  };

  const getTotalPrice = (quantity, price) => {
    if (!quantity || !price) return 0;
    return quantity * price;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    return date.toLocaleDateString('uz-UZ');
  };

  return (
    <>
      <div className="overflow-x-auto mt-4 max-h-[600px] overflow-y-scroll">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Rasm</th>
              <th className="border p-2">Tartib raqam</th>
              <th className="border p-2">Kategoriya</th>
              <th className="border p-2">Mahsulot nomi</th>
              <th className="border p-2">Karobka soni</th>
              <th className="border p-2">1 karobkada</th>
              <th className="border p-2">Jami soni</th>
              <th className="border p-2">Narxi (💲)</th>
              <th className="border p-2">Jami (💲)</th>
              <th className="border p-2">Shtrix kod</th>
              <th className="border p-2">Yaroqlilik sanasi</th>
              <th className="border p-2">Qo'shilgan sana</th>
              <th className="border p-2">Amallar</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2 text-center">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt="Rasm"
                      className="w-12 h-12 object-cover rounded cursor-pointer hover:scale-105 transition"
                      onClick={() => setZoomedImage(product.image)}
                    />
                  ) : (
                    <span>—</span>
                  )}
                </td>
                <td className="border p-2">{product.serialNumber || '—'}</td>
                <td className="border p-2">{product.category || '—'}</td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2 text-center">
                         {getBoxCount(product.quantity, product.perBox)} 
                         </td>
                <td className="border p-2 text-center">{product.perBox}</td>
                <td className="border p-2 text-center">{product.quantity}</td>
                <td className="border p-2 text-center">
                  {product.price?.toLocaleString() || '—'}
                </td>
                <td className="border p-2 text-center">
                  {getTotalPrice(product.quantity, product.price).toLocaleString()}
                </td>
                <td className="border p-2">{product.barcode || '—'}</td>
                <td className="border p-2">{product.expiryDate || '—'}</td>
                <td className="border p-2 text-center">{formatDate(product.createdAt)}</td>
                <td className="border p-2 text-center space-x-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    ✏️ Tahrirlash
                  </button>
                  <button
                    onClick={() => onDelete(product._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    🗑️ O'chirish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rasm kattalashtirish modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => setZoomedImage(null)}
        >
          <img
            src={zoomedImage}
            alt="Kattalashtirilgan rasm"
            className="max-w-full max-h-full rounded shadow-lg"
          />
        </div>
      )}
    </>
  );
}
