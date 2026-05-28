import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Board } from "../types/board";

const initialBoards: Board[] = [
  {
    id: 1,
    title: "Task Manager",
    columns: [
      {
        id: 1,
        title: "To Do",
        cards: [
          {
            id: 1,
            title: "Design UI",
            description: "Create wireframes and mockups",
          },
          {
            id: 2,
            title: "Set up backend",
            description: "Initialize database and API",
          },
        ],
      },
      { id: 2, title: "In Progress", cards: [] },
      { id: 3, title: "Done", cards: [] },
    ],
  },
];

type BoardState = {
  boards: Board[];
  createBoard: (title?: string) => void;
  updateBoard: (board: Board) => void;
};

export const useBoardStore = create<BoardState>()(
  persist(
    (set, get) => ({
      boards: initialBoards,
      createBoard: (title = `Board ${get().boards.length + 1}`) =>
        set((state) => ({
          boards: [...state.boards, { id: Date.now(), title, columns: [] }],
        })),
      updateBoard: (updatedBoard) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === updatedBoard.id ? updatedBoard : board,
          ),
        })),
    }),
    {
      name: "task-manager-boards",
      version: 1,
    },
  ),
);
