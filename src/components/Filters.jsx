import { useState } from 'react';
import { BRANDS, CATEGORIES } from '../data/products';

function Group({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="filter-group">
      <button className="filter-group__head" onClick={() => setOpen(!open)}>
        {title}
        <span className={`chevron ${open ? 'is-open' : ''}`}>⌃</span>
      </button>
      {open && <div className="filter-group__body">{children}</div>}
    </div>
  );
}

export default function Filters({ filters, setFilters, priceLimits }) {
  const toggleInList = (key, value) => {
    setFilters((f) => ({
      ...f,
      [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value],
    }));
  };

  const setPrice = (which, raw) => {
    const value = Number(String(raw).replace(/\D/g, '')) || 0;
    setFilters((f) => ({ ...f, [which]: value }));
  };

  const hasActive =
    filters.categories.length || filters.brands.length || filters.onlyInStock ||
    filters.minPrice > priceLimits.min || filters.maxPrice < priceLimits.max;

  return (
    <aside className="filters">
      <Group title="Категорія">
        {CATEGORIES.map((c) => (
          <label key={c.id} className="check">
            <input
              type="checkbox"
              checked={filters.categories.includes(c.id)}
              onChange={() => toggleInList('categories', c.id)}
            />
            {c.name}
          </label>
        ))}
      </Group>

      <Group title="Ціна, ₴">
        <input
          type="range"
          min={priceLimits.min}
          max={priceLimits.max}
          step={500}
          value={filters.maxPrice}
          onChange={(e) => setPrice('maxPrice', e.target.value)}
          className="range"
        />
        <div className="price-inputs">
          <label>від <input value={filters.minPrice} onChange={(e) => setPrice('minPrice', e.target.value)} /></label>
          <label>до <input value={filters.maxPrice} onChange={(e) => setPrice('maxPrice', e.target.value)} /></label>
        </div>
      </Group>

      <Group title="Бренд" defaultOpen={false}>
        {BRANDS.map((b) => (
          <label key={b} className="check">
            <input type="checkbox" checked={filters.brands.includes(b)} onChange={() => toggleInList('brands', b)} />
            {b}
          </label>
        ))}
      </Group>

      <label className="check check--switch">
        <input
          type="checkbox"
          checked={filters.onlyInStock}
          onChange={(e) => setFilters((f) => ({ ...f, onlyInStock: e.target.checked }))}
        />
        Тільки в наявності
      </label>

      {hasActive ? (
        <button
          className="link-btn reset"
          onClick={() => setFilters({ categories: [], brands: [], onlyInStock: false, minPrice: priceLimits.min, maxPrice: priceLimits.max })}
        >
          Скинути фільтри
        </button>
      ) : null}
    </aside>
  );
}
