import { useRef } from 'react';
import catSvg from '../assets/images/cat.svg';
import '../styles/animations.css';

export default function DancingCat({ currentMode, notes, stars, onCatClick }) {
  const wrapperRef = useRef(null);

  function handleClick(e) {
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    onCatClick(x, y, rect.left + rect.width / 2, rect.top + rect.height / 2);
  }

  return (
    <div
      ref={wrapperRef}
      className={`cat-wrapper${currentMode ? ` ${currentMode}` : ''}`}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
      role="button"
      aria-label="고양이 클릭하여 파티클 생성"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && handleClick({ clientX: 0, clientY: 0 })}
    >
      <img src={catSvg} alt="춤추는 고양이" width={200} height={220} draggable={false} />

      {notes.map(n => (
        <span
          key={n.id}
          className="music-note"
          style={{ left: n.x, top: n.y }}
        >
          {n.char}
        </span>
      ))}

      {stars.map(s => (
        <span
          key={s.id}
          className="star-particle"
          style={{ left: s.x, top: s.y, '--tx': s.tx, '--ty': s.ty }}
        >
          {s.char}
        </span>
      ))}
    </div>
  );
}
