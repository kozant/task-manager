export interface Card {
  id: number;
  title: string;
  description: string;
}

export interface Column {
  id: number;
  title: string;
  cards: Card[];
}

export interface Board {
  id: number;
  title: string;
  columns: Column[];
}
