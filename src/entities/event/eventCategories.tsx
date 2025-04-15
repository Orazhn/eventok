import { Option } from "@/shared/ui/multi-select";
export const OPTIONS: Option[] = [
  { label: "Technology", value: "Technology" },
  { label: "Business", value: "Business" },
  { label: "Education", value: "Education" },
  { label: "Entertainment", value: "Entertainment" },
  { label: "Sports", value: "Sports" },
  { label: "Science", value: "Science" },
  { label: "Finance", value: "Finance" },
  { label: "Networking", value: "Networking" },
];
export type Category = (typeof OPTIONS)[number]["value"];
