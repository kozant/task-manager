import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Board, ColumnColor } from "../types/board";

export const COLUMN_COLORS: ColumnColor[] = [
  {
    name: "gray",
    background: "#F0F1F2",
  },
  {
    name: "lime",
    background: "#EFFFD6",
  },
  {
    name: "red",
    background: "#FFECEB",
  },
  {
    name: "orange",
    background: "#FFF5DB",
  },
  {
    name: "yellow",
    background: "#FEF7C8",
  },
  {
    name: "green",
    background: "#DCFFF1",
  },
  {
    name: "teal",
    background: "#E7F9FF",
  },
  {
    name: "blue",
    background: "#E9F2FE",
  },
  {
    name: "purple",
    background: "#F8EEFE",
  },
  {
    name: "magenta",
    background: "#FFECF8",
  },
];

const initialBoards: Board[] = [
  {
    id: 1,
    title: "Task Manager",
    columns: [
      {
        id: 1,
        title: "To Do",
        color: { name: "green", background: "#DCFFF1" },
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
        color: { name: "blue", background: "#E9F2FE" },
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
        color: { name: "yellow", background: "#FEF7C8" },
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
