import './styles/global.css';
import './App.css';
import DancingCat from './components/DancingCat';
import AnimationControls from './components/AnimationControls';
import { useAnimation } from './hooks/useAnimation';

export default function App() {
  const { isPlaying, currentMode, modeName, toggle, nextMode, notes, stars, spawnNote, spawnStars } =
    useAnimation();

  function handleCatClick(x, y, cx, cy) {
    spawnNote(x - 16, y - 30);
    spawnStars(cx, cy);
  }

  return (
    <div className="app">
      <h1 className="title">🐱 고양이 댄스 파티 🎉</h1>
      <p className="subtitle">고양이를 클릭하면 파티클이 터져요!</p>

      <div className="stage">
        <DancingCat
          currentMode={currentMode}
          notes={notes}
          stars={stars}
          onCatClick={handleCatClick}
        />
      </div>

      <AnimationControls
        isPlaying={isPlaying}
        modeName={modeName}
        onToggle={toggle}
        onNextMode={nextMode}
      />

      <p className="hint">
        {isPlaying
          ? `현재 모드: ${modeName.toUpperCase()} | 고양이를 클릭해보세요!`
          : '▶ 시작 버튼을 눌러 댄스를 시작하세요'}
      </p>
    </div>
  );
}
