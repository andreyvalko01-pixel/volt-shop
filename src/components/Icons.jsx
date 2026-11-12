// Невеликий набір іконок, щоб не тягнути цілу бібліотеку
const base = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const SearchIcon = (p) => (<svg {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>);
export const UserIcon = (p) => (<svg {...base} {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>);
export const HeartIcon = ({ filled, ...p }) => (<svg {...base} {...p} fill={filled ? 'currentColor' : 'none'}><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg>);
export const CartIcon = (p) => (<svg {...base} {...p}><path d="M3 4h2l2.4 11h11L21 7H6.2" /><circle cx="9" cy="19.5" r="1.3" /><circle cx="17" cy="19.5" r="1.3" /></svg>);
export const ArrowIcon = ({ left, ...p }) => (<svg {...base} {...p}><path d={left ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} /></svg>);
export const CloseIcon = (p) => (<svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>);
export const MenuIcon = (p) => (<svg {...base} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>);
