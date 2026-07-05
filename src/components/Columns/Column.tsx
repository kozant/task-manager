import { useCallback, useState } from "react";
import CardList from "../Cards";
import type { Column as ColumnType, Card as CardType } from "../../types/board";
import CardForm from "../CardForm";
import type { SubmitHandler } from "react-hook-form";
import { Plus } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Dropdown from "../common/Dropdown";
import { Ellipsis } from "lucide-react";
import Modal from "../common/Modal";

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
    backgroundColor: column.color.background,
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const { cards } = column;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingOpenModal, setPendingOpenModal] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleOpenAddForm = () => {
    if (isDropdownOpen) {
      setPendingOpenModal(true);
    } else {
      openModal();
    }
  };

  const handleDropdownChange = (open: boolean) => {
    setIsDropdownOpen(open);

    if (!open && pendingOpenModal) {
      setPendingOpenModal(false);
      openModal();
    }
  };

  const handleCloseAddForm = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleAddCard: SubmitHandler<CardType> = useCallback(
    (data) => {
      const newCard: CardType = {
        id: Date.now(),
        priority: data.priority,
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
      group: "list",
      label: "Add Card",
      onSelect: handleOpenAddForm,
    },
    // {
    //   group: "list",
    //   label: "Edit Column Color",
    //   onSelect: handleOpenAddForm,
    // },
    {
      group: "danger",
      label: "Delete Column",
      onSelect: handleDeleteColumn,
      className: "text-red-600 hover:bg-red-600/10",
    },
  ];

  const actionsClassName = `
  flex
  transition-opacity
  ${
    isDropdownOpen
      ? "opacity-100 pointer-events-auto"
      : "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
  }
`;

  return (
    <li
      ref={setNodeRef}
      className="px-2"
      style={{ height: "calc(100% - 96px)" }}
    >
      <div
        style={style}
        className="group flex flex-col gap-2 p-2 rounded-md shadow-sm text-sm select-none max-h-full overflow-y-auto overflow-x-hidden w-64"
      >
        <div
          {...attributes}
          {...listeners}
          className="pl-4 flex justify-between items-center cursor-grab"
        >
          <strong style={{ color: "#172b4d" }}>{column.title}</strong>

          <div className={actionsClassName}>
            <Dropdown
              tooltipText="Actions"
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
              onOpenChange={handleDropdownChange}
            />
          </div>
        </div>
        <CardList
          cards={cards}
          onEdit={handleEditCard}
          onDelete={handleDeleteCard}
          onReorder={handleReorderCards}
        />
        <button
          type="button"
          className="flex items-center gap-1 pl-4 pr-4 p-2 rounded-md hover:bg-black/10 cursor-pointer text-left"
          style={{ color: "#202020", fontWeight: 500 }}
          onClick={handleOpenAddForm}
        >
          <Plus size={17} /> <span>Add Card</span>
        </button>
        <Modal title="Add Card" isOpen={isModalOpen} onChange={setIsModalOpen}>
          <CardForm
            buttonText="Add Card"
            onSubmit={handleAddCard}
            onClose={handleCloseAddForm}
          />
        </Modal>
      </div>
    </li>
  );
}
