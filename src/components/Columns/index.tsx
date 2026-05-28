import Column from "./Column";
import type { Column as ColumnType } from "../../types/board";

type ColumnListProps = {
  columns: ColumnType[];
  onUpdateColumn: (column: ColumnType) => void;
  onDeleteColumn: (columnId: number) => void;
};

export default function ColumnList({
  columns,
  onUpdateColumn,
  onDeleteColumn,
}: ColumnListProps) {
  if (!columns.length) return null;

  return (
    <>
      {columns.map((column) => (
        <div key={column.id}>
          <Column
            column={column}
            onUpdateColumn={onUpdateColumn}
            onDeleteColumn={onDeleteColumn}
          />
        </div>
      ))}
    </>
  );
}
