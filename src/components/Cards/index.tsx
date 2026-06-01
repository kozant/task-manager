import { useRef } from "react";
import Card from "./Card";
import type { Card as CardType } from "../../types/board";
import CardsDnd from "./CardsDnd";

type CardListProps = {
  cards: CardType[];
  onEdit: (cardId: number, updatedCard: CardType) => void;
  onDelete: (cardId: number) => void;
  onReorder: (cards: CardType[]) => void;
};

export default function CardList({
  cards,
  onEdit,
  onDelete,
  onReorder,
}: CardListProps) {
  const listRef = useRef<HTMLDivElement | null>(null);

  if (!cards) return null;

  return (
    <CardsDnd cards={cards} containerRef={listRef} onReorder={onReorder}>
      <div className="flex flex-col gap-2" ref={listRef}>
        {cards.map((card) => (
          <Card key={card.id} card={card} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </CardsDnd>
  );
}
