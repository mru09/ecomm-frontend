import React from 'react';
import SellerDashboard from './components/SellerDashboard';
import ProductBundleDisplay from './components/ProductBundleDisplay';
import './styles/App.scss';

function App() {
  return (
    <div>
      <SellerDashboard />
      <ProductBundleDisplay />
    </div>
  );
}

export default App;
