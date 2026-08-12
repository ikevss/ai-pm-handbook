import { cache } from 'react';
import type { Template, TemplateGroup, TemplateStatus } from './types';

export type PromptCategory =
  | 'market'
  | 'product'
  | 'architecture'
  | 'coding'
  | 'refactor'
  | 'testing'
  | 'docs'
  | 'devops'
  | 'agents'
  | 'prompting'
  | 'visual';

export interface Prompt {
  index: number;
  category: PromptCategory;
  title: string;
  summary: string;
  content: string;
}

export interface CategoryDef {
  key: PromptCategory;
  label: string;
  emoji: string;
}

/** 11 类提示词分类定义（与 content/prompts.json 数据一致） */
export const CATEGORY_DEFS: CategoryDef[] = [
  { key: 'market', label: '市场研究', emoji: '🔍' },
  { key: 'product', label: '产品定义', emoji: '🧩' },
  { key: 'architecture', label: '代码架构与仓库分析', emoji: '🏗️' },
  { key: 'coding', label: '代码编写与开发范式', emoji: '⚙️' },
  { key: 'refactor', label: '重构与代码审查', emoji: '🔄' },
  { key: 'testing', label: '测试设计', emoji: '🧪' },
  { key: 'docs', label: '文档与知识沉淀', emoji: '📚' },
  { key: 'devops', label: '发布与运维', emoji: '🚀' },
  { key: 'agents', label: '多智能体与并行协作', emoji: '🤖' },
  { key: 'prompting', label: '提示词工程与风格', emoji: '✍️' },
  { key: 'visual', label: '可视化与特殊输出', emoji: '📊' },
];

const TEMPLATE_GROUPS: TemplateGroup[] = [
  {
    key: 'root',
    label: '根目录文件',
    description: 'AI 和开发者进仓库第一眼看到的文件',
    ids: ['changelog', 'readme', 'agents'],
  },
  {
    key: 'product',
    label: '产品定义',
    description: '产品需求与 AI 行为约束',
    ids: ['brd', 'car', 'poc', 'spec', 'prompt'],
  },
  {
    key: 'project',
    label: '项目管理',
    description: '项目计划定方向，风险登记防意外',
    ids: ['plan', 'risk', 'kanban', 'raci', 'cost'],
  },
  {
    key: 'qa',
    label: '测试与验收',
    description: 'PM 自己验收，不依赖测试团队',
    ids: ['uat', 'eval', 'metrics', 'issue'],
  },
  {
    key: 'ai',
    label: 'AI 自动产出',
    description: 'AI 自动产出文档，PM Review 确认',
    ids: ['solution', 'prototype', 'adr'],
  },
  {
    key: 'process',
    label: '过程资产',
    description: '会议记录、工作笔记、参考资料',
    ids: ['notes', 'scratch', 'ref'],
  },
];

/** 直接从 JSON 源读取模板列表（构建期缓存） */
export const getTemplates = cache(async (): Promise<Template[]> => {
  const data = await import('../../content/templates.json');
  return data.default as Template[];
});

export const getTemplateGroups = (): TemplateGroup[] => TEMPLATE_GROUPS;

export const getPromptCategories = (): CategoryDef[] => CATEGORY_DEFS;

/** 直接从 JSON 源读取提示词列表（构建期缓存） */
export const getPrompts = cache(async (): Promise<Prompt[]> => {
  const data = await import('../../content/prompts.json');
  return data.default as Prompt[];
});

export const statusOrder: Record<TemplateStatus, number> = {
  已确认: 0,
  评审中: 1,
  提议中: 2,
  草稿: 3,
};
