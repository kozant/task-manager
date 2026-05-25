export default function Column({ column }: { column: any }) {
  return (
    <div key={column.id} className="p-2 bg-green-100 rounded-md shadow-sm">
      {column.name}
      {column.cards.map((card: any) => (
        <div key={card.id} className="p-4 mt-2 rounded-md bg-white shadow-md">
          <h3 className="text-lg font-bold mb-2">{card.title}</h3>
          <p className="text-gray-600">{card.description}</p>
        </div>
      ))}
      <div className="p-2 mt-2 rounded-md hover:bg-green-200 cursor-pointer">
        + Add Card
      </div>
    </div>
  );
}
