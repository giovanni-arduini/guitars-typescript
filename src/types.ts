type Guitar = {
  readonly id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
  readonly createdAt: number;
  updatedAt?: number;
  model?: string;
  top?: string;
  body?: string;
  neck?: string;
  fretboard?: string;
  inlays?: string;
  binding?: string;
  profile?: string;
  nutWidth?: number;
  scale?: number;
  bridge?: string;
  pickUp?: string;
  controls?: string;
  electronic?: string;
  color: string;
  case?: string;
  madeIn: string;
  rating?: number;
};

type Product = {
  readonly id: number;
  title: string;
  category: string;
};

export type { Guitar, Product };
