export interface Resolution {
  id: number;
  title: string;
  status: 'Passed' | 'Failed' | 'In Session' | 'Pending';
  amendmentCount: number;
}

export interface Country {
  id: number;
  name: string;
  amendmentCount: number;
}
