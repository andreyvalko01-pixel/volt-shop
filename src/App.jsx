import { useMemo, useRef, useState } from 'react';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import Filters from './components/Filters';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import { ArrowIcon } from './components/Icons';
import { CATEGORIES, PRODUCTS } from './data/products';
import { useShop } from './context/ShopContext';

const PAGE_SIZE = 8;

const prices = PRODUCTS.map((p) => p.price);
const PRICE_LIMITS = {
  min: Math.floor(Math.min(...prices) / 500) * 500,
  max: Math.ceil(Math.max(...prices) / 500) * 500,
};

const SORTS = {
  popular: { label: 'За популярністю', fn: (a, b) => b.popularity - a.popularity },
  cheap: { label: 'Від дешевих', fn: (a, b) => a.price - b.price },
  expensive: { label: 'Від дорогих', fn: (a, b) => b.price - a.price },
  rating: { label: 'За рейтингом', fn: (a, b) => b.rating - a.rating },
};

export default function App() {
  const { favorites } = useShop();
  const catalogRef = useRef(null);

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('popular');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    onlyInStock: false,
    minPrice: PRICE_LIMITS.min,
    maxPrice: PRICE_LIMITS.max,
  });

  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return PRODUCTS.filter((p) => {
      if (onlyFavorites && !favorites.includes(p.id)) return false;
      if (query && !`${p.name} ${p.brand}`.toLowerCase().includes(query)) return false;
      if (filters.categories.length && !filters.categories.includes(p.cat)) return false;
      if (filters.brands.length && !filters.brands.includes(p.brand)) return false;
      if (filters.onlyInStock && p.stock === 0) return false;
      return p.price >= filters.minPrice && p.price <= filters.maxPrice;
    })
      .sort(SORTS[sort].fn)
      // товари, яких немає, завжди в кінці списку
      .sort((a, b) => (b.stock > 0) - (a.stock > 0));
  }, [search, sort, filters, onlyFavorites, favorites]);

  const scrollToCatalog = () => catalogRef.current?.scrollIntoView({ behavior: 'smooth' });

  const showCategory = (catId) => {
    setOnlyFavorites(false);
    setFilters((f) => ({ ...f, categories: catId ? [catId] : [] }));
    setVisible(PAGE_SIZE);
    scrollToCatalog();
  };

  const handleSearch = (value) => {
    setSearch(value);
    setVisible(PAGE_SIZE);
  };

  const showAdded = (product) => {
    setToast(product.name);
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => setToast(null), 2500);
  };

  const shown = filtered.slice(0, visible);

  return (
    <>
      <Header
        search={search}
        onSearch={handleSearch}
        onCategory={showCategory}
        onOpenCart={() => setCartOpen(true)}
        onShowFavorites={() => { setOnlyFavorites(true); scrollToCatalog(); }}
      />

      <main className="container">
        <HeroSlider onCategory={showCategory} />

        <section className="categories">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              className={`category ${filters.categories.length === 1 && filters.categories[0] === c.id ? 'is-active' : ''}`}
              onClick={() => showCategory(c.id)}
            >
              <img src={c.img} alt="" />
              <span>
                <strong>{c.name}</strong>
                <small>{c.note}</small>
              </span>
              <ArrowIcon width={16} />
            </button>
          ))}
        </section>

        <section className="catalog" ref={catalogRef}>
          <div className="catalog__head">
            <h2>{onlyFavorites ? 'Обране' : 'Популярні товари'}</h2>
            {onlyFavorites && <button className="link-btn" onClick={() => setOnlyFavorites(false)}>← Усі товари</button>}
            <span className="catalog__count">Показано {shown.length} з {filtered.length}</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {Object.entries(SORTS).map(([key, s]) => <option key={key} value={key}>{s.label}</option>)}
            </select>
          </div>

          <div className="catalog__body">
            <Filters filters={filters} setFilters={setFilters} priceLimits={PRICE_LIMITS} />

            <div>
              {filtered.length === 0 ? (
                <p className="empty">Нічого не знайдено. Спробуйте змінити фільтри.</p>
              ) : (
                <div className="grid">
                  {shown.map((p) => <ProductCard key={p.id} product={p} onAdded={showAdded} />)}
                </div>
              )}

              {visible < filtered.length && (
                <button className="btn btn--outline more" onClick={() => setVisible(visible + PAGE_SIZE)}>
                  Показати ще
                </button>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">© {new Date().getFullYear()} VOLT — магазин електроніки · 0 800 300 100 · щодня 9:00–21:00</div>
      </footer>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
      />
      {checkoutOpen && <Checkout onClose={() => setCheckoutOpen(false)} />}

      {toast && (
        <div className="toast" onClick={() => setCartOpen(true)}>
          «{toast}» додано в кошик · <u>відкрити</u>
        </div>
      )}
    </>
  );
}
