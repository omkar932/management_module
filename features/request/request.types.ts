export type RequestRow = RequestUser & {
  isApprover: boolean;
  amount?: number;
};

export type RequestState = {
  name: string;
  accountId: string;
  docType: string;
  users: RequestRow[];
};

export interface RequestUser {
  id: number;
  name: string;
  amount?: number;
}
