'use client';

import { useState, useEffect, useRef } from 'react';

type Present = {
  id: number;
  x: number;
  y: number;
  emoji: string;
};

const PRESENT_EMOJIS = ['🎁', '🎀', '🎉'];
const TARGET_SCORE = 30;
const GAME_DURATION = 45;

export default function CatchPresents({ onComplete, onBack }: { onComplete: () => void; onBack: () => void }) {
  const [presents, setPresents] = useState<Present[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameStarted, setGameStarted] = useState(false);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const gameLoopRef = useRef<NodeJS.Timeout>();
  const timerRef = useRef<NodeJS.Timeout>();
  const spawnRef = useRef<NodeJS.Timeout>();
  const nextIdRef = useRef(0);

  useEffect(() => {
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
      if (spawnRef.current) clearInterval(spawnRef.current);
    };
  }, []);

  useEffect(() => {
    if (score >= TARGET_SCORE && !won) {
      setWon(true);
      setGameStarted(false);
      stopGame();
    }
  }, [score, won]);

  useEffect(() => {
    if (timeLeft === 0 && !won && gameStarted) {
      setLost(true);
      setGameStarted(false);
      stopGame();
    }
  }, [timeLeft, won, gameStarted]);

  const stopGame = () => {
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    if (spawnRef.current) clearInterval(spawnRef.current);
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setPresents([]);
    setGameStarted(true);
    setWon(false);
    setLost(false);
    nextIdRef.current = 0;

    spawnRef.current = setInterval(() => {
      const newPresent: Present = {
        id: nextIdRef.current++,
        x: Math.random() * 80 + 10,
        y: -10,
        emoji: PRESENT_EMOJIS[Math.floor(Math.random() * PRESENT_EMOJIS.length)],
      };
      setPresents(prev => [...prev, newPresent]);
    }, 1000);

    gameLoopRef.current = setInterval(() => {
      setPresents(prev => {
        const updated = prev
          .map(p => ({ ...p, y: p.y + 2 }))
          .filter(p => p.y < 100);
        return updated;
      });
    }, 50);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
  };

  const handleCatch = (id: number) => {
    if (!gameStarted) return;
    setPresents(prev => prev.filter(p => p.id !== id));
    setScore(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-700 via-green-800 to-red-900 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <button
            onClick={onBack}
            className="bg-white/90 hover:bg-white text-gray-800 font-bold py-3 px-6 rounded-xl"
          >
            ← Zurück
          </button>
          <div className="flex gap-4">
            <div className="bg-white/90 rounded-xl px-6 py-3">
              <span className="font-bold text-gray-800">Geschenke: {score}/{TARGET_SCORE}</span>
            </div>
            <div className="bg-white/90 rounded-xl px-6 py-3">
              <span className="font-bold text-gray-800">Zeit: {timeLeft}s</span>
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-800">
            🎁 Geschenke fangen 🎁
          </h2>

          {!gameStarted && !won && !lost && (
            <div className="text-center">
              <p className="text-xl text-gray-700 mb-6">
                Fange die fallenden Geschenke durch Anklicken!
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Ziel: {TARGET_SCORE} Geschenke in {GAME_DURATION} Sekunden fangen
              </p>
              <button
                onClick={startGame}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-2xl py-4 px-8 rounded-xl transform hover:scale-105 transition-all"
              >
                Spiel starten
              </button>
            </div>
          )}

          {gameStarted && (
            <div className="relative bg-gradient-to-b from-blue-200 to-blue-100 rounded-2xl overflow-hidden" style={{ height: '500px' }}>
              {presents.map((present) => (
                <button
                  key={present.id}
                  onClick={() => handleCatch(present.id)}
                  className="absolute text-5xl md:text-6xl transition-all hover:scale-110 cursor-pointer"
                  style={{
                    left: `${present.x}%`,
                    top: `${present.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {present.emoji}
                </button>
              ))}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-6xl">
                🎅
              </div>
            </div>
          )}

          {won && (
            <div className="text-center">
              <p className="text-5xl md:text-6xl mb-6">🎉</p>
              <p className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Gewonnen!
              </p>
              <p className="text-xl text-gray-700 mb-6">
                Du hast {TARGET_SCORE} Geschenke gefangen!
              </p>
              <button
                onClick={onComplete}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-2xl py-4 px-8 rounded-xl transform hover:scale-105 transition-all"
              >
                ✅ Weiter zum Hauptmenü
              </button>
            </div>
          )}

          {lost && (
            <div className="text-center">
              <p className="text-5xl md:text-6xl mb-6">⏰</p>
              <p className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Zeit abgelaufen!
              </p>
              <p className="text-xl text-gray-700 mb-6">
                Du hast {score} von {TARGET_SCORE} Geschenken gefangen.
              </p>
              <button
                onClick={startGame}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-2xl py-4 px-8 rounded-xl transform hover:scale-105 transition-all"
              >
                Nochmal versuchen
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
