/** Shared content model for the course. Every section renders from these types. */

export interface CoreIdea {
  readonly n: string;
  readonly title: string;
  readonly body: readonly string[];
  readonly punch?: string;
  readonly code?: string;
}

export interface TerritoryBlock {
  readonly id: string;
  readonly name: string;
  readonly contents: string;
  readonly days: string;
}

export interface SystemLayer {
  readonly n: string;
  readonly name: string;
  readonly desc: string;
  readonly core?: boolean;
}

export interface DesignStep {
  readonly n: string;
  readonly title: string;
  readonly body: string;
}

export interface Topology {
  readonly name: string;
  readonly when: string;
  readonly example: string;
}

export interface WiringRow {
  readonly element: string;
  readonly when: string;
  readonly cost: string;
}

export interface GeneratorDefault {
  readonly bad: string;
  readonly badLead: string;
  readonly fix: string;
}

export interface Beat {
  readonly n: string;
  readonly title: string;
  readonly desc: string;
}

export type DayTag = "важный" | "ядро" | "система" | "риск" | "козырь" | "ключевой" | "лицо демо" | "дедлайн" | "экзамен";

export interface Day {
  readonly id: string;
  readonly label: string;
  readonly block: string;
  readonly title: string;
  readonly tag?: DayTag;
  readonly order: string;
  readonly check: string;
  readonly got: string;
  readonly key?: boolean;
}

export interface Phase {
  readonly n: number;
  readonly title: string;
  readonly range: string;
  readonly goal: string;
  readonly days: readonly Day[];
}

export interface Trap {
  readonly title: string;
  readonly body: string;
}

export interface DomainReason {
  readonly title: string;
  readonly body: string;
}

export interface FlowStep {
  readonly name: string;
  readonly desc: string;
  readonly core?: boolean;
}

export interface NavItem {
  readonly href: string;
  readonly label: string;
  readonly hint: string;
}

/** Hero counter. `hot` marks the one with a hard deadline behind it. */
export interface Stat {
  readonly n: string;
  readonly label: string;
  readonly hot?: boolean;
}
