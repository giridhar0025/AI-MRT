export interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  role: 'admin' | 'user';
  createdAt: string;
}

export const users: User[] = Array.from({ length: 2000 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  status: i % 2 === 0 ? 'active' : 'inactive',
  role: i % 3 === 0 ? 'admin' : 'user',
  createdAt: new Date(Date.UTC(2024, 0, (i % 28) + 1)).toISOString(),
}));
