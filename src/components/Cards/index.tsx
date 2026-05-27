import Card from "./Card";
import type { Card as CardType } from "../../types/board";

export default function CardList({
  cards,
  onEdit,
  onDelete,
}: {
  cards: CardType[];
  onEdit: (cardId: number, updatedCard: CardType) => void;
  onDelete: (cardId: number) => void;
}) {
  if (!cards) return null;

  return (
    <>
      {cards.map((card) => (
        <div key={String(card.id)}>
          <Card card={card} onEdit={onEdit} onDelete={onDelete} />
        </div>
      ))}
    </>
  );
}
