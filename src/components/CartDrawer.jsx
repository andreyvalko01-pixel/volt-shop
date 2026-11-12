import { useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { formatPrice, plural } from '../utils/format';
import { CloseIcon } from './Icons';

const FREE_DELIVERY_FROM = 3000;

export default function CartDrawer({ open, onClose, onCheckout }) {
  const { items, count, total, setQty, removeFromCart } = useShop();

  // Esc закриває кошик
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const leftForFree = FREE_DELIVERY_FROM - total;

  return (
    <>
      <div className={`overlay ${open ? 'is-open' : ''}`} onClick={onClose} />
      <aside className={`drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="drawer__head">
          <h2>Кошик {count > 0 && <small>{count} {plural(count, ['товар', 'товари', 'товарів'])}</small>}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Закрити"><CloseIcon /></button>
        </div>

        {items.length === 0 ? (
          <p className="drawer__empty">Кошик порожній. Додайте щось із каталогу 🙂</p>
        ) : (
          <>
            <ul className="drawer__list">
              {items.map(({ product, qty }) => (
                <li key={product.id} className="cart-item">
                  <img src={product.img} alt="" />
                  <div className="cart-item__info">
                    <p>{product.name}</p>
                    <small>{product.variant}</small>
                    <div className="qty qty--sm">
                      <button onClick={() => setQty(product.id, qty - 1)}>−</button>
                      <span>{qty}</span>
                      <button onClick={() => setQty(product.id, qty + 1)} disabled={qty >= product.stock}>+</button>
                    </div>
                  </div>
                  <div className="cart-item__side">
                    <strong>{formatPrice(product.price * qty)}</strong>
                    <button className="link-btn" onClick={() => removeFromCart(product.id)}>Видалити</button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="drawer__footer">
              {leftForFree > 0 ? (
                <p className="hint">До безкоштовної доставки ще {formatPrice(leftForFree)}</p>
              ) : (
                <p className="hint hint--ok">Доставка безкоштовна</p>
              )}
              <div className="drawer__total">
                <span>Разом</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <button className="btn btn--primary btn--block" onClick={onCheckout}>Оформити замовлення</button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
