import React, { type RefObject } from "react";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import type { Column as ColumnType } from "../../types/board";
import { createRestrictToAncestorContainerModifier } from "../../utils/dndModifiers";

type Props = {
  columns: ColumnType[];
  containerRef: RefObject<HTMLDivElement | null>;
  onReorder: (columns: ColumnType[]) => void;
  children: React.ReactNode;
};

export default function ColumnsDnd({
  columns,
  containerRef,
  onReorder,
  children,
}: Props) {
  const restrictToAncestorContainer =
    createRestrictToAncestorContainerModifier(containerRef);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = columns.findIndex((column) => column.id === active.id);
    const newIndex = columns.findIndex((column) => column.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const newColumns = arrayMove(columns, oldIndex, newIndex);
    onReorder(newColumns);
  };

  const items = columns.map((c) => c.id);

  return (
    <DndContext
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
