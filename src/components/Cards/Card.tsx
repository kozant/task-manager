import type { Card as CardType } from "../../types/board";

export default function Card({ card }: { card: CardType }) {
  return (
    <div className="p-4 rounded-md bg-white shadow-md">
      <h3 className="text-lg font-bold mb-2">{card.title}</h3>
      <p className="text-gray-600">{card.description}</p>
    </div>
  );
}
