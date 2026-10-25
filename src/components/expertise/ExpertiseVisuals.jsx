import { Globe, Braces, Workflow, FileJson, Send, Layers, PanelTop, SlidersHorizontal, LayoutList, MousePointer2, Zap, Bell, CircleDot, Check, ShieldCheck, FolderOpen, Cog, Gauge, Accessibility, FlaskConical, ScanEye, ArrowRight, ArrowDown, Search } from "lucide-react";

function Concept({ node, Icon, controlProps, children, className = "" }) {
  return <button {...controlProps(node)} className={`expertise-concept ${className}`}>
    <span className="expertise-concept-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.5} /></span>
    <span>{node.label}</span><Check className="expertise-selected-mark" size={13} aria-hidden="true" />{children}
  </button>;
}

function Pipeline({ nodes, activeId, controlProps }) {
  const icons = [Globe, Braces, Workflow, FileJson, Send];
  return <div className="expertise-pipeline">
    <div className="expertise-visual-note">Interface → server → interface</div>
    <ol>{nodes.map((node, i) => <li key={node.id} data-active={activeId === node.id}>
      <span className="pipeline-stage-number" aria-hidden="true">0{i + 1}</span>
      <Concept node={node} Icon={icons[i]} controlProps={controlProps} className={`pipeline-stage pipeline-stage-${node.id}`} />
      {i < nodes.length - 1 && <ArrowRight className="pipeline-arrow" size={18} aria-hidden="true" />}
    </li>)}</ol>
    <div className="pipeline-boundaries" aria-hidden="true"><span>Browser</span><span>Application</span><span>Browser</span></div>
  </div>;
}

function Blueprint({ nodes, activeId, controlProps }) {
  const get = id => nodes.find(node => node.id === id);
  return <div className="expertise-blueprint" data-selected={activeId}>
    <div className="blueprint-state"><Concept node={get("app")} Icon={Layers} controlProps={controlProps} /><span className="expertise-visual-note">Shared state connects the interface</span></div>
    <div className="blueprint-state-lines" aria-hidden="true"><span /><span /><span /></div>
    <div className="blueprint-window">
      <div className="preview-window-bar" aria-hidden="true"><i /><i /><i /><span>APPLICATION BLUEPRINT</span></div>
      <Concept node={get("header")} Icon={PanelTop} controlProps={controlProps} className="blueprint-header"><span className="blueprint-nav-lines" aria-hidden="true"><i /><i /><i /></span></Concept>
      <div className="blueprint-body">
        <Concept node={get("filters")} Icon={SlidersHorizontal} controlProps={controlProps} className="blueprint-filters"><span className="blueprint-field-lines" aria-hidden="true"><i /><i /><i /></span></Concept>
        <Concept node={get("results")} Icon={LayoutList} controlProps={controlProps} className="blueprint-results"><span className="blueprint-result-grid" aria-hidden="true">{[1, 2, 3].map(n => <span key={n}><img src="/images/projects/haven-480.webp" alt="" /><i /><i /></span>)}</span></Concept>
      </div>
    </div>
  </div>;
}

function ExperiencePreview({ nodes, activeId, controlProps }) {
  const icons = { input: MousePointer2, state: CircleDot, feedback: Bell, transition: Zap };
  const loading = activeId === "transition";
  const feedback = activeId === "feedback";
  return <div className="expertise-experience">
    <div className="expertise-concept-rail" role="group" aria-label="Interaction concepts">{nodes.map((node, i) => <Concept key={node.id} node={node} Icon={icons[node.id]} controlProps={controlProps} />)}</div>
    <div className={`experience-window experience-${activeId}`}>
      <div className="experience-brand"><strong>HAVEN</strong><span>Interaction study</span></div>
      <div className="experience-search" aria-hidden="true"><Search size={17} /><span>{activeId === "input" ? "Search by city or keyword…" : "Homes in San Francisco"}</span><span className="experience-search-action">Search</span></div>
      <div className="experience-status"><span className="experience-status-dot" />{loading ? "Searching · loading state" : feedback ? "Search complete · results ready" : activeId === "state" ? "Applied criteria · results view" : "Draft input · ready to search"}</div>
      <div className="experience-results" aria-hidden="true">
        {loading ? <div className="experience-skeleton"><span /><span /><span /></div> : <><img src="/images/projects/haven-480.webp" alt="" /><div><span className="experience-result-label">{feedback ? "Results available" : "Listing results"}</span><strong>{activeId === "state" ? "Criteria applied" : "Find a place to call home"}</strong><span className="experience-result-rule" /><small>Search · refine · explore</small></div></>}
      </div>
      <p className="experience-preview-caption">Illustrative preview — no live search</p>
    </div>
  </div>;
}

