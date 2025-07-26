import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBundles } from '../redux/bundlesSlice';
import '../styles/App.scss';

const ProductBundleDisplay = () => {
  const dispatch = useDispatch();
  const bundles = useSelector(state => state.bundles.bundles);
  const status = useSelector(state => state.bundles.status);

  useEffect(() => {
    dispatch(fetchBundles());
  }, [dispatch]);

  return (
    <div className="bundle-display">
      <h2>Available Bundles</h2>
      {status === 'loading' && <p>Loading...</p>}
      {bundles.map(bundle => (
        <div key={bundle._id} className="bundle-card">
          <h3>{bundle.name}</h3>
          <ul>
            {bundle.products.map((p, idx) => (
              <li key={idx}>{p.name} - ₹{p.salePrice || p.price}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProductBundleDisplay;
