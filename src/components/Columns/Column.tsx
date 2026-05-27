import { useCallback, useState } from "react";
import CardList from "../Cards";
import type { Column as ColumnType, Card as CardType } from "../../types/board";
import CardForm from "../CardForm";
import type { SubmitHandler } from "react-hook-form";
import Tooltip from "../common/Tooltip";
import { Trash } from "lucide-react";

export default function Column({
  column,
  onUpdateColumn,
  onDeleteColumn,
}: {
  column: ColumnType;
  onUpdateColumn: (column: ColumnType) => void;
  onDeleteColumn: (columnId: number) => void;
}) {
  const { cards } = column;

  const [isHovered, setIsHovered] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOnMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleOnMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

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

  const handleDeleteColumn = useCallback(() => {
    onDeleteColumn(column.id);
  }, [onDeleteColumn, column.id]);

  return (
    <div
      className="flex flex-col gap-2 p-2 bg-green-100 rounded-md shadow-sm cursor-pointer"
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <div className="pl-4 flex justify-between items-center">
        <strong>{column.title}</strong>
        {isHovered ? (
          <div className="flex">
            <Tooltip text="Delete Column">
              <div
                className="p-2 cursor-pointer hover:bg-green-200 rounded-full"
                onClick={handleDeleteColumn}
              >
                <Trash size={15} color="rgb(80, 82, 88)" />
              </div>
            </Tooltip>
          </div>
        ) : (
          <div style={{ height: 31 }} />
        )}
      </div>
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
          className="pl-4 pr-4 p-2 rounded-md hover:bg-green-200 cursor-pointer"
          onClick={handleOpenAddForm}
        >
          + Add Card
        </div>
      )}
    </div>
  );
}
