import { useEffect, useState } from 'react';
import { HERO_SLIDES } from '../data/products';
import { ArrowIcon } from './Icons';

const AUTOPLAY_MS = 6000;

export default function HeroSlider({ onCategory }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = (step) => setIndex((i) => (i + step + HERO_SLIDES.length) % HERO_SLIDES.length);

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [index, paused]);

  const slide = HERO_SLIDES[index];

  return (
    <section
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {HERO_SLIDES.map((s, i) => (
        <img key={s.img} src={s.img} alt="" className={`hero__img ${i === index ? 'is-active' : ''}`} />
      ))}

      <div className="hero__content" key={index}>
        <p className="hero__tag">{slide.tag}</p>
        <h1 className="hero__title">{slide.title}</h1>
        <p className="hero__text">{slide.text}</p>
        <button className="btn btn--primary" onClick={() => onCategory(slide.category)}>
          До каталогу →
        </button>
      </div>

      <div className="hero__controls">
        <div className="hero__dots">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              className={i === index ? 'is-active' : ''}
              onClick={() => setIndex(i)}
              aria-label={`Слайд ${i + 1}`}
            />
          ))}
        </div>
        <button className="round-btn" onClick={() => go(-1)} aria-label="Назад"><ArrowIcon left width={18} /></button>
        <button className="round-btn" onClick={() => go(1)} aria-label="Далі"><ArrowIcon width={18} /></button>
      </div>
    </section>
  );
}
