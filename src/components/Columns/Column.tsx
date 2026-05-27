import { useCallback, useState } from "react";
import CardList from "../Cards";
import type { Column as ColumnType, Card as CardType } from "../../types/board";
import CardForm from "../CardForm";
import type { SubmitHandler } from "react-hook-form";

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

  const handleAddCard: SubmitHandler<CardType> = useCallback(
    (data) => {
      const newCard: CardType = {
        id: Date.now(),
        title: data.title,
        description: data.description,
      };
      onUpdateColumn({ ...column, cards: [...cards, newCard] });
      handleCloseAddForm();
    },
    [column, onUpdateColumn],
  );

  const handleEditCard = useCallback(
    (cardId: number, updatedCard: CardType) => {
      const updatedCards = cards.map((card) =>
        card.id === cardId ? updatedCard : card,
      );
      onUpdateColumn({ ...column, cards: updatedCards });
    },
    [column, onUpdateColumn],
  );

  const handleDeleteCard = useCallback(
    (cardId: number) => {
      const updatedCards = cards.filter((card) => card.id !== cardId);
      onUpdateColumn({ ...column, cards: updatedCards });
    },
    [cards, column, onUpdateColumn],
  );

  return (
    <div className="flex flex-col gap-3 p-2 bg-green-100 rounded-md shadow-sm">
      <strong>{column.title}</strong>
      <CardList
        cards={cards}
        onEdit={handleEditCard}
        onDelete={handleDeleteCard}
      />
      {isFormOpen ? (
        <CardForm
          buttonText="Add Card"
          onSubmit={handleAddCard}
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
