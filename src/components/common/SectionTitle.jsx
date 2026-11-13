export default function SectionTitle({ title, subtitle, action }) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="text-lg font-bold text-encre">{title}</h2>
        {subtitle && <p className="text-sm text-black/50">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}