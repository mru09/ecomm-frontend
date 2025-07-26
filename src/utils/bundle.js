export const getBundleTotal = (bundle) => {
  const originalTotal = bundle.products.reduce((sum, p) => sum + (p.price || 0), 0);
  const discountedTotal = originalTotal * 0.9; // 10% discount
  return Math.round(discountedTotal); // round off to nearest integer
};