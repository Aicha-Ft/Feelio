const variants = {
  primary: "bg-turquoise text-white hover:bg-turquoise-dark shadow-sm",
  secondary: "bg-violet text-white hover:bg-violet-dark shadow-sm",
  jaune: "bg-jaune text-encre hover:brightness-95 shadow-sm",
  corail: "bg-corail text-white hover:brightness-95 shadow-sm",
  ghost: "bg-transparent text-encre hover:bg-black/5",
  outline: "border border-black/10 bg-white text-encre hover:bg-black/5",
};

const tailles = {
  sm: "text-sm px-3 py-1.5 rounded-lg",
  md: "text-sm px-4 py-2.5 rounded-xl",
  lg: "text-base px-5 py-3 rounded-xl",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  as: Tag = "button",
  ...props
}) {
  return (
    <Tag
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${variants[variant] || variants.primary} ${tailles[size] || tailles.md} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}