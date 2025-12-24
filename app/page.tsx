'use client';

import { useState } from 'react';
import MemoryGame from '@/components/MemoryGame';
import WhackASnowman from '@/components/WhackASnowman';
import CatchPresents from '@/components/CatchPresents';

type GameStatus = {
  memory: boolean;
  whack: boolean;
  catch: boolean;
};

export default function Home() {
  const [gameStatus, setGameStatus] = useState<GameStatus>({
    memory: false,
    whack: false,
    catch: false,
  });
  const [currentGame, setCurrentGame] = useState<'menu' | 'memory' | 'whack' | 'catch'>('menu');

  const handleGameComplete = (game: keyof GameStatus) => {
    setGameStatus(prev => ({ ...prev, [game]: true }));
    setCurrentGame('menu');
  };

  const completedCount = Object.values(gameStatus).filter(Boolean).length;
  const allCompleted = completedCount === 3;

  // Game components
  if (currentGame === 'memory') {
    return <MemoryGame onComplete={() => handleGameComplete('memory')} onBack={() => setCurrentGame('menu')} />;
  }
  if (currentGame === 'whack') {
    return <WhackASnowman onComplete={() => handleGameComplete('whack')} onBack={() => setCurrentGame('menu')} />;
  }
  if (currentGame === 'catch') {
    return <CatchPresents onComplete={() => handleGameComplete('catch')} onBack={() => setCurrentGame('menu')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-700 via-green-800 to-red-900 p-4 md:p-8 relative overflow-hidden">
      {/* Snowflakes Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="snowflake text-white text-2xl absolute animate-fall-1">❄</div>
        <div className="snowflake text-white text-3xl absolute animate-fall-2" style={{ left: '20%', animationDelay: '2s' }}>❄</div>
        <div className="snowflake text-white text-2xl absolute animate-fall-3" style={{ left: '40%', animationDelay: '4s' }}>❄</div>
        <div className="snowflake text-white text-3xl absolute animate-fall-1" style={{ left: '60%', animationDelay: '1s' }}>❄</div>
        <div className="snowflake text-white text-2xl absolute animate-fall-2" style={{ left: '80%', animationDelay: '3s' }}>❄</div>
        <div className="snowflake text-white text-3xl absolute animate-fall-3" style={{ left: '90%', animationDelay: '5s' }}>❄</div>
      </div>

      <main className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
            🎄 Finn & Max 🎄
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold text-yellow-300 mb-4 drop-shadow-md">
            Weihnachts-Spiele Challenge!
          </h2>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-2xl inline-block">
            <p className="text-lg md:text-2xl text-gray-800 font-medium">
              🎮 Gewinnt alle 3 Spiele für eine Überraschung! 🎮
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 md:mb-12 bg-white/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg md:text-xl font-bold text-gray-800">
              Fortschritt:
            </span>
            <span className="text-2xl md:text-3xl font-bold text-green-600">
              {completedCount} / 3
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6 md:h-8 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-3"
              style={{ width: `${(completedCount / 3) * 100}%` }}
            >
              {completedCount > 0 && (
                <span className="text-white font-bold text-sm">
                  {Math.round((completedCount / 3) * 100)}%
                </span>
              )}
            </div>
          </div>
        </div>

        {!allCompleted && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            {/* Memory Game Card */}
            <div className={`bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl transition-all duration-300 transform hover:scale-105 ${
              gameStatus.memory ? 'ring-4 ring-green-500' : ''
            }`}>
              <div className="text-center">
                <div className="text-6xl mb-4">🎄</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Memory</h3>
                <p className="text-gray-600 mb-4">Finde alle Paare!</p>
                {gameStatus.memory ? (
                  <div className="bg-green-500 text-white font-bold py-3 px-4 rounded-xl">
                    ✅ Geschafft!
                  </div>
                ) : (
                  <button
                    onClick={() => setCurrentGame('memory')}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-xl transition-colors"
                  >
                    Spielen
                  </button>
                )}
              </div>
            </div>

            {/* Whack-a-Snowman Card */}
            <div className={`bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl transition-all duration-300 transform hover:scale-105 ${
              gameStatus.whack ? 'ring-4 ring-green-500' : ''
            }`}>
              <div className="text-center">
                <div className="text-6xl mb-4">⛄</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Schneemann-Klicker</h3>
                <p className="text-gray-600 mb-4">Triff 20 Schneemänner!</p>
                {gameStatus.whack ? (
                  <div className="bg-green-500 text-white font-bold py-3 px-4 rounded-xl">
                    ✅ Geschafft!
                  </div>
                ) : (
                  <button
                    onClick={() => setCurrentGame('whack')}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-xl transition-colors"
                  >
                    Spielen
                  </button>
                )}
              </div>
            </div>

            {/* Catch Presents Card */}
            <div className={`bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl transition-all duration-300 transform hover:scale-105 ${
              gameStatus.catch ? 'ring-4 ring-green-500' : ''
            }`}>
              <div className="text-center">
                <div className="text-6xl mb-4">🎁</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Geschenke fangen</h3>
                <p className="text-gray-600 mb-4">Fange 30 Geschenke!</p>
                {gameStatus.catch ? (
                  <div className="bg-green-500 text-white font-bold py-3 px-4 rounded-xl">
                    ✅ Geschafft!
                  </div>
                ) : (
                  <button
                    onClick={() => setCurrentGame('catch')}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-xl transition-colors"
                  >
                    Spielen
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Success Message & Voucher Reveal */}
        {allCompleted && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 rounded-2xl p-6 md:p-8 shadow-2xl text-center animate-bounce">
              <p className="text-3xl md:text-5xl font-bold text-gray-800 mb-2">
                🎉 FANTASTISCH! 🎉
              </p>
              <p className="text-xl md:text-3xl text-gray-700">
                Ihr habt alle Spiele gewonnen!
              </p>
            </div>

            {/* Voucher Card */}
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-2xl border-8 border-yellow-400 relative overflow-hidden">
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 text-6xl">🎁</div>
              <div className="absolute top-0 right-0 text-6xl">🎁</div>
              <div className="absolute bottom-0 left-0 text-6xl">🎄</div>
              <div className="absolute bottom-0 right-0 text-6xl">🎄</div>

              <div className="relative z-10 text-center">
                <p className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
                  🎅 Euer Weihnachtsgeschenk! 🎅
                </p>
                <div className="bg-gradient-to-r from-red-600 to-green-600 text-white rounded-2xl p-6 md:p-8 mb-6">
                  <p className="text-3xl md:text-5xl font-bold mb-4">
                    GUTSCHEIN
                  </p>
                  <p className="text-xl md:text-3xl font-semibold mb-2">
                    für einen Tag bei
                  </p>
                  <p className="text-2xl md:text-4xl font-bold">
                    🎮 GAMESTATE 🎮
                  </p>
                  <p className="text-lg md:text-2xl mt-2">
                    Potsdamer Platz Berlin
                  </p>
                </div>

                <p className="text-xl md:text-2xl text-gray-700 mb-6 font-medium">
                  Spielt alle Arcade-Spiele die ihr wollt!
                </p>

                <a
                  href="https://www.gamestate.com/de/potsdamer-platz-berlin/get-your-playcard-for-gamestate-postdamer-platz-berlin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-xl md:text-3xl py-4 md:py-6 px-8 md:px-12 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  🎮 Jetzt Termin buchen! 🎮
                </a>

                <p className="text-lg md:text-2xl text-gray-600 mt-6 font-bold">
                  Frohe Weihnachten, Finn & Max! 🎅🎄
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
