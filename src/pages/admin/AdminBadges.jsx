import { useEffect, useState } from "react";
import { Plus, Award, Pencil, Trash2 } from "lucide-react";
import { mockApi } from "../../services/mockApi";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import SectionTitle from "../../components/common/SectionTitle";
import Modal from "../../components/common/Modal";

const couleurs = ["turquoise", "violet", "jaune", "corail"];

export default function AdminBadges() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const [form, setForm] = useState({ nom: "", description: "", points: 10, couleur: "turquoise" });

  useEffect(() => {
    mockApi.getBadges().then(setItems);
  }, []);

  const openCreate = () => {
    setCurrent(null);
    setForm({ nom: "", description: "", points: 10, couleur: "turquoise" });
    setOpen(true);
  };

  const openEdit = (b) => {
    setCurrent(b);
    setForm({ nom: b.nom, description: b.description, points: b.points, couleur: b.couleur });
    setOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (current) {
      setItems((prev) => prev.map((b) => (b.id === current.id ? { ...b, ...form } : b)));
    } else {
      setItems((prev) => [{ id: `b${Date.now()}`, ...form }, ...prev]);
    }
    setOpen(false);
  };

  const handleDelete = (id) => setItems((prev) => prev.filter((b) => b.id !== id));

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Badges"
        subtitle="Gérez les récompenses obtenues par les enfants"
        action={
          <Button onClick={openCreate}>
            <Plus size={16} /> Nouveau badge
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((b) => (
          <Card key={b.id} hover>
            <div className="flex items-start gap-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-${b.couleur}/15`}>
                <Award size={22} className={`text-${b.couleur}-dark`} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-encre">{b.nom}</p>
                <p className="text-xs text-black/50">{b.description}</p>
                <div className="mt-2 flex items-center gap-1.5">
                  <Badge couleur={b.couleur}>{b.points} pts</Badge>
                </div>
              </div>
            </div>
            <div className="mt-3 flex justify-end gap-1">
              <Button size="sm" variant="outline" onClick={() => openEdit(b)}>
                <Pencil size={14} />
              </Button>
              <Button size="sm" variant="corail" onClick={() => handleDelete(b.id)}>
                <Trash2 size={14} />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={current ? "Modifier le badge" : "Nouveau badge"}
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
            <Button onClick={handleSave}>Enregistrer</Button>
          </>
        }
      >
        <form onSubmit={handleSave} className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-semibold text-encre">Nom</label>
            <input
              value={form.nom}
              onChange={(e) => setForm({ ...form, nom: e.target.value })}
              className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm focus:border-violet focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-encre">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm focus:border-violet focus:outline-none"
              rows={2}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-semibold text-encre">Points</label>
              <input
                type="number"
                value={form.points}
                onChange={(e) => setForm({ ...form, points: Number(e.target.value) })}
                className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm focus:border-violet focus:outline-none"
                min={0}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-encre">Couleur</label>
              <select
                value={form.couleur}
                onChange={(e) => setForm({ ...form, couleur: e.target.value })}
                className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm focus:border-violet focus:outline-none"
              >
                {couleurs.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}