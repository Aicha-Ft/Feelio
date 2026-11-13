export default function Card({ children, className = "", hover = false, ...props }) {
  return (
    <div
      className={`rounded-2xl bg-white border border-black/5 shadow-sm p-5 ${
        hover ? "transition-shadow hover:shadow-md" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}