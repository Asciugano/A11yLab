export type User = {
  id: string;
  email: string;
  password: string;

  certificates: []; // TODO: aggiornare con Certificates[]
  role: string; // TODO aggiornare con UserRole
  subscription: string; // TODO aggiornare con subscription

  createdAt: Date;
};
