import { Inbox } from "lucide-react";

export default function EmptyState({ title = "Rien pour le moment", description, icon: Icon = Inbox }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 bg-white/60 p-10 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-black/5 text-black/40">
        <Icon size={22} />
      </div>
      <p className="font-semibold text-encre">{title}</p>
      {description && <p className="mt-1 text-sm text-black/50">{description}</p>}
    </div>
  );
}