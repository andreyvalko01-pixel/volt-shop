import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../utils/format';
import { CloseIcon } from './Icons';

const DELIVERY = {
  np_branch: { label: 'Нова пошта — відділення', price: 80 },
  np_courier: { label: "Нова пошта — кур'єр", price: 120 },
  pickup: { label: 'Самовивіз з магазину', price: 0 },
};

const initialForm = { name: '', phone: '', city: '', delivery: 'np_branch', address: '', payment: 'card', comment: '' };

function validate(form) {
  const errors = {};
  if (form.name.trim().split(' ').filter(Boolean).length < 2) errors.name = "Вкажіть ім'я та прізвище";
  if (!/^(\+?38)?0\d{9}$/.test(form.phone.replace(/[\s()-]/g, ''))) errors.phone = 'Формат: 0XX XXX XX XX';
  if (form.delivery !== 'pickup') {
    if (!form.city.trim()) errors.city = 'Вкажіть місто';
    if (!form.address.trim()) errors.address = form.delivery === 'np_branch' ? 'Вкажіть номер відділення' : 'Вкажіть адресу';
  }
  return errors;
}

export default function Checkout({ onClose }) {
  const { items, total, clearCart } = useShop();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [orderId, setOrderId] = useState(null);

  const deliveryPrice = total >= 3000 ? 0 : DELIVERY[form.delivery].price;

  const update = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const submit = (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    // Бекенду в цьому проєкті немає — замовлення зберігаємо в історії браузера.
    const order = {
      id: Date.now().toString().slice(-6),
      createdAt: new Date().toISOString(),
      customer: form,
      items: items.map(({ product, qty }) => ({ id: product.id, name: product.name, price: product.price, qty })),
      total: total + deliveryPrice,
    };
    const history = JSON.parse(localStorage.getItem('volt_orders') || '[]');
    localStorage.setItem('volt_orders', JSON.stringify([order, ...history]));

    clearCart();
    setOrderId(order.id);
  };

  const field = (name, label, props = {}) => (
    <label className={`field ${errors[name] ? 'has-error' : ''}`}>
      <span>{label}</span>
      <input name={name} value={form[name]} onChange={update} {...props} />
      {errors[name] && <small>{errors[name]}</small>}
    </label>
  );

  return (
    <div className="modal-wrap" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="icon-btn modal__close" onClick={onClose} aria-label="Закрити"><CloseIcon /></button>

        {orderId ? (
          <div className="success">
            <div className="success__icon">✓</div>
            <h2>Замовлення №{orderId} прийнято</h2>
            <p>Менеджер зателефонує вам протягом 15 хвилин, щоб підтвердити деталі.</p>
            <button className="btn btn--primary" onClick={onClose}>Продовжити покупки</button>
          </div>
        ) : (
          <form className="checkout" onSubmit={submit} noValidate>
            <div>
              <h2>Оформлення замовлення</h2>
              {field('name', "Ім'я та прізвище", { autoComplete: 'name' })}
              {field('phone', 'Телефон', { type: 'tel', placeholder: '067 123 45 67', autoComplete: 'tel' })}

              <fieldset className="radio-list">
                <legend>Доставка</legend>
                {Object.entries(DELIVERY).map(([key, d]) => (
                  <label key={key}>
                    <input type="radio" name="delivery" value={key} checked={form.delivery === key} onChange={update} />
                    {d.label}
                    <span>{d.price ? formatPrice(d.price) : 'безкоштовно'}</span>
                  </label>
                ))}
              </fieldset>

              {form.delivery !== 'pickup' && (
                <div className="row-2">
                  {field('city', 'Місто')}
                  {field('address', form.delivery === 'np_branch' ? 'Відділення №' : 'Адреса')}
                </div>
              )}

              <fieldset className="radio-list">
                <legend>Оплата</legend>
                <label><input type="radio" name="payment" value="card" checked={form.payment === 'card'} onChange={update} /> Карткою онлайн</label>
                <label><input type="radio" name="payment" value="cod" checked={form.payment === 'cod'} onChange={update} /> Накладений платіж</label>
              </fieldset>
            </div>

            <div className="summary">
              <h3>Ваше замовлення</h3>
              <ul>
                {items.map(({ product, qty }) => (
                  <li key={product.id}>
                    <span>{product.name} × {qty}</span>
                    <span>{formatPrice(product.price * qty)}</span>
                  </li>
                ))}
              </ul>
              <div className="summary__row"><span>Доставка</span><span>{deliveryPrice ? formatPrice(deliveryPrice) : 'безкоштовно'}</span></div>
              <div className="summary__row summary__total"><span>До сплати</span><strong>{formatPrice(total + deliveryPrice)}</strong></div>
              <button className="btn btn--primary btn--block" type="submit" disabled={!items.length}>Підтвердити замовлення</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
