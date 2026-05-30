export type LegalBlock =
  | { kind: 'p'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'ol'; items: string[] }
  | { kind: 'h3'; text: string }
  | { kind: 'p-strong'; before: string; strong: string; after?: string }
  | { kind: 'p-link'; before: string; linkText: string; linkHref: string; after?: string }
  | { kind: 'p-email'; before: string; emailLabel: string; email: string; after?: string };

export type LegalSection = { title: string; blocks: LegalBlock[] };

export type LegalPageCopy = {
  breadcrumbs: { homeLabel: string; homeHref: string; currentLabel: string };
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
};
