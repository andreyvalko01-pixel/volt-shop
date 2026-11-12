const photo = (id, w = 600) => `https://images.unsplash.com/${id}?w=${w}&q=75&auto=format&fit=crop`;

export const CATEGORIES = [
  { id: 'phones', name: 'Смартфони', note: 'Нові можливості', img: photo('photo-1592890288564-76628a30a657', 200) },
  { id: 'audio', name: 'Навушники', note: 'Поринь у звук', img: photo('photo-1618366712010-f4ae9c647dcb', 200) },
  { id: 'watches', name: 'Смарт-годинники', note: 'Більше, ніж час', img: photo('photo-1546868871-7041f2a55e12', 200) },
  { id: 'laptops', name: 'Ноутбуки', note: 'Для роботи та життя', img: photo('photo-1496181133206-80ce9b88a853', 200) },
  { id: 'accessories', name: 'Аксесуари', note: 'Дрібниці, що важливі', img: photo('photo-1527864550417-7fd91fc51a46', 200) },
];

// stock = 0 означає "немає в наявності" — кнопка покупки блокується
export const PRODUCTS = [
  { id: 1, cat: 'phones', brand: 'Samsung', name: 'Samsung Galaxy S24 128 GB', variant: 'Onyx Black', price: 32999, oldPrice: 36999, stock: 12, rating: 4.8, popularity: 98, img: photo('photo-1592890288564-76628a30a657') },
  { id: 2, cat: 'audio', brand: 'Sony', name: 'Sony WH-1000XM5', variant: 'Black', price: 13999, stock: 7, rating: 4.9, popularity: 95, img: photo('photo-1618366712010-f4ae9c647dcb') },
  { id: 3, cat: 'watches', brand: 'Apple', name: 'Apple Watch SE 40 мм', variant: 'Midnight', price: 12599, stock: 5, rating: 4.7, popularity: 90, img: photo('photo-1546868871-7041f2a55e12') },
  { id: 4, cat: 'laptops', brand: 'Apple', name: 'MacBook Air 13,6" M3', variant: '16 ГБ / 256 ГБ', price: 49999, stock: 0, rating: 4.9, popularity: 88, img: photo('photo-1541807084-5c52b6b3adef') },
  { id: 5, cat: 'audio', brand: 'Apple', name: 'AirPods Pro 2', variant: 'USB-C', price: 9999, oldPrice: 10999, stock: 20, rating: 4.8, popularity: 93, img: photo('photo-1606841837239-c5a1a4a07af7') },
  { id: 6, cat: 'phones', brand: 'Google', name: 'Google Pixel 8 128 GB', variant: 'Obsidian', price: 27499, stock: 4, rating: 4.6, popularity: 70, img: photo('photo-1598327105666-5b89351aff97') },
  { id: 7, cat: 'accessories', brand: 'Logitech', name: 'Logitech MX Master 3S', variant: 'Graphite', price: 4299, stock: 15, rating: 4.8, popularity: 76, img: photo('photo-1527864550417-7fd91fc51a46') },
  { id: 8, cat: 'accessories', brand: 'JBL', name: 'JBL Flip 6', variant: 'Black', price: 4999, oldPrice: 5799, stock: 9, rating: 4.7, popularity: 81, img: photo('photo-1608043152269-423dbba4e7e1') },
  { id: 9, cat: 'laptops', brand: 'Apple', name: 'MacBook Pro 14" M3 Pro', variant: '18 ГБ / 512 ГБ', price: 89999, stock: 2, rating: 4.9, popularity: 66, img: photo('photo-1525547719571-a2d4ac8945e2') },
  { id: 10, cat: 'watches', brand: 'Samsung', name: 'Samsung Galaxy Watch6 44 мм', variant: 'Graphite', price: 9499, stock: 6, rating: 4.5, popularity: 64, img: photo('photo-1579586337278-3befd40fd17a') },
  { id: 11, cat: 'accessories', brand: 'Keychron', name: 'Keychron K2 Pro', variant: 'Brown switch', price: 4899, stock: 3, rating: 4.6, popularity: 58, img: photo('photo-1618384887929-16ec33fab9ef') },
  { id: 12, cat: 'phones', brand: 'Apple', name: 'iPad 10.9" Wi-Fi 64 GB', variant: 'Silver', price: 16999, stock: 8, rating: 4.7, popularity: 72, img: photo('photo-1561154464-82e9adf32764') },
  { id: 13, cat: 'audio', brand: 'Marshall', name: 'Marshall Emberton II', variant: 'Black & Brass', price: 6999, stock: 0, rating: 4.6, popularity: 55, img: photo('photo-1772442363740-5e746c05b43d') },
  { id: 14, cat: 'accessories', brand: 'Anker', name: 'Anker PowerCore 20000', variant: '22.5 Вт', price: 1799, stock: 25, rating: 4.5, popularity: 60, img: photo('photo-1760708825913-65a50b3dc39b') },
];

export const BRANDS = [...new Set(PRODUCTS.map((p) => p.brand))].sort();

export const HERO_SLIDES = [
  {
    tag: 'Бездротові навушники',
    title: 'Бездротовий звук\nіз шумозаглушенням',
    text: 'Чистий звук. Повна свобода. Щодня з тобою.',
    category: 'audio',
    img: photo('photo-1505740420928-5e560c06d30e', 1400),
  },
  {
    tag: 'Ноутбуки',
    title: 'Тонкий. Тихий.\nНа весь день',
    text: 'До 18 годин роботи без зарядки.',
    category: 'laptops',
    img: photo('photo-1496181133206-80ce9b88a853', 1400),
  },
  {
    tag: 'Смарт-годинники',
    title: 'Здоров\'я та сповіщення\nна зап\'ясті',
    text: 'Пульс, сон, тренування — усе в одному місці.',
    category: 'watches',
    img: photo('photo-1508685096489-7aacd43bd3b1', 1400),
  },
];
