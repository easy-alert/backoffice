export type Guarantee = {
  id: number;
  description: string;
  failures: string;
  term: string;
  observation: string;
  source: string;
};

export type SortType = 'description' | 'failures' | 'term' | 'source';

export type Category = {
  id: string;
  name: string;
  guarantees: Guarantee[];
};

export interface GuaranteeCategoryProps {
  category: Category;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  index: number;
}
