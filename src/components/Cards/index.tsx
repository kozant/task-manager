import Card from "./Card";
import type { Card as CardType } from "../../types/board";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

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
  if (!cards) return null;

  const handleCardDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = cards.findIndex((card) => card.id === active.id);
    const newIndex = cards.findIndex((card) => card.id === over.id);

    const reorderedCards = arrayMove(cards, oldIndex, newIndex);
    onReorder(reorderedCards);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleCardDragEnd}
    >
      <SortableContext
        items={cards.map((card) => card.id)}
        strategy={verticalListSortingStrategy}
      >
        {cards.map((card) => (
          <Card key={card.id} card={card} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </SortableContext>
    </DndContext>
  );
}
