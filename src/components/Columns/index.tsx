import Column from "./Column";
import type { Column as ColumnType } from "../../types/board";

export default function ColumnList({
  columns,
  onUpdateColumn,
}: {
  columns: ColumnType[];
  onUpdateColumn: (column: ColumnType) => void;
}) {
  if (!columns.length) return null;

  return columns.map((column) => (
    <Column key={column.id} column={column} onUpdateColumn={onUpdateColumn} />
  ));
}
