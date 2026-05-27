import { useCallback, useState } from "react";
import { SquarePen, Trash } from "lucide-react";
import type { Card as CardType } from "../../types/board";
import Tooltip from "../common/Tooltip";
import CardForm from "../CardForm";

export default function Card({
  card,
  onEdit,
  onDelete,
}: {
  card: CardType;
  onEdit: (cardId: number, updatedCard: CardType) => void;
  onDelete: (cardId: number) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = useCallback(() => {
    setIsFormOpen(true);
  }, []);

  const handleEdit = useCallback(
    (data: CardType) => {
      const updatedCard: CardType = { ...data, id: card.id };
      onEdit(card.id, updatedCard);
      setIsFormOpen(false);
    },
    [onEdit, card.id],
  );

  const handleDelete = useCallback(() => {
    onDelete(card.id);
  }, [onDelete, card]);

  const handleClose = useCallback(() => {
    setIsFormOpen(false);
  }, []);

  const handleOnMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleOnMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return isFormOpen ? (
    <CardForm
      buttonText="Update Card"
      defaultValue={card}
      onSubmit={handleEdit}
      onClose={handleClose}
    />
  ) : (
    <div
      className="p-4 pr-2 rounded-md bg-white shadow-md border-2 border-white hover:border-blue-500 cursor-pointer"
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold">{card.title}</h3>
        {isHovered ? (
          <div className="flex">
            <Tooltip text="Edit Card">
              <div
                className="p-2 cursor-pointer hover:bg-gray-200 rounded-full"
                onClick={handleOpenForm}
              >
                <SquarePen size={15} color="rgb(80, 82, 88)" />
              </div>
            </Tooltip>
            <Tooltip text="Delete Card">
              <div
                className="p-2 cursor-pointer hover:bg-gray-200 rounded-full"
                onClick={handleDelete}
              >
                <Trash size={15} color="rgb(80, 82, 88)" />
              </div>
            </Tooltip>
          </div>
        ) : (
          <div style={{ height: 31 }} />
        )}
      </div>
      <p className="pr-2 text-gray-600">{card.description}</p>
    </div>
  );
}
