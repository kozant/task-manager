export type ColumnColor = {
  name: string;
  background: string;
};

export interface Card {
  id: number;
  priority: number;
  title: string;
  description: string;
}

export interface Column {
  id: number;
  title: string;
  color: ColumnColor;
  cards: Card[];
}

export interface Board {
  id: number;
  title: string;
  columns: Column[];
}
