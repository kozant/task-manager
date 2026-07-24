import Header from "./components/Header";
import BoardList from "./components/Boards";
import BoardPanel from "./components/BoardPanel";
import { useCallback } from "react";
import { useBoardStore } from "./store/useBoardStore";

function App() {
  const boards = useBoardStore((state) => state.boards);
  const createBoard = useBoardStore((state) => state.createBoard);

  const addBoard = useCallback(() => {
    createBoard();
  }, [createBoard]);

  return (
    <>
      <Header onAddBoard={addBoard} />
      <BoardList boards={boards} />
      <BoardPanel />
    </>
  );
}

export default App;
