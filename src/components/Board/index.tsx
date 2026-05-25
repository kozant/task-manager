import Column from "../Column";

export default function Board({ board }: { board: any }) {
  return (
    <div className="p-4 bg-blue-100 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">{board.name}</h2>
      <div className="grid grid-cols-5 gap-4">
        {board.columns.map((column: any) => (
          <Column key={column.id} column={column} />
        ))}
        <div className="p-2 rounded-md hover:bg-blue-200 cursor-pointer h-fit">
          + Add Column
        </div>
      </div>
    </div>
  );
}
