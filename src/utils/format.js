export function initials(nom = "") {
  return nom
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((m) => m[0].toUpperCase())
    .join("");
}

export function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function formatDateCourt(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatNombre(n) {
  if (typeof n !== "number") return n;
  return new Intl.NumberFormat("fr-FR").format(n);
}

export function formatPourcentage(n) {
  if (typeof n !== "number") return n;
  return `${Math.round(n)} %`;
}