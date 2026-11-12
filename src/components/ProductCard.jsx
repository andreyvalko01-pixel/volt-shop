import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../utils/format';
import { CartIcon, HeartIcon } from './Icons';

export default function ProductCard({ product, onAdded }) {
  const { favorites, toggleFavorite, addToCart } = useShop();
  const [qty, setQty] = useState(1);
  const inStock = product.stock > 0;
  const isFav = favorites.includes(product.id);

  const handleAdd = () => {
    addToCart(product.id, qty);
    setQty(1);
    onAdded(product);
  };

  return (
    <article className="card">
      <button
        className={`card__fav ${isFav ? 'is-active' : ''}`}
        onClick={() => toggleFavorite(product.id)}
        aria-label={isFav ? 'Прибрати з обраного' : 'Додати в обране'}
      >
        <HeartIcon filled={isFav} width={18} height={18} />
      </button>

      {product.oldPrice && (
        <span className="card__sale">−{Math.round((1 - product.price / product.oldPrice) * 100)}%</span>
      )}

      <div className="card__img">
        <img src={product.img} alt={product.name} loading="lazy" />
      </div>

      <h3 className="card__title">{product.name}</h3>
      <p className="card__variant">{product.variant}</p>

      <div className="card__price">
        <strong>{formatPrice(product.price)}</strong>
        {product.oldPrice && <s>{formatPrice(product.oldPrice)}</s>}
      </div>

      {inStock ? (
        <div className="card__actions">
          <div className="qty">
            <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Менше">−</button>
            <span>{qty}</span>
            <button onClick={() => setQty(Math.min(product.stock, qty + 1))} aria-label="Більше">+</button>
          </div>
          <button className="btn btn--primary btn--sm" onClick={handleAdd}>
            <CartIcon width={16} height={16} /> У кошик
          </button>
        </div>
      ) : (
        <button className="btn btn--disabled btn--sm" disabled>Немає в наявності</button>
      )}
    </article>
  );
}
