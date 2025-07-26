import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { createBundle } from '../redux/bundlesSlice';
import '../styles/App.scss';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const SellerDashboard = () => {
  const [name, setName] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${API}/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products', err));
  }, []);

  const handleCheckboxChange = (productId) => {
    if (selectedIds.includes(productId)) {
      setSelectedIds(selectedIds.filter(id => id !== productId));
    } else {
      setSelectedIds([...selectedIds, productId]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedIds.length < 2) {
      alert('Please select at least 2 products');
      return;
    }
    dispatch(createBundle({ name, productIds: selectedIds }));
    setName('');
    setSelectedIds([]);
  };

  return (
    <div className="dashboard">
      <h2>Seller Dashboard - Create Bundle</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Bundle Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <h4>Select Products (at least 2):</h4>
        {products.length === 0 && <p>Loading products...</p>}
        {products.map(product => (
          <div key={product._id}>
            <label>
              <input
                type="checkbox"
                checked={selectedIds.includes(product._id)}
                onChange={() => handleCheckboxChange(product._id)}
              />
              {product.name} — ₹{product.salePrice || product.price}
            </label>
          </div>
        ))}
        <button type="submit">Create Bundle</button>
      </form>
    </div>
  );
};

export default SellerDashboard;
