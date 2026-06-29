export type NodeType = 'category' | 'concept' | 'project' | 'source' | 'topic';
export type NodeKind = 'cluster' | 'project' | 'topic' | 'fact' | 'source';
export type NodeDepth = 'spark' | 'fact' | 'note' | 'essay' | 'project' | 'source';
export type LinkType = 'built_from' | 'part_of' | 'similar_to';

export interface NodePosition {
  x: number;
  y: number;
  z: number;
}

export interface NodeMetrics {
  degree: number;
  incoming: number;
  outgoing: number;
}

export interface NodeStyle {
  color: string;
  size: number;
  shape: 'sphere' | 'diamond' | 'core' | string;
  glow: boolean;
}

export interface NodeAction {
  type: 'focus' | 'read' | 'source' | string;
  label: string;
  url?: string;
}

export interface GraphNode {
  id: string;
  slug: string;
  title: string;
  label: string;
  type: NodeType;
  kind: NodeKind;
  depth: NodeDepth;
  summary: string;
  preview: string;
  body_md: string;
  source_url: string | null;
  wiki_path: string | null;
  position: NodePosition;
  metrics: NodeMetrics;
  style: NodeStyle;
  actions: NodeAction[];
  
  // Custom force-graph fields populated by 3d-force-graph
  x?: number;
  y?: number;
  z?: number;
  vx?: number;
  vy?: number;
  vz?: number;
}

export interface LinkStyle {
  color: string;
  width: number;
  opacity: number;
}

export interface GraphLink {
  id: string;
  source: string | GraphNode;
  target: string | GraphNode;
  source_slug: string;
  target_slug: string;
  type: LinkType;
  raw_type: string;
  label: string;
  verb: string;
  tone: string;
  weight: number;
  directional: boolean;
  style: LinkStyle;
}

export interface NodeFilterOption {
  type: NodeType;
  label: string;
  color: string;
}

export interface LinkFilterOption {
  type: LinkType;
  label: string;
  color: string;
}

export interface GraphStats {
  node_count: number;
  link_count: number;
  node_types: NodeType[];
  link_types: LinkType[];
}

export interface GraphFilters {
  node_types: NodeFilterOption[];
  link_types: LinkFilterOption[];
}

export interface GraphDisplayPayload {
  schema_version: string;
  snapshot_id: string;
  generated_at: string;
  stats: GraphStats;
  filters: GraphFilters;
  nodes: GraphNode[];
  links: GraphLink[];
}
