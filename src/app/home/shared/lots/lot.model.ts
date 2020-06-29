export interface Lot {
  id?: string;
  image: string;
  title: string;
  description: string;
  schedule: string;
  wish: boolean;
  food: boolean;
  delivered: boolean;
  username: string;
  location?: string;
}
