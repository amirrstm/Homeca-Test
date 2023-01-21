export interface ProductCtx {
  id: number;
  name: string;
  categoryTitle: string;
  status: { title: string };
  vendor: { name: string };
  photo: { MEDIUM: string; SMALL: string };
}

export interface AppProduct {
  id: number;
  title: string;
  image: string;
  vendor: string;
  status: string;
  category: string;
}
