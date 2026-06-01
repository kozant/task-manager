import { useCallback, useState } from "react";
import { SquarePen, Trash } from "lucide-react";
import type { Card as CardType } from "../../types/board";
import Tooltip from "../common/Tooltip";
import CardForm from "../CardForm";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type CardProps = {
  card: CardType;
  onEdit: (cardId: number, updatedCard: CardType) => void;
  onDelete: (cardId: number) => void;
};

export default function Card({ card, onEdit, onDelete }: CardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

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
  }, [onDelete, card.id]);

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
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="pl-4 p-2 rounded-md bg-white shadow-md hover:shadow-lg cursor-grab"
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold">{card.title}</h3>
        {isHovered ? (
          <div className="flex">
            <Tooltip text="Edit Card">
              <button
                type="button"
                className="p-2 cursor-pointer hover:bg-gray-200 rounded-full"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={handleOpenForm}
              >
                <SquarePen size={15} color="rgb(80, 82, 88)" />
              </button>
            </Tooltip>
            <Tooltip text="Delete Card">
              <button
                type="button"
                className="p-2 cursor-pointer hover:bg-gray-200 rounded-full"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={handleDelete}
              >
                <Trash size={15} color="rgb(80, 82, 88)" />
              </button>
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
