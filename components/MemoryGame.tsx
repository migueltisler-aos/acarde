'use client';

import { useState, useEffect } from 'react';

type Card = {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const EMOJIS = ['🎄', '🎅', '⛄', '🎁', '⭐', '🔔'];

export default function MemoryGame({ onComplete, onBack }: { onComplete: () => void; onBack: () => void }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const gameEmojis = [...EMOJIS, ...EMOJIS];
    const shuffled = gameEmojis
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setWon(false);
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;

      if (cards[first].emoji === cards[second].emoji) {
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[first].isMatched = true;
          matchedCards[second].isMatched = true;
          setCards(matchedCards);
          setFlippedCards([]);

          if (matchedCards.every(card => card.isMatched)) {
            setWon(true);
          }
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[first].isFlipped = false;
          resetCards[second].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-700 via-green-800 to-red-900 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="bg-white/90 hover:bg-white text-gray-800 font-bold py-3 px-6 rounded-xl"
          >
            ← Zurück
          </button>
          <div className="bg-white/90 rounded-xl px-6 py-3">
            <span className="font-bold text-gray-800">Züge: {moves}</span>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-800">
            🎄 Weihnachts-Memory 🎄
          </h2>

          {!won ? (
            <>
              <p className="text-center text-xl text-gray-700 mb-6">
                Finde alle Paare!
              </p>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                {cards.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className={`aspect-square rounded-2xl text-5xl md:text-6xl font-bold transition-all duration-300 transform hover:scale-105 ${
                      card.isFlipped || card.isMatched
                        ? 'bg-white border-4 border-green-500'
                        : 'bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800'
                    }`}
                    disabled={card.isMatched}
                  >
                    {card.isFlipped || card.isMatched ? card.emoji : '?'}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="text-5xl md:text-6xl mb-6">🎉</p>
              <p className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Gewonnen!
              </p>
              <p className="text-xl text-gray-700 mb-6">
                Du hast alle Paare in {moves} Zügen gefunden!
              </p>
              <button
                onClick={onComplete}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-2xl py-4 px-8 rounded-xl transform hover:scale-105 transition-all"
              >
                ✅ Weiter zum Hauptmenü
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
