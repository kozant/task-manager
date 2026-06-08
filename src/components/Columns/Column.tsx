import { useCallback, useState, useEffect } from "react";
import CardList from "../Cards";
import type { Column as ColumnType, Card as CardType } from "../../types/board";
import CardForm from "../CardForm";
import type { SubmitHandler } from "react-hook-form";
import { Plus } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Dropdown from "../common/Dropdown";
import { Ellipsis } from "lucide-react";

type ColumnProps = {
  column: ColumnType;
  onUpdateColumn: (column: ColumnType) => void;
  onDeleteColumn: (columnId: number) => void;
};

export default function Column({
  column,
  onUpdateColumn,
  onDeleteColumn,
}: ColumnProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const { cards } = column;

  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const isActionsVisible = isHovered || isDropdownOpen;

  const handleOnMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleOnMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  useEffect(() => {
    if (!isDropdownOpen) {
      setIsHovered(false);
    }
  }, [isDropdownOpen]);

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

  const handleReorderCards = useCallback(
    (reorderedCards: CardType[]) => {
      onUpdateColumn({ ...column, cards: reorderedCards });
    },
    [column, onUpdateColumn],
  );

  const actions = [
    {
      label: "Delete",
      onSelect: handleDeleteColumn,
      className: "text-red-600",
    },
  ];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-col gap-2 p-2 bg-green-100 rounded-md shadow-sm text-sm"
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <div
        {...attributes}
        {...listeners}
        className="pl-4 flex justify-between items-center cursor-grab"
      >
        <strong style={{ color: "#172b4d" }}>{column.title}</strong>
        {isActionsVisible ? (
          <div className="flex">
            <Dropdown
              items={actions}
              handle={
                <button
                  type="button"
                  className="p-2 cursor-pointer rounded-full outline-none"
                  onPointerDown={(event) => event.stopPropagation()}
                >
                  <Ellipsis size={15} />
                </button>
              }
              onOpenChange={setIsDropdownOpen}
            />
          </div>
        ) : (
          <div style={{ height: 31 }} />
        )}
      </div>
      <CardList
        cards={cards}
        onEdit={handleEditCard}
        onDelete={handleDeleteCard}
        onReorder={handleReorderCards}
      />
      {isFormOpen ? (
        <CardForm
          buttonText="Add Card"
          onSubmit={handleAddCard}
          onClose={handleCloseAddForm}
        />
      ) : (
        <button
          type="button"
          className="flex items-center gap-1 pl-4 pr-4 p-2 rounded-md hover:bg-green-200 cursor-pointer text-left"
          style={{ color: "#202020", fontWeight: 500 }}
          onClick={handleOpenAddForm}
        >
          <Plus size={17} /> <span>Add Card</span>
        </button>
      )}
    </div>
  );
}
