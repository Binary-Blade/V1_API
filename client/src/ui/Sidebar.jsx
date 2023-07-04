import { useContext } from 'react';
import { CartContext } from '../../context/CartProvider';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <h2>Your cart</h2>
      {cart.map((product, index) => (
        <div key={index}>
          <h3>{product.name}</h3>
          {/* D'autres informations sur le produit ici */}
        </div>
      ))}
      <Link to="/cart">Go to cart</Link>
    </div>
  );
};
