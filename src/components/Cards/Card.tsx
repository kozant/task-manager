import { useCallback, useState } from "react";
import { SquarePen, Trash } from "lucide-react";
import type { Card as CardType } from "../../types/board";
import Tooltip from "../common/Tooltip";
import CardForm from "../CardForm";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PRIORITY_LEVELS } from "../../store/useBoardStore";
import Modal from "../common/Modal";

type CardProps = {
  card: CardType;
  onEdit: (cardId: number, updatedCard: CardType) => void;
  onDelete: (cardId: number) => void;
};

export default function Card({ card, onEdit, onDelete }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id, disabled: isModalOpen });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleEdit = useCallback(
    (data: CardType) => {
      const updatedCard: CardType = { ...data, id: card.id };
      onEdit(card.id, updatedCard);
      setIsModalOpen(false);
    },
    [onEdit, card.id],
  );

  const handleDelete = useCallback(() => {
    onDelete(card.id);
  }, [onDelete, card.id]);

  const handleOnMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleOnMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const getPriorityLabel = (priority: number) => {
    const level = PRIORITY_LEVELS.find((p) => p.level === priority);
    return level ? level.name : "Unknown";
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="pl-4 p-2 rounded-md bg-white shadow-md hover:shadow-lg cursor-grab text-sm select-none"
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <div className="flex justify-between items-start">
        <div
          className={`text-xs font-semibold px-2 py-1 rounded ${
            card.priority === 0
              ? "bg-red-200 text-red-800"
              : card.priority === 1
                ? "bg-yellow-200 text-yellow-800"
                : "bg-green-200 text-green-800"
          }`}
        >
          {getPriorityLabel(card.priority)}
        </div>
        <div
          className={`flex transition-opacity ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <Tooltip text="Edit Card">
            <button
              type="button"
              className="p-2 cursor-pointer hover:bg-black/10 rounded-full"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
            >
              <SquarePen size={15} color="rgb(80, 82, 88)" />
            </button>
          </Tooltip>
          <Tooltip text="Delete Card">
            <button
              type="button"
              className="p-2 cursor-pointer hover:bg-black/10 rounded-full"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={handleDelete}
            >
              <Trash size={15} color="rgb(80, 82, 88)" />
            </button>
          </Tooltip>
        </div>
      </div>
      <h3 className="text-lg font-bold mb-2" style={{ color: "#172b4d" }}>
        {card.title}
      </h3>
      <p className="pr-2" style={{ color: "#202020" }}>
        {card.description}
      </p>
      <Modal title="Edit Card" isOpen={isModalOpen} onChange={setIsModalOpen}>
        <CardForm
          buttonText="Update Card"
          defaultValue={card}
          onSubmit={handleEdit}
        />
      </Modal>
    </div>
  );
}
