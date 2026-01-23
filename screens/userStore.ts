export type UserMetrics = {
  age?: number;
  weightKg?: number;
  heightCm?: number;
};

export type UserAccount = {
  username: string;
  createdAt: number;
  metrics: UserMetrics;
};

let account: UserAccount | null = null;

export const setAccount = (next: UserAccount) => {
  account = next;
};

export const getAccount = () => {
  return account;
};

export const updateMetrics = (patch: Partial<UserMetrics>) => {
  if (!account) return;
  account = {
    ...account,
    metrics: {
      ...account.metrics,
      ...patch,
    },
  };
};
