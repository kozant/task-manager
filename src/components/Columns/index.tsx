import Column from "./Column";
import type {
  Column as ColumnType,
  Board as BoardType,
} from "../../types/board";
import type { RefObject } from "react";

import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useBoardStore } from "../../store/useBoardStore";
import { createRestrictToAncestorContainerModifier } from "../../utils/dndModifiers";

type ColumnListProps = {
  board: BoardType;
  columns: ColumnType[];
  containerRef: RefObject<HTMLDivElement | null>;
  onUpdateColumn: (column: ColumnType) => void;
  onDeleteColumn: (columnId: number) => void;
};

export default function ColumnList({
  board,
  columns,
  containerRef,
  onUpdateColumn,
  onDeleteColumn,
}: ColumnListProps) {
  if (!columns.length) return null;

  const updateBoard = useBoardStore((state) => state.updateBoard);
  const restrictToAncestorContainer =
    createRestrictToAncestorContainerModifier(containerRef);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = columns.findIndex((column) => column.id === active.id);
    const newIndex = columns.findIndex((column) => column.id === over.id);

    const newColumns = arrayMove(columns, oldIndex, newIndex);
    updateBoard({ ...board, columns: newColumns });
  };

  const allItems = columns.map((column) => column.id);

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      autoScroll={false}
      modifiers={[restrictToAncestorContainer]}
    >
      <SortableContext items={allItems} strategy={rectSortingStrategy}>
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            onUpdateColumn={onUpdateColumn}
            onDeleteColumn={onDeleteColumn}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}
