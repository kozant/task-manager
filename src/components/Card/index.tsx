export default function Card({ card }: { card: any }) {
  return (
    <div key={card.id} className="p-4 mt-2 rounded-md bg-white shadow-md">
      <h3 className="text-lg font-bold mb-2">{card.title}</h3>
      <p className="text-gray-600">{card.description}</p>
    </div>
  );
}
