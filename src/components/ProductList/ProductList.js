import Product from '../Product/Product';

import './ProductList.scss';

const ProductList = ({ products }) => {
  // console.log('products : ', products);
  return (
    <div className="product-lists grid bg-whitesmoke my-3">
      {products &&
        products.length > 0 &&
        products.map((product) => {
          let discountedPrice = product.price - product.price * (product.discountPercentage / 100);
          return <Product key={product.id} product={{ ...product, discountedPrice }} />;
        })}
    </div>
  );
};

export default ProductList;
