import Header from "./components/Header";
import Content from "./components/Content";
import { useCallback, useState } from "react";

function App() {
  const [boards, setBoards] = useState<any[]>([
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
  ]);

  const addBoard = useCallback(() => {
    const newBoard = {
      id: Date.now(),
      title: `Board ${boards.length + 1}`,
      columns: [],
    };
    setBoards([...boards, newBoard]);
  }, [boards]);

  const updateBoard = useCallback(
    (updatedBoard: any) => {
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === updatedBoard.id ? updatedBoard : board,
        ),
      );
    },
    [setBoards],
  );

  return (
    <>
      <Header onAddBoard={addBoard} />
      <Content boards={boards} onUpdateBoard={updateBoard} />
    </>
  );
}

export default App;