const REQUEST_STAGES = [
  { id: "validate", Icon: ShieldCheck, detail: "Check the API contract", boundary: "Incoming request" },
  { id: "process", Icon: Cog, detail: "Filter, rank, and paginate", boundary: "Application logic" },
  { id: "load", Icon: FolderOpen, detail: "Read the listing source", boundary: "Data access" },
  { id: "respond", Icon: Send, detail: "Return structured results", boundary: "Outgoing response" },
];
function RequestFlow({ nodes, activeId, controlProps }) {
  return <div className="expertise-request"><div className="expertise-visual-note">Request lifecycle · responsibilities</div>
    <ol>{REQUEST_STAGES.map(({ id, Icon, detail, boundary }, i) => <li key={id} data-active={activeId === id}>
      <span className="request-boundary">{boundary}</span><Concept node={nodes.find(n => n.id === id)} Icon={Icon} controlProps={controlProps} /><span className="request-stage-detail">{detail}</span>
      {i < REQUEST_STAGES.length - 1 && <ArrowDown className="request-flow-arrow" size={17} aria-hidden="true" />}
    </li>)}</ol><p className="request-flow-footnote">A responsibility map; data may already be loaded at startup.</p>
  </div>;
}

const QUALITY = {
  measure: { title: "Performance", Icon: Gauge, focus: "Observe before optimizing", items: ["Inspect loading and rendering", "Review image and asset sizes", "Compare before and after changes"] },
  access: { title: "Accessibility", Icon: Accessibility, focus: "Make the interface operable", items: ["Follow the keyboard journey", "Check labels, focus, and contrast", "Respect motion preferences"] },
  test: { title: "Testing", Icon: FlaskConical, focus: "Check behavior and edge cases", items: ["Verify filters and request states", "Cover empty and error responses", "Recheck important user journeys"] },
  review: { title: "Maintainability", Icon: ScanEye, focus: "Keep changes understandable", items: ["Keep responsibilities focused", "Review reusable components", "Document behavior and decisions"] },
};
function QualityPanel({ nodes, activeId, controlProps }) {
  const selected = QUALITY[activeId];
  return <div className="expertise-quality">
    <div className="quality-panel-heading"><span>ENGINEERING REVIEW</span><span>Illustrative workflow</span></div>
    <div className="quality-panel-body"><div className="expertise-concept-rail" role="group" aria-label="Quality practices">{nodes.map(node => <Concept key={node.id} node={{ ...node, label: QUALITY[node.id].title }} Icon={QUALITY[node.id].Icon} controlProps={controlProps} />)}</div>
      <div className="quality-review" key={activeId}><span className="expertise-visual-note">Review focus</span><h3>{selected.focus}</h3><ul>{selected.items.map(item => <li key={item}><span aria-hidden="true" />{item}</li>)}</ul><p>Review prompts, not measured results.</p></div>
    </div>
  </div>;
}

export const EXPERTISE_VISUALS = { "application-flow": Pipeline, "component-tree": Blueprint, "interaction-flow": ExperiencePreview, "request-flow": RequestFlow, "quality-flow": QualityPanel };
