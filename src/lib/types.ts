export type TemplateStatus =
  | '已确认'
  | '评审中'
  | '提议中'
  | '草稿';

export interface Template {
  id: string;
  name: string;
  meta: string;
  desc: string;
  status: TemplateStatus;
  content: string;
}

export interface TemplateGroup {
  key: string;
  label: string;
  description: string;
  icon: string;
  ids: string[];
}
