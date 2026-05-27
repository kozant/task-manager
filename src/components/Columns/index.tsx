import Column from "./Column";
import type { Column as ColumnType } from "../../types/board";

export default function ColumnList({
  columns,
  onUpdateColumn,
  onDeleteColumn,
}: {
  columns: ColumnType[];
  onUpdateColumn: (column: ColumnType) => void;
  onDeleteColumn: (columnId: number) => void;
}) {
  if (!columns.length) return null;

  return (
    <>
      {columns.map((column) => (
        <div key={String(column.id)}>
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
