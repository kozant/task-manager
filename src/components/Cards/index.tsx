import Card from "./Card";
import type { Card as CardType } from "../../types/board";

type CardListProps = {
  cards: CardType[];
  onEdit: (cardId: number, updatedCard: CardType) => void;
  onDelete: (cardId: number) => void;
};

export default function CardList({ cards, onEdit, onDelete }: CardListProps) {
  if (!cards) return null;

  return (
    <>
      {cards.map((card) => (
        <div key={card.id}>
          <Card card={card} onEdit={onEdit} onDelete={onDelete} />
        </div>
      ))}
    </>
  );
}
