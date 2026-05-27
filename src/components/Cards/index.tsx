import Card from "./Card";
import type { Card as CardType } from "../../types/board";

export default function CardList({ cards }: { cards: CardType[] }) {
  if (!cards) return null;

  return cards.map((card) => <Card key={card.id} card={card} />);
}
