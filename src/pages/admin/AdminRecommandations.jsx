import { useEffect, useState } from "react";
import { Plus, Lightbulb, Pencil, Trash2 } from "lucide-react";
import { mockApi } from "../../services/mockApi";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import SectionTitle from "../../components/common/SectionTitle";
import Modal from "../../components/common/Modal";

const priorites = {
  haute: { label: "Haute", couleur: "corail" },
  moyenne: { label: "Moyenne", couleur: "jaune" },
  basse: { label: "Basse", couleur: "turquoise" },
};

export default function AdminRecommandations() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const [form, setForm] = useState({ titre: "", contenu: "", priorite: "moyenne" });

  useEffect(() => {
    mockApi.getRecommandations().then(setItems);
  }, []);

  const openCreate = () => {
    setCurrent(null);
    setForm({ titre: "", contenu: "", priorite: "moyenne" });
    setOpen(true);
  };

  const openEdit = (r) => {
    setCurrent(r);
    setForm({ titre: r.titre, contenu: r.contenu, priorite: r.priorite });
    setOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (current) {
      setItems((prev) => prev.map((r) => (r.id === current.id ? { ...r, ...form } : r)));
    } else {
      setItems((prev) => [{ id: `rc${Date.now()}`, ...form, enfantId: "e1" }, ...prev]);
    }
    setOpen(false);
  };

  const handleDelete = (id) => setItems((prev) => prev.filter((r) => r.id !== id));

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Recommandations"
        subtitle="Gérez les conseils personnalisés affichés aux parents"
        action={
          <Button onClick={openCreate}>
            <Plus size={16} /> Nouvelle recommandation
          </Button>
        }
      />

      <div className="grid gap-3">
        {items.map((r) => {
          const p = priorites[r.priorite] || priorites.basse;
          return (
            <Card key={r.id} className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-jaune/25 text-yellow-800">
                  <Lightbulb size={18} />
                </div>
                <div>
                  <p className="font-semibold text-encre">{r.titre}</p>
                  <p className="text-xs text-black/50">{r.contenu}</p>
                  <div className="mt-1.5">
                    <Badge couleur={p.couleur}>{p.label}</Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="outline" onClick={() => openEdit(r)}>
                  <Pencil size={14} />
                </Button>
                <Button size="sm" variant="corail" onClick={() => handleDelete(r.id)}>
                  <Trash2 size={14} />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={current ? "Modifier la recommandation" : "Nouvelle recommandation"}
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
            <Button onClick={handleSave}>Enregistrer</Button>
          </>
        }
      >
        <form onSubmit={handleSave} className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-semibold text-encre">Titre</label>
            <input
              value={form.titre}
              onChange={(e) => setForm({ ...form, titre: e.target.value })}
              className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm focus:border-violet focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-encre">Contenu</label>
            <textarea
              value={form.contenu}
              onChange={(e) => setForm({ ...form, contenu: e.target.value })}
              className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm focus:border-violet focus:outline-none"
              rows={3}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-encre">Priorité</label>
            <select
              value={form.priorite}
              onChange={(e) => setForm({ ...form, priorite: e.target.value })}
              className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm focus:border-violet focus:outline-none"
            >
              <option value="haute">Haute</option>
              <option value="moyenne">Moyenne</option>
              <option value="basse">Basse</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
}