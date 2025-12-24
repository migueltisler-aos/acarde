'use client';

import { useState, useEffect, useRef } from 'react';

type Hole = {
  id: number;
  active: boolean;
};

const HOLES_COUNT = 9;
const TARGET_SCORE = 20;

export default function WhackASnowman({ onComplete, onBack }: { onComplete: () => void; onBack: () => void }) {
  const [holes, setHoles] = useState<Hole[]>(
    Array.from({ length: HOLES_COUNT }, (_, i) => ({ id: i, active: false }))
  );
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const gameLoopRef = useRef<NodeJS.Timeout>();
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (score >= TARGET_SCORE && !won) {
      setWon(true);
      setGameStarted(false);
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [score, won]);

  useEffect(() => {
    if (timeLeft === 0 && !won && gameStarted) {
      setLost(true);
      setGameStarted(false);
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
  }, [timeLeft, won, gameStarted]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameStarted(true);
    setWon(false);
    setLost(false);

    gameLoopRef.current = setInterval(() => {
      setHoles(prev => {
        const newHoles = prev.map(h => ({ ...h, active: false }));
        const randomHole = Math.floor(Math.random() * HOLES_COUNT);
        newHoles[randomHole].active = true;
        return newHoles;
      });
    }, 800);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
  };

  const handleWhack = (id: number) => {
    if (!gameStarted || !holes[id].active) return;

    setScore(score + 1);
    setHoles(prev => prev.map(h => h.id === id ? { ...h, active: false } : h));
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
              <span className="font-bold text-gray-800">Punkte: {score}/{TARGET_SCORE}</span>
            </div>
            <div className="bg-white/90 rounded-xl px-6 py-3">
              <span className="font-bold text-gray-800">Zeit: {timeLeft}s</span>
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-800">
            ⛄ Schneemann-Klicker ⛄
          </h2>

          {!gameStarted && !won && !lost && (
            <div className="text-center">
              <p className="text-xl text-gray-700 mb-6">
                Klicke auf die Schneemänner so schnell du kannst!
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Ziel: {TARGET_SCORE} Schneemänner in 30 Sekunden treffen
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
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {holes.map((hole) => (
                <button
                  key={hole.id}
                  onClick={() => handleWhack(hole.id)}
                  className={`aspect-square rounded-2xl text-6xl md:text-7xl font-bold transition-all duration-200 ${
                    hole.active
                      ? 'bg-gradient-to-br from-blue-400 to-blue-600 transform scale-110 shadow-lg'
                      : 'bg-gradient-to-br from-gray-300 to-gray-400'
                  }`}
                >
                  {hole.active ? '⛄' : '🕳️'}
                </button>
              ))}
            </div>
          )}

          {won && (
            <div className="text-center">
              <p className="text-5xl md:text-6xl mb-6">🎉</p>
              <p className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Gewonnen!
              </p>
              <p className="text-xl text-gray-700 mb-6">
                Du hast {TARGET_SCORE} Schneemänner getroffen!
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
                Du hast {score} von {TARGET_SCORE} Schneemännern getroffen.
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
