const MODE_LABELS = {
  dance: '🕺 댄스',
  wiggle: '🌊 위글',
  bounce: '⬆️ 바운스',
  spin: '🌀 스핀',
};

export default function AnimationControls({ isPlaying, modeName, onToggle, onNextMode }) {
  return (
    <div className="controls">
      <button
        className={`btn btn-toggle ${isPlaying ? 'playing' : 'paused'}`}
        onClick={onToggle}
        aria-label={isPlaying ? '애니메이션 정지' : '애니메이션 시작'}
      >
        {isPlaying ? '⏸ 정지' : '▶ 시작'}
      </button>

      <button
        className="btn btn-mode"
        onClick={onNextMode}
        aria-label="다음 춤 모드"
        disabled={!isPlaying}
      >
        {MODE_LABELS[modeName]} →
      </button>
    </div>
  );
}
