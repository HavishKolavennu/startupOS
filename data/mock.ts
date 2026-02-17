import type {
  Subscription,
  Partnership,
  Lead,
  Contact,
  ChartDataPoint,
  ExpenseBreakdown,
} from "@/types/mock";

export const mockSubscriptions: Subscription[] = [
  { id: "1", vendor: "Vercel", cost: 20, renewal: "Mar 15", owner: "Dev" },
  { id: "2", vendor: "Notion", cost: 12, renewal: "Apr 2", owner: "Ops" },
  { id: "3", vendor: "Stripe", cost: 0, renewal: "—", owner: "Finance" },
  { id: "4", vendor: "Figma", cost: 15, renewal: "Mar 28", owner: "Design" },
  { id: "5", vendor: "Linear", cost: 8, renewal: "Apr 10", owner: "Dev" },
];

export const mockPartnerships: Partnership[] = [
  {
    id: "1",
    name: "Acme Corp",
    stage: "Negotiation",
    value: "$50K",
    nextMeeting: "Mar 20",
  },
  {
    id: "2",
    name: "TechFlow Inc",
    stage: "Discovery",
    value: "TBD",
    nextMeeting: "Mar 25",
  },
  {
    id: "3",
    name: "Scale Labs",
    stage: "Proposal",
    value: "$120K",
    nextMeeting: "Apr 5",
  },
];

export const mockLeads: Lead[] = [
  { id: "1", name: "Sarah Chen", status: "Qualified", score: 85, lastContact: "2 days ago" },
  { id: "2", name: "Mike Torres", status: "Contacted", score: 62, lastContact: "1 week ago" },
  { id: "3", name: "Emma Wilson", status: "New", score: 45, lastContact: "—" },
  { id: "4", name: "James Park", status: "Qualified", score: 78, lastContact: "3 days ago" },
];

export const mockContacts: Contact[] = [
  { id: "1", name: "Alex Rivera", org: "Acme Corp", role: "CTO", tags: ["Partner", "Investor"] },
  { id: "2", name: "Jordan Lee", org: "TechFlow", role: "CEO", tags: ["Partner"] },
  { id: "3", name: "Casey Kim", org: "Scale Labs", role: "BD Lead", tags: ["Partner", "Warm"] },
];

export const mrrChartData: ChartDataPoint[] = [
  { month: "Sep", value: 14.2 },
  { month: "Oct", value: 15.8 },
  { month: "Nov", value: 17.1 },
  { month: "Dec", value: 18.4 },
  { month: "Jan", value: 19.2 },
  { month: "Feb", value: 21.4 },
];

export const expenseBreakdown: ExpenseBreakdown[] = [
  { category: "Subscriptions", amount: 2.4, color: "#D85C5C" },
  { category: "Payroll", amount: 12.0, color: "#5C5650" },
  { category: "Infrastructure", amount: 1.8, color: "#4A9B6F" },
  { category: "Other", amount: 0.8, color: "#D4A84B" },
];

export const profitChartData: ChartDataPoint[] = [
  { month: "Sep", value: -2.1 },
  { month: "Oct", value: -1.2 },
  { month: "Nov", value: 0.4 },
  { month: "Dec", value: 1.2 },
  { month: "Jan", value: 2.1 },
  { month: "Feb", value: 3.4 },
];

export const kpiData = {
  mrr: 21400,
  arr: 256800,
  burnRate: 8200,
  runwayMonths: 14,
  netProfit: 3400,
  activeSubscriptions: 12,
};
