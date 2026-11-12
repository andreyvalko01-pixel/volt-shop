import { CATEGORIES } from '../data/products';
import { useShop } from '../context/ShopContext';
import { CartIcon, HeartIcon, MenuIcon, SearchIcon, UserIcon } from './Icons';

export default function Header({ search, onSearch, onCategory, onOpenCart, onShowFavorites }) {
  const { count, favorites } = useShop();

  return (
    <header className="header">
      <div className="container header__row">
        <a href="/" className="logo">VOLT</a>

        <nav className="header__nav">
          <button className="link-btn" onClick={() => onCategory(null)}>Каталог</button>
          {CATEGORIES.map((c) => (
            <button key={c.id} className="link-btn" onClick={() => onCategory(c.id)}>{c.name}</button>
          ))}
        </nav>

        <label className="search">
          <SearchIcon width={18} height={18} />
          <input
            type="search"
            placeholder="Пошук товарів..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </label>

        <div className="header__icons">
          <button className="icon-btn hide-mobile" aria-label="Профіль"><UserIcon /></button>
          <button className="icon-btn" aria-label="Обране" onClick={onShowFavorites}>
            <HeartIcon />
            {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
          </button>
          <button className="icon-btn" aria-label="Кошик" onClick={onOpenCart}>
            <CartIcon />
            {count > 0 && <span className="badge">{count}</span>}
          </button>
          <button className="icon-btn show-mobile" aria-label="Меню"><MenuIcon /></button>
        </div>
      </div>
    </header>
  );
}
