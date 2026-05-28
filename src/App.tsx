import Header from "./components/Header";
import BoardList from "./components/Boards";
import { useCallback } from "react";
import type { Board } from "./types/board";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

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
  const [boards, setBoards] = useLocalStorageState<Board[]>(
    "boards",
    initialBoards,
  );

  const addBoard = useCallback(() => {
    setBoards((previousBoards) => [
      ...previousBoards,
      {
        id: Date.now(),
        title: `Board ${previousBoards.length + 1}`,
        columns: [],
      },
    ]);
  }, [setBoards]);

  const updateBoard = useCallback(
    (updatedBoard: Board) => {
      setBoards((previousBoards) =>
        previousBoards.map((board) =>
          board.id === updatedBoard.id ? updatedBoard : board,
        ),
      );
    },
    [setBoards],
  );

  return (
    <>
      <Header onAddBoard={addBoard} />
      <BoardList boards={boards} onUpdateBoard={updateBoard} />
    </>
  );
}

export default App;
