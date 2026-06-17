import React, { type RefObject } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import type { Card as CardType } from "../../types/board";
import { createRestrictToAncestorContainerModifier } from "../../utils/dndModifiers";

type Props = {
  cards: CardType[];
  containerRef: RefObject<HTMLDivElement | null>;
  onReorder: (cards: CardType[]) => void;
  children: React.ReactNode;
};

export default function CardsDnd({
  cards,
  containerRef,
  onReorder,
  children,
}: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  const restrictToAncestorContainer =
    createRestrictToAncestorContainerModifier(containerRef);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = cards.findIndex((card) => card.id === active.id);
    const newIndex = cards.findIndex((card) => card.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const reorderedCards = arrayMove(cards, oldIndex, newIndex);
    onReorder(reorderedCards);
  };

  const items = cards.map((card) => card.id);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      autoScroll={false}
      modifiers={[restrictToAncestorContainer]}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
}
