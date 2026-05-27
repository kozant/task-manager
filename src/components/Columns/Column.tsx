import { useCallback, useState } from "react";
import CardList from "../Cards";
import type { Column as ColumnType } from "../../types/board";
import AddCard from "./AddCard";

export default function Column({
  column,
  onUpdateColumn,
}: {
  column: ColumnType;
  onUpdateColumn: (column: ColumnType) => void;
}) {
  const { cards } = column;

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenAddForm = useCallback(() => {
    setIsFormOpen(true);
  }, []);

  const handleCloseAddForm = useCallback(() => {
    setIsFormOpen(false);
  }, []);

  return (
    <div className="flex flex-col gap-3 p-2 bg-green-100 rounded-md shadow-sm">
      <strong>{column.title}</strong>
      <CardList cards={cards} />
      {isFormOpen ? (
        <AddCard
          column={column}
          onUpdateColumn={onUpdateColumn}
          onClose={handleCloseAddForm}
        />
      ) : (
        <div
          className="p-2 rounded-md hover:bg-green-200 cursor-pointer"
          onClick={handleOpenAddForm}
        >
          + Add Card
        </div>
      )}
    </div>
  );
}
