export default function ExpertiseGroup({ title, items }) {
  return (
    <div className="expertise-group">
      <div className="expertise-group-title font-label text-faint">{title}</div>
      <div className="expertise-item-grid">
        {items.map((item) => (
          <div key={item} className="expertise-item-block">
            <span className="expertise-item-dot" aria-hidden="true" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
