import Header from "./components/Header";
import Content from "./components/Content";
import { useCallback, useState } from "react";

function App() {
  const [boards, setBoards] = useState<any[]>([
    {
      id: 1,
      name: "Task Manager",
      columns: [
        {
          id: 1,
          name: "To Do",
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
        { id: 2, name: "In Progress", cards: [] },
        { id: 3, name: "Done", cards: [] },
      ],
    },
  ]);

  const addBoard = useCallback(() => {
    const newBoard = {
      id: Date.now(),
      name: `Board ${boards.length + 1}`,
      columns: [],
    };
    setBoards([...boards, newBoard]);
  }, [boards]);

  return (
    <>
      <Header onAddBoard={addBoard} />
      <Content boards={boards} />
    </>
  );
}

export default App;
