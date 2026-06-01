import Column from "./Column";
import type {
  Column as ColumnType,
  Board as BoardType,
} from "../../types/board";
import type { RefObject } from "react";

import { useBoardStore } from "../../store/useBoardStore";
import ColumnsDnd from "./ColumnsDnd";

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

  const handleReorder = (newColumns: ColumnType[]) => {
    updateBoard({ ...board, columns: newColumns });
  };

  return (
    <ColumnsDnd
      columns={columns}
      containerRef={containerRef}
      onReorder={handleReorder}
    >
      {columns.map((column) => (
        <Column
          key={column.id}
          column={column}
          onUpdateColumn={onUpdateColumn}
          onDeleteColumn={onDeleteColumn}
        />
      ))}
    </ColumnsDnd>
  );
}
