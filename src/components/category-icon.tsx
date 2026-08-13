import {
  BarChart3,
  Check,
  ClipboardList,
  Code2,
  FileText,
  FlaskConical,
  Home,
  Network,
  NotebookPen,
  Package,
  PenLine,
  RefreshCw,
  Rocket,
  Search,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  home: Home,
  package: Package,
  clipboard: ClipboardList,
  check: Check,
  sparkles: Sparkles,
  notebook: NotebookPen,
  search: Search,
  network: Network,
  code: Code2,
  refresh: RefreshCw,
  flask: FlaskConical,
  file: FileText,
  rocket: Rocket,
  users: Users,
  pen: PenLine,
  chart: BarChart3,
};

export function CategoryIcon({
  icon,
  className,
}: {
  icon: string;
  className?: string;
}) {
  const Cmp = ICONS[icon] ?? FileText;
  return <Cmp className={className} />;
}