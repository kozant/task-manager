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
          {
            id: 3,
            title: "Implement authentication",
            description: "Add login and registration",
          },
        ],
      },
      {
        id: 2,
        title: "In Progress",
        cards: [
          {
            id: 4,
            title: "Write documentation",
            description: "Document the API endpoints",
          },
          {
            id: 5,
            title: "Create tests",
            description: "Write unit and integration tests",
          },
          {
            id: 6,
            title: "Deploy to staging",
            description: "Set up staging environment and deploy",
          },
        ],
      },
      {
        id: 3,
        title: "Done",
        cards: [
          { id: 7, title: "Review code", description: "Conduct code review" },
          {
            id: 8,
            title: "Update documentation",
            description: "Keep documentation up to date",
          },
          {
            id: 9,
            title: "Release to production",
            description: "Deploy the application to production",
          },
        ],
      },
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
