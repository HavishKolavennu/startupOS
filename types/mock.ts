export interface Subscription {
  id: string;
  vendor: string;
  cost: number;
  renewal: string;
  owner: string;
}

export interface Partnership {
  id: string;
  name: string;
  stage: string;
  value: string;
  nextMeeting: string;
}

export interface Lead {
  id: string;
  name: string;
  status: string;
  score: number;
  lastContact: string;
}

export interface Contact {
  id: string;
  name: string;
  org: string;
  role: string;
  tags: string[];
}

export interface ChartDataPoint {
  month: string;
  value: number;
  label?: string;
}

export interface ExpenseBreakdown {
  category: string;
  amount: number;
  color: string;
}
