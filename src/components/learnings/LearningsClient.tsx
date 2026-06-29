import React, { useEffect, useRef, useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { 
  Search, 
  X, 
  ExternalLink, 
  Network, 
  Layers, 
  HelpCircle, 
  Loader2, 
  ChevronRight 
} from 'lucide-react';
import type { 
  GraphDisplayPayload, 
  GraphNode, 
  GraphLink, 
  NodeType, 
  LinkType,
  NodeFilterOption,
  LinkFilterOption
} from './types';

// Typings for the vanilla 3d-force-graph instance
interface ForceGraph3DInstance {
  (element: HTMLElement): ForceGraph3DInstance;
  graphData(): { nodes: GraphNode[]; links: GraphLink[] };
  graphData(data: { nodes: GraphNode[]; links: GraphLink[] }): ForceGraph3DInstance;
  width(w: number): ForceGraph3DInstance;
  height(h: number): ForceGraph3DInstance;
  backgroundColor(color: string): ForceGraph3DInstance;
  showNavInfo(show: boolean): ForceGraph3DInstance;
  nodeThreeObject(obj: (node: GraphNode) => any): ForceGraph3DInstance;
  linkWidth(width: number | ((link: GraphLink) => number)): ForceGraph3DInstance;
  linkOpacity(opacity: number | ((link: GraphLink) => number)): ForceGraph3DInstance;
  linkColor(color: string | ((link: GraphLink) => string)): ForceGraph3DInstance;
  linkDirectionalArrowLength(len: number | ((link: GraphLink) => number)): ForceGraph3DInstance;
  linkDirectionalArrowColor(color: string | ((link: GraphLink) => string)): ForceGraph3DInstance;
  linkDirectionalArrowRelPos(pos: number): ForceGraph3DInstance;
  linkDirectionalParticles(count: number | ((link: GraphLink) => number)): ForceGraph3DInstance;
  linkDirectionalParticleSpeed(speed: number | ((link: GraphLink) => number)): ForceGraph3DInstance;
  linkDirectionalParticleWidth(width: number | ((link: GraphLink) => number)): ForceGraph3DInstance;
  onNodeClick(callback: (node: GraphNode, event: MouseEvent) => void): ForceGraph3DInstance;
  onNodeHover(callback: (node: GraphNode | null, prevNode: GraphNode | null) => void): ForceGraph3DInstance;
  onBackgroundClick(callback: (event: MouseEvent) => void): ForceGraph3DInstance;
  cameraPosition(
    position: { x: number; y: number; z: number }, 
    lookAt?: { x: number; y: number; z: number }, 
    transitionMs?: number
  ): ForceGraph3DInstance;
  d3Force(forceName: string, forceFn?: any): any;
  controls(): any;
  cooldownTicks(ticks: number): ForceGraph3DInstance;
  refresh(): ForceGraph3DInstance;
  _destructor(): void;
}

const withAlpha = (color: string | undefined, alpha: number) => {
  if (!color) return `rgba(59, 130, 246, ${alpha})`;
  const normalized = color.trim();
  if (!normalized.startsWith('#')) return normalized;

  const hex = normalized.replace('#', '');
  if (hex.length !== 6) return normalized;

  const r = Number.parseInt(hex.slice(0, 2), 16);
  const g = Number.parseInt(hex.slice(2, 4), 16);
  const b = Number.parseInt(hex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default function LearningsClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphInstanceRef = useRef<ForceGraph3DInstance | null>(null);

  // Data states
  const [dataPayload, setDataPayload] = useState<GraphDisplayPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Interaction states
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNodeTypes, setActiveNodeTypes] = useState<Set<NodeType>>(new Set());
  const [activeLinkTypes, setActiveLinkTypes] = useState<Set<LinkType>>(new Set());

  // Keep refs of interaction states to avoid stale closures in Three.js animate loop
  const selectedNodeRef = useRef<GraphNode | null>(null);
  const hoveredNodeRef = useRef<GraphNode | null>(null);
  useEffect(() => { selectedNodeRef.current = selectedNode; }, [selectedNode]);
  useEffect(() => { hoveredNodeRef.current = hoveredNode; }, [hoveredNode]);

  // Set of node and link IDs to highlight on hover or selection
  const highlightNodes = useMemo(() => {
    const set = new Set<string>();
    const activeNode = hoveredNode || selectedNode;
    if (!activeNode || !dataPayload) return set;
    
    set.add(activeNode.id);
    dataPayload.links.forEach((link) => {
      const sourceId = typeof link.source === 'object' ? (link.source as GraphNode).id : link.source;
      const targetId = typeof link.target === 'object' ? (link.target as GraphNode).id : link.target;
      
      if (sourceId === activeNode.id) {
        set.add(targetId);
      } else if (targetId === activeNode.id) {
        set.add(sourceId);
      }
    });
    return set;
  }, [hoveredNode, selectedNode, dataPayload]);

  const highlightLinks = useMemo(() => {
    const set = new Set<string>();
    const activeNode = hoveredNode || selectedNode;
    if (!activeNode || !dataPayload) return set;
    
    dataPayload.links.forEach((link) => {
      const sourceId = typeof link.source === 'object' ? (link.source as GraphNode).id : link.source;
      const targetId = typeof link.target === 'object' ? (link.target as GraphNode).id : link.target;
      
      if (sourceId === activeNode.id || targetId === activeNode.id) {
        set.add(link.id);
      }
    });
    return set;
  }, [hoveredNode, selectedNode, dataPayload]);

  // Fetch initial graph data directly on client side
  useEffect(() => {
    async function fetchGraphData() {
      try {
        const backendUrl = 'https://divorcee-work-pessimism.ngrok-free.dev/api/graph/display';
        const res = await fetch(backendUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': '69420',
          }
        });
        if (!res.ok) {
          throw new Error(`Failed to load graph: ${res.statusText}`);
        }
        const data: GraphDisplayPayload = await res.json();
        setDataPayload(data);
        
        // Initialize default active filters (all checked)
        setActiveNodeTypes(new Set(data.stats.node_types));
        setActiveLinkTypes(new Set(data.stats.link_types));
        setLoading(false);
      } catch (err: unknown) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Failed to fetch graph data');
        setLoading(false);
      }
    }
    
    fetchGraphData();
  }, []);

  // Filtered nodes and links to pass to the graph
  const filteredData = useMemo(() => {
    if (!dataPayload) return { nodes: [], links: [] };

    // 1. Filter nodes based on search and type checkbox state
    const nodes = dataPayload.nodes.filter((node) => {
      const matchesSearch = 
        node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = activeNodeTypes.has(node.type);
      return matchesSearch && matchesType;
    });

    const nodeIds = new Set(nodes.map(n => n.id));

    // 2. Filter links based on visibility of endpoints and link type filter state
    const links = dataPayload.links.filter((link) => {
      const sourceId = typeof link.source === 'object' ? (link.source as GraphNode).id : link.source;
      const targetId = typeof link.target === 'object' ? (link.target as GraphNode).id : link.target;
      
      const endpointsVisible = nodeIds.has(sourceId) && nodeIds.has(targetId);
      const matchesLinkType = activeLinkTypes.has(link.type);
      return endpointsVisible && matchesLinkType;
    });

    return { nodes, links };
  }, [dataPayload, searchQuery, activeNodeTypes, activeLinkTypes]);

  // Helper to resolve connected neighbors for detail view
  const selectedNodeNeighbors = useMemo(() => {
    if (!selectedNode || !dataPayload) return [];

    const neighbors: { node: GraphNode; verb: string; linkType: LinkType; direction: 'in' | 'out' }[] = [];

    dataPayload.links.forEach((link) => {
      const sourceId = typeof link.source === 'object' ? (link.source as GraphNode).id : link.source;
      const targetId = typeof link.target === 'object' ? (link.target as GraphNode).id : link.target;

      if (sourceId === selectedNode.id) {
        const targetNode = dataPayload.nodes.find(n => n.id === targetId);
        if (targetNode) {
          neighbors.push({
            node: targetNode,
            verb: link.verb || 'connects to',
            linkType: link.type,
            direction: 'out'
          });
        }
      } else if (targetId === selectedNode.id) {
        const sourceNode = dataPayload.nodes.find(n => n.id === sourceId);
        if (sourceNode) {
          neighbors.push({
            node: sourceNode,
            verb: link.verb || 'connects from',
            linkType: link.type,
            direction: 'in'
          });
        }
      }
    });

    return neighbors;
  }, [selectedNode, dataPayload]);

  // Create/Update 3D Force Graph Instance
  useEffect(() => {
    if (loading || !containerRef.current || !dataPayload) return;

    let graph: ForceGraph3DInstance | null = null;
    let THREEInstance: any = null;
    let starPoints: any = null;

    async function initGraph() {
      // Dynamic imports to prevent build-time browser globals errors
      const { default: ForceGraph3D } = await import('3d-force-graph');
      const THREE = await import('three');
      THREEInstance = THREE;

      if (!containerRef.current) return;

      // Instantiate vanilla graph
      graph = new ForceGraph3D(containerRef.current) as unknown as ForceGraph3DInstance;
      graphInstanceRef.current = graph;

      // Basic Setup - Deep dark space theme background
      graph
        .backgroundColor('#08080f')
        .showNavInfo(false);

      // Setup D3 Force Parameters
      graph.d3Force('charge')?.strength(-130);
      graph.d3Force('link')?.distance(65);

      // Add a rotating star constellation field in background
      const starsGeometry = new THREE.BufferGeometry();
      const starsCount = 450;
      const starPositions = new Float32Array(starsCount * 3);
      for (let i = 0; i < starsCount * 3; i++) {
        starPositions[i] = (Math.random() - 0.5) * 1100;
      }
      starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
      const starsMaterial = new THREE.PointsMaterial({
        color: 0xa5b4fc, // Soft space lavender/blue star dots
        size: 1.6,
        transparent: true,
        opacity: 0.42,
        sizeAttenuation: true,
      });
      starPoints = new THREE.Points(starsGeometry, starsMaterial);
      graph.scene().add(starPoints);

      // Text label creator for dark space rendering
      const createTextSprite = (text: string, color: string, nodeSize: number) => {
        const truncated = text.length > 20 ? text.substring(0, 18) + '...' : text;
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        if (!ctx) return new THREE.Object3D();

        ctx.font = 'bold 20px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Semi-translucent dark halo outline for high readability in deep dark space
        ctx.fillStyle = 'rgba(8, 8, 15, 0.9)';
        ctx.fillText(truncated, 128 - 1.5, 32 - 1.5);
        ctx.fillText(truncated, 128 + 1.5, 32 - 1.5);
        ctx.fillText(truncated, 128 - 1.5, 32 + 1.5);
        ctx.fillText(truncated, 128 + 1.5, 32 + 1.5);
        ctx.fillText(truncated, 128 - 1.5, 32);
        ctx.fillText(truncated, 128 + 1.5, 32);
        ctx.fillText(truncated, 128, 32 - 1.5);
        ctx.fillText(truncated, 128, 32 + 1.5);

        // Draw clean white label text
        ctx.fillStyle = '#ffffff';
        ctx.fillText(truncated, 128, 32);

        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
          depthWrite: false,
        });

        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.name = 'label-sprite';
        sprite.position.set(0, nodeSize + 8, 0);
        sprite.scale.set(24, 6, 1);
        return sprite;
      };

      // Define Node Rendering using specific custom Three.js shapes per node type
      graph.nodeThreeObject((node: GraphNode) => {
        const type = node.type;
        const group = new THREE.Group();

        let mesh: THREE.Mesh;
        if (type === 'category') {
          // Category: large soft glowing core + outer shell
          const size = 6.2;
          const colorVal = '#d8b4fe'; // Purple glow
          const geometry = new THREE.SphereGeometry(size, 20, 20);
          const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(colorVal),
            emissive: new THREE.Color(colorVal),
            emissiveIntensity: 0.5,
            shininess: 90,
            transparent: true,
            opacity: 0.9,
          });
          mesh = new THREE.Mesh(geometry, material);
          mesh.name = 'core-mesh';
          group.add(mesh);

          // Outer wireframe orbital shell
          const outerGeo = new THREE.IcosahedronGeometry(size * 1.5, 1);
          const outerMat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(colorVal),
            wireframe: true,
            transparent: true,
            opacity: 0.16,
          });
          const outerMesh = new THREE.Mesh(outerGeo, outerMat);
          outerMesh.name = 'outer-shell';
          group.add(outerMesh);

        } else if (type === 'project') {
          // Project: cyan/blue solid orb
          const size = 4.8;
          const colorVal = '#22d3ee'; // Cyan
          const geometry = new THREE.SphereGeometry(size, 16, 16);
          const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(colorVal),
            emissive: new THREE.Color('#0891b2'),
            emissiveIntensity: 0.45,
            shininess: 100,
            transparent: true,
            opacity: 0.92,
          });
          mesh = new THREE.Mesh(geometry, material);
          mesh.name = 'core-mesh';
          group.add(mesh);

        } else if (type === 'concept') {
          // Concept: green small neuron
          const size = 3.2;
          const colorVal = '#34d399'; // Emerald Green
          const geometry = new THREE.SphereGeometry(size, 12, 12);
          const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(colorVal),
            emissive: new THREE.Color(colorVal),
            emissiveIntensity: 0.6,
            shininess: 80,
            transparent: true,
            opacity: 0.9,
          });
          mesh = new THREE.Mesh(geometry, material);
          mesh.name = 'core-mesh';
          group.add(mesh);

        } else if (type === 'source') {
          // Source: amber diamond (octahedron)
          const size = 4.2;
          const colorVal = '#fbbf24'; // Amber
          const geometry = new THREE.OctahedronGeometry(size);
          const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(colorVal),
            emissive: new THREE.Color('#d97706'),
            emissiveIntensity: 0.45,
            shininess: 110,
            transparent: true,
            opacity: 0.92,
          });
          mesh = new THREE.Mesh(geometry, material);
          mesh.name = 'core-mesh';
          group.add(mesh);

        } else {
          // Topic: blue pulse node
          const size = 4.4;
          const colorVal = '#6366f1'; // Indigo/blue
          const geometry = new THREE.SphereGeometry(size, 16, 16);
          const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(colorVal),
            emissive: new THREE.Color(colorVal),
            emissiveIntensity: 0.4,
            shininess: 85,
            transparent: true,
            opacity: 0.9,
          });
          mesh = new THREE.Mesh(geometry, material);
          mesh.name = 'pulse-core';
          group.add(mesh);
        }

        // Add text label sprite above node (initially visible to bypass race conditions)
        const labelSprite = createTextSprite(node.title, node.style.color || '#ffffff', 5.5);
        labelSprite.visible = true;
        group.add(labelSprite);

        return group;
      });

      // Define default Link properties (very thin, faint connection mesh lines)
      graph
        .linkWidth(() => 0.5)
        .linkOpacity(() => 0.35)
        .linkColor((link: GraphLink) => link.style.color || '#64748b')
        .linkDirectionalArrowLength((link: GraphLink) => link.directional ? 3.0 : 0)
        .linkDirectionalArrowColor((link: GraphLink) => link.style.color || '#64748b')
        .linkDirectionalArrowRelPos(0.8)
        .linkDirectionalParticles(() => 0)
        .linkDirectionalParticleSpeed(() => 0.008)
        .linkDirectionalParticleWidth(() => 1.4);

      // Click Event - Focus Camera
      graph.onNodeClick((node: GraphNode) => {
        setSelectedNode(node);

        const distance = 80;
        const x = node.x ?? 0;
        const y = node.y ?? 0;
        const z = node.z ?? 0;
        const distRatio = 1 + distance / Math.hypot(x, y, z);

        graph?.cameraPosition(
          { x: x * distRatio, y: y * distRatio, z: z * distRatio },
          { x, y, z },
          1200
        );
      });

      // Hover Event
      graph.onNodeHover((node: GraphNode | null) => {
        if (containerRef.current) {
          containerRef.current.style.cursor = node ? 'pointer' : 'default';
        }
        setHoveredNode(node);
      });

      // Background Click - Reset View
      graph.onBackgroundClick(() => {
        setSelectedNode(null);
        graph?.cameraPosition({ x: 0, y: 0, z: 200 }, { x: 0, y: 0, z: 0 }, 1000);
      });

      // Set initial data
      graph.graphData(filteredData);

      // Enable OrbitControls native auto-rotation and damping to allow camera interaction/zoom out
      const controls = graph.controls() as any;
      if (controls) {
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.3;
      }

      // Core rotation loop for wireframe shells, background constellation grid, and pulse nodes
      let pulseTime = 0;
      const animateShells = () => {
        if (!graph) return;

        // Rotate star constellation background
        if (starPoints) {
          starPoints.rotation.y += 0.00018;
          starPoints.rotation.x += 0.00006;
        }

        pulseTime += 0.04;

        // Get camera distance to calculate dynamic text zoom scaling factor
        const camera = graph.camera();
        const camPos = camera.position;
        const currentDistance = Math.hypot(camPos.x, camPos.y, camPos.z);
        // Base distance is 200. As camera zooms out (distance increases), make text labels larger to keep them visible
        const zoomFactor = Math.max(1.0, currentDistance / 200);

        const data = graph.graphData();
        data.nodes.forEach((n: GraphNode) => {
          const obj = (n as any).__threeObj;
          if (obj && obj instanceof THREE.Group) {
            // Rotate outer wireframe category shell
            const shell = obj.getObjectByName('outer-shell');
            if (shell) {
              shell.rotation.x += 0.007;
              shell.rotation.y += 0.011;
            }

            // Pulse topic core node scaling
            if (n.type === 'topic') {
              const core = obj.getObjectByName('pulse-core');
              if (core) {
                const scaleVal = 1.0 + Math.sin(pulseTime + (n.x ?? 0)) * 0.16;
                core.scale.set(scaleVal, scaleVal, scaleVal);
              }
            }

            // Dynamically scale text label based on camera distance (zoom factor)
            const label = obj.getObjectByName('label-sprite');
            if (label && label.visible) {
              const isHoveredOrSelected = (hoveredNodeRef.current?.id === n.id) || (selectedNodeRef.current?.id === n.id);
              if (isHoveredOrSelected) {
                label.scale.set(28 * zoomFactor, 7 * zoomFactor, 1);
              } else {
                label.scale.set(22 * zoomFactor, 5.5 * zoomFactor, 1);
              }
            }
          }
        });
        requestAnimationFrame(animateShells);
      };
      animateShells();
    }

    initGraph();

    // Cleanup on unmount
    return () => {
      if (graph) {
        graph._destructor();
      }
      graphInstanceRef.current = null;
    };
  }, [loading]);

  // Sync graph data only when search or filters change (avoids simulation resets on click/hover)
  useEffect(() => {
    const graph = graphInstanceRef.current;
    if (!graph) return;
    graph.graphData(filteredData);
  }, [filteredData]);

  // Sync interactive highlighting styles (Hover, Selected/Focus Mode)
  useEffect(() => {
    const graph = graphInstanceRef.current;
    if (!graph || !dataPayload) return;

    const activeNode = hoveredNode || selectedNode;

    // Focus Mode for link properties
    graph
      .linkWidth((link: GraphLink) => {
        const isHighlighted = activeNode !== null && highlightLinks.has(link.id);
        return isHighlighted ? 1.4 : 0.45;
      })
      .linkOpacity((link: GraphLink) => {
        const isHighlighted = activeNode === null || highlightLinks.has(link.id);
        return isHighlighted ? 0.35 : 0.04; // Hard fade unrelated lines in focus mode
      })
      .linkColor((link: GraphLink) => {
        const isHighlighted = activeNode !== null && highlightLinks.has(link.id);
        if (isHighlighted) return withAlpha(link.style.color, 0.95);
        return 'rgba(148, 163, 184, 0.12)'; // Faint default lines
      })
      .linkDirectionalArrowLength((link: GraphLink) => {
        const isHighlighted = activeNode !== null && highlightLinks.has(link.id);
        return link.directional && isHighlighted ? 4.0 : 0;
      })
      .linkDirectionalArrowColor((link: GraphLink) => {
        const isHighlighted = activeNode !== null && highlightLinks.has(link.id);
        if (isHighlighted) return withAlpha(link.style.color, 0.95);
        return 'rgba(148, 163, 184, 0.1)';
      })
      .linkDirectionalParticles((link: GraphLink) => {
        // Flow speed particles ONLY on the highlighted connected neighborhood
        const isHighlighted = activeNode !== null && highlightLinks.has(link.id);
        return isHighlighted ? 4 : 0;
      })
      .linkDirectionalParticleWidth(() => 1.4);

    // Focus Mode & Label Sync for node objects
    filteredData.nodes.forEach((node) => {
      const obj = (node as any).__threeObj;
      if (!obj) return;

      const isHovered = hoveredNode?.id === node.id;
      const isSelected = selectedNode?.id === node.id;
      const isHighlighted = activeNode === null || highlightNodes.has(node.id);

      // Node scaling in focus mode
      const targetScale = isSelected ? 1.3 : (isHighlighted ? 1.0 : 0.4);
      const targetOpacity = isHighlighted ? 1.0 : 0.08; // Dim unselected completely

      obj.scale.set(targetScale, targetScale, targetScale);

      // Traverse children to apply opacity and emissions
      obj.traverse((child: any) => {
        if ((child.isMesh || child.isSprite) && child.material) {
          child.material.transparent = true;
          child.material.opacity = targetOpacity;

          // Boost emissive glow of focused cluster
          if (child.material.emissive) {
            child.material.emissiveIntensity = isHovered || isSelected ? 0.95 : (isHighlighted ? 0.5 : 0.1);
          }
        }
      });

      // Conditional Labels logic: only show for hovered node, selected node, or high degree landmark hubs
      const isHubNode = node.metrics && node.metrics.degree >= 3;
      const label = obj.getObjectByName('label-sprite');
      if (label) {
        if (isHovered || isSelected) {
          label.visible = true;
          label.scale.set(28, 7, 1);
        } else if (isHubNode && activeNode === null) {
          label.visible = true;
          label.scale.set(22, 5.5, 1);
        } else {
          label.visible = false;
        }
      }
    });

    graph.refresh();
  }, [filteredData, hoveredNode, selectedNode, highlightNodes, highlightLinks, dataPayload]);

  // Handle manual resizing of canvas
  useEffect(() => {
    function handleResize() {
      const graph = graphInstanceRef.current;
      if (graph && containerRef.current) {
        graph.width(containerRef.current.clientWidth);
        graph.height(containerRef.current.clientHeight);
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // State to toggle filters on mobile screens
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Helper to focus on a node from sidebar click
  const focusNode = (node: GraphNode) => {
    setSelectedNode(node);
    const graph = graphInstanceRef.current;
    if (!graph) return;

    const distance = 80;
    const x = node.x ?? 0;
    const y = node.y ?? 0;
    const z = node.z ?? 0;
    const distRatio = 1 + distance / Math.hypot(x, y, z);

    graph.cameraPosition(
      { x: x * distRatio, y: y * distRatio, z: z * distRatio },
      { x, y, z },
      1000
    );
  };

  // Prepare LaTeX math formula helper for react-markdown
  const prepareLatex = (text: string) => {
    if (typeof text !== 'string') return '';
    return text
      .replace(/\\\(([\s\S]*?)\\\)/g, '$$$1$$') // inline: \( ... \) to $...$
      .replace(/\\\[([\s\S]*?)\\\]/g, '$$$$$1$$$$'); // block: \[ ... \] to $$...$$
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full bg-[#08080f] text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin text-purple-500 mb-4" />
        <p className="text-sm font-medium tracking-wide">Initializing Neural Observatory...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full bg-[#08080f] text-slate-400 p-6 text-center">
        <Network className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-slate-100 mb-2">Failed to load Knowledge Graph</h3>
        <p className="max-w-md text-sm text-slate-500 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-500 transition-colors shadow-lg shadow-purple-600/20"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Determine if any filters are active
  const hasActiveFilters = 
    (dataPayload && filteredData.nodes.length !== dataPayload.stats.node_count) ||
    (dataPayload && filteredData.links.length !== dataPayload.stats.link_count);

  return (
    <div className="relative w-full h-full text-slate-200">
      {/* 3D WebGL Canvas */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Unified Left Sidebar Controls - Glassmorphism Observatory Panel */}
      <div className="absolute top-0 left-0 w-full sm:w-[350px] sm:max-h-[calc(100vh-48px)] z-10 pointer-events-auto sm:top-6 sm:left-6 flex flex-col gap-3 max-sm:bg-slate-950/90 max-sm:border-b max-sm:border-white/10 max-sm:shadow-sm">
        
        {/* Header & Search Card */}
        <div className="p-4 sm:rounded-2xl sm:bg-slate-950/45 sm:backdrop-blur-xl sm:border sm:border-white/10 sm:shadow-2xl flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div>
              <h1 className="text-sm font-bold tracking-tight text-slate-100 flex items-center gap-1.5">
                <Network className="w-4 h-4 text-purple-400" />
                <span>Learning Brain</span>
              </h1>
              <p className="text-[10px] text-slate-400">
                Ideas, systems, and artifacts connected
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] text-purple-300 bg-purple-950/30 border border-purple-500/30 px-1.5 py-0.5 rounded-full font-mono font-medium">
                V1.0
              </span>
              {/* Mobile Filter Toggle Button */}
              <button 
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                className="sm:hidden p-1 rounded-md hover:bg-slate-900 text-slate-400 border border-white/5"
              >
                <Layers className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Introduction Card */}
          <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5 text-[11px] text-slate-400 leading-relaxed">
            This space represents knowledge accumulated since <strong>2025</strong>. It serves as a living document of systems, ideas, and projects, and will be continuously updated over time.
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search ideas, tools, projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-1.5 text-xs text-slate-100 bg-slate-900/60 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/80 placeholder-slate-500 transition-all text-slate-100"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-500 hover:text-slate-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Render Stats */}
          {dataPayload && (
            <div className="flex justify-between items-center text-[10px] text-slate-400/85 pt-0.5 font-medium">
              <span>
                {hasActiveFilters 
                  ? `${filteredData.nodes.length} of ${dataPayload.stats.node_count} nodes` 
                  : `${dataPayload.stats.node_count} nodes`
                }
              </span>
              <span>
                {hasActiveFilters 
                  ? `${filteredData.links.length} of ${dataPayload.stats.link_count} links` 
                  : `${dataPayload.stats.link_count} links`
                }
              </span>
            </div>
          )}
        </div>

        {/* Floating Filters Controls - Collapsed on mobile unless toggled */}
        <div className={`p-4 sm:rounded-2xl sm:bg-slate-950/45 sm:backdrop-blur-xl sm:border sm:border-white/10 sm:shadow-2xl flex flex-col gap-3 max-sm:px-6 max-sm:pb-6 ${showFiltersMobile ? 'flex' : 'max-sm:hidden'}`}>
          <h3 className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>Graph Layers</span>
          </h3>

          {/* Node Type Filters */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">Node Types</span>
            <div className="flex flex-wrap gap-1.5">
              {dataPayload?.filters.node_types.map((nodeType: NodeFilterOption) => {
                const isActive = activeNodeTypes.has(nodeType.type);
                return (
                  <button
                    key={nodeType.type}
                    onClick={() => {
                      const newSet = new Set(activeNodeTypes);
                      if (isActive) {
                        if (newSet.size > 1) newSet.delete(nodeType.type);
                      } else {
                        newSet.add(nodeType.type);
                      }
                      setActiveNodeTypes(newSet);
                    }}
                    style={{
                      borderColor: isActive ? nodeType.color + '60' : 'rgba(255, 255, 255, 0.08)',
                      backgroundColor: isActive ? nodeType.color + '22' : 'transparent',
                      color: isActive ? nodeType.color : '#94a3b8',
                    }}
                    className="flex items-center gap-1.5 text-[10px] border rounded-full px-2.5 py-0.5 font-medium cursor-pointer transition-all hover:scale-[1.03]"
                  >
                    <span 
                      style={{ backgroundColor: nodeType.color }}
                      className="w-1.5 h-1.5 rounded-full" 
                    />
                    <span className="capitalize">{nodeType.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Link Type Filters */}
          <div className="flex flex-col gap-1.5 border-t border-white/10 pt-2.5">
            <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">Connection Types</span>
            <div className="flex flex-wrap gap-1.5">
              {dataPayload?.filters.link_types.map((linkType: LinkFilterOption) => {
                const isActive = activeLinkTypes.has(linkType.type);
                return (
                  <button
                    key={linkType.type}
                    onClick={() => {
                      const newSet = new Set(activeLinkTypes);
                      if (isActive) {
                        if (newSet.size > 1) newSet.delete(linkType.type);
                      } else {
                        newSet.add(linkType.type);
                      }
                      setActiveLinkTypes(newSet);
                    }}
                    style={{
                      borderColor: isActive ? linkType.color + '60' : 'rgba(255, 255, 255, 0.08)',
                      backgroundColor: isActive ? linkType.color + '22' : 'transparent',
                      color: isActive ? linkType.color : '#94a3b8',
                    }}
                    className="flex items-center gap-1.5 text-[10px] border rounded-full px-2.5 py-0.5 font-medium cursor-pointer transition-all hover:scale-[1.03]"
                  >
                    <span 
                      style={{ backgroundColor: linkType.color }}
                      className="w-1.5 h-1.5 rounded-full" 
                    />
                    <span>{linkType.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Instructions/Help */}
      <div className="absolute bottom-6 right-6 z-10 pointer-events-auto max-sm:hidden">
        <div className="p-3 rounded-lg bg-slate-950/45 border border-white/10 backdrop-blur-md shadow-sm text-[10px] text-slate-400 flex flex-col gap-1 max-w-[200px]">
          <span className="font-semibold text-slate-200 flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-purple-400" />
            <span>Navigation</span>
          </span>
          <span>• Left-click + drag to rotate</span>
          <span>• Scroll to zoom in / out</span>
          <span>• Right-click + drag to pan</span>
          <span>• Click empty space to reset</span>
        </div>
      </div>

      {/* Right Side Info Detail Panel */}
      {/* Right Side Info Detail Panel */}
      <div 
        className={`absolute inset-y-0 right-0 w-full sm:w-[500px] bg-slate-950/65 border-l border-white/10 shadow-2xl z-30 flex flex-col overflow-hidden text-slate-200 backdrop-blur-2xl h-[calc(100vh-200px)] transition-transform duration-300 ease-in-out pointer-events-auto ${
          selectedNode ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {selectedNode && (
          <>
            {/* Header */}
            <div className="shrink-0 px-8 py-7 border-b border-white/5 flex items-start justify-between gap-6">
              <div className="min-w-0 flex-1">
                <span 
                  style={{
                    color: selectedNode.style.color,
                    borderColor: selectedNode.style.color + '40',
                    backgroundColor: selectedNode.style.color + '15',
                  }}
                  className="text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-semibold border"
                >
                  {selectedNode.type}
                </span>
                <h2 className="text-xl font-extrabold tracking-tight text-slate-50 mt-2">
                  {selectedNode.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1.5 rounded-full bg-slate-900/60 hover:bg-slate-800/80 text-slate-400 hover:text-slate-200 transition-all cursor-pointer border border-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 min-h-0 overflow-y-auto px-8 py-7 space-y-7 scrollbar-thin scrollbar-thumb-slate-800">
              
              {/* Badges / Metrics Row (shown only if values exist) */}
              {(selectedNode.depth || selectedNode.kind || (selectedNode.metrics && selectedNode.metrics.degree !== undefined)) && (
                <div className="grid grid-cols-3 gap-4 p-4 bg-slate-900/30 rounded-xl border border-white/5">
                  {selectedNode.depth ? (
                    <div className="text-center border-r border-white/10 px-2">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Depth</span>
                      <span className="text-xs font-semibold capitalize text-slate-200">{selectedNode.depth}</span>
                    </div>
                  ) : <div />}
                  {selectedNode.kind ? (
                    <div className="text-center border-r border-white/10 px-2">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Kind</span>
                      <span className="text-xs font-semibold capitalize text-slate-200">{selectedNode.kind}</span>
                    </div>
                  ) : <div />}
                  {selectedNode.metrics && selectedNode.metrics.degree !== undefined ? (
                    <div className="text-center px-2">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Connections</span>
                      <span className="text-xs font-semibold text-slate-200">{selectedNode.metrics.degree}</span>
                    </div>
                  ) : <div />}
                </div>
              )}

              {/* Summary */}
              {selectedNode.summary && (
                <div className="space-y-2 border-l-2 border-purple-500/50 pl-4 py-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Summary</span>
                  <p className="text-sm text-slate-300 italic leading-relaxed">
                    {selectedNode.summary}
                  </p>
                </div>
              )}

              {/* Rich Body Markdown */}
              {selectedNode.body_md && (
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Note / Writeup</span>
                  <div className="prose prose-sm max-w-none text-sm text-slate-300 leading-relaxed space-y-3 prose-headings:text-slate-100 prose-a:text-purple-400 prose-code:text-purple-300 prose-code:bg-purple-950/40 prose-code:border prose-code:border-purple-850/20 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-strong:text-slate-50">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm, remarkMath]} 
                      rehypePlugins={[rehypeKatex]}
                    >
                      {prepareLatex(selectedNode.body_md)}
                    </ReactMarkdown>
                  </div>
                </div>
              )}

              {/* Connected Neighbors list */}
              {selectedNodeNeighbors.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-white/5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Graph Connections</span>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {selectedNodeNeighbors.map(({ node, verb, linkType }, index) => {
                      const color = dataPayload?.filters.link_types.find(t => t.type === linkType)?.color || '#64748b';
                      return (
                        <button
                          key={`${node.id}-${index}`}
                          onClick={() => focusNode(node)}
                          className="w-full flex items-center justify-between gap-3 p-3 rounded-lg bg-slate-900/30 border border-white/5 hover:bg-slate-800/40 hover:border-purple-500/40 transition-all text-left group cursor-pointer shadow-sm"
                        >
                          <div className="min-w-0 flex items-center gap-2">
                            <span 
                              style={{ backgroundColor: color }}
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            />
                            <div className="min-w-0 text-xs leading-snug">
                              <span className="block text-slate-500 font-medium truncate">{verb}</span>
                              <span className="block text-slate-200 font-bold group-hover:text-purple-400 transition-colors truncate">
                                {node.title}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 transition-all group-hover:translate-x-0.5" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Actions */}
              {selectedNode.actions && selectedNode.actions.length > 0 && (
                <div className="grid gap-3 sm:grid-cols-2 pt-2">
                  {selectedNode.actions.map((action, idx) => {
                    if (action.type === 'source' && action.url) {
                      return (
                        <a
                          key={idx}
                          href={action.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full min-h-14 px-4 rounded-lg bg-purple-600/80 hover:bg-purple-500/80 text-white font-semibold text-sm shadow-md shadow-purple-600/10 hover:shadow-purple-600/20 transition-all border border-purple-500/30 text-center"
                        >
                          <span>{action.label}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      );
                    }
                    
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          if (action.type === 'focus') {
                            focusNode(selectedNode);
                          }
                        }}
                        className="w-full min-h-14 px-4 rounded-lg bg-slate-900/40 hover:bg-slate-800/50 border border-white/10 text-slate-200 font-semibold text-sm transition-all cursor-pointer shadow-sm"
                      >
                        {action.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
