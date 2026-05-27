import Header from "./components/Header";
import BoardList from "./components/Boards";
import { useCallback, useEffect, useState } from "react";
import type { Board } from "./types/board";

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

function App() {
  const [boards, setBoards] = useState<Board[]>(
    localStorage.getItem("boards")
      ? JSON.parse(localStorage.getItem("boards")!)
      : initialBoards,
  );

  useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(boards));
  }, [boards]);

  const addBoard = useCallback(() => {
    const newBoard: Board = {
      id: Date.now(),
      title: `Board ${boards.length + 1}`,
      columns: [],
    };
    setBoards((prevBoards) => [...prevBoards, newBoard]);
  }, [boards]);

  const updateBoard = useCallback((updatedBoard: Board) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === updatedBoard.id ? updatedBoard : board,
      ),
    );
  }, []);

  return (
    <>
      <Header onAddBoard={addBoard} />
      <BoardList boards={boards} onUpdateBoard={updateBoard} />
    </>
  );
}

export default App;
