import Card from "../Card";

export default function Column({ column }: { column: any }) {
  return (
    <div key={column.id} className="p-2 bg-green-100 rounded-md shadow-sm">
      {column.name}
      {column.cards.map((card: any) => (
        <Card key={card.id} card={card} />
      ))}
      <div className="p-2 mt-2 rounded-md hover:bg-green-200 cursor-pointer">
        + Add Card
      </div>
    </div>
  );
}
