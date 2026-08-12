import { Badge } from "@/components/ui/badge";
import type { TemplateStatus } from "@/lib/types";

const STYLES: Record<TemplateStatus, string> = {
  已确认: "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
  评审中: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300",
  提议中: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300",
  草稿: "border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

export function StatusBadge({ status }: { status: TemplateStatus }) {
  return <Badge className={STYLES[status]}>{status}</Badge>;
}