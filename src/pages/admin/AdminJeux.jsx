import { useEffect, useState } from "react";
import { Plus, Gamepad2, Pencil, Trash2 } from "lucide-react";
import { mockApi } from "../../services/mockApi";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import SectionTitle from "../../components/common/SectionTitle";
import Modal from "../../components/common/Modal";

export default function AdminJeux() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const [form, setForm] = useState({ titre: "", description: "", niveau: "Facile", points: 20, dureeMin: 5 });

  useEffect(() => {
    mockApi.getJeux().then(setItems);
  }, []);

  const openCreate = () => {
    setCurrent(null);
    setForm({ titre: "", description: "", niveau: "Facile", points: 20, dureeMin: 5 });
    setOpen(true);
  };

  const openEdit = (j) => {
    setCurrent(j);
    setForm({ titre: j.titre, description: j.description, niveau: j.niveau, points: j.points, dureeMin: j.dureeMin });
    setOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (current) {
      setItems((prev) => prev.map((j) => (j.id === current.id ? { ...j, ...form } : j)));
    } else {
      setItems((prev) => [{ id: `j${Date.now()}`, ...form, statut: "disponible" }, ...prev]);
    }
    setOpen(false);
  };

  const handleDelete = (id) => setItems((prev) => prev.filter((j) => j.id !== id));

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Mini-jeux éducatifs"
        subtitle="Gérez les mini-jeux proposés aux enfants"
        action={
          <Button onClick={openCreate}>
            <Plus size={16} /> Nouveau mini-jeu
          </Button>
        }
      />

      <div className="grid gap-3 md:grid-cols-2">
        {items.map((j) => (
          <Card key={j.id}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-corail/20 text-red-700">
                  <Gamepad2 size={18} />
                </div>
                <div>
                  <p className="font-semibold text-encre">{j.titre}</p>
                  <p className="text-xs text-black/50">{j.description}</p>
                </div>
              </div>
              <Badge couleur="corail">{j.niveau}</Badge>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex gap-2">
                <Badge couleur="jaune">{j.points} pts</Badge>
                <Badge couleur="gris">{j.dureeMin} min</Badge>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="outline" onClick={() => openEdit(j)}>
                  <Pencil size={14} />
                </Button>
                <Button size="sm" variant="corail" onClick={() => handleDelete(j.id)}>
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={current ? "Modifier le mini-jeu" : "Nouveau mini-jeu"}
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
            <label className="mb-1 block text-sm font-semibold text-encre">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm focus:border-violet focus:outline-none"
              rows={2}
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="mb-1 block text-sm font-semibold text-encre">Niveau</label>
              <select
                value={form.niveau}
                onChange={(e) => setForm({ ...form, niveau: e.target.value })}
                className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm focus:border-violet focus:outline-none"
              >
                <option>Facile</option>
                <option>Moyen</option>
                <option>Difficile</option>
              </select>
            </div>
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
              <label className="mb-1 block text-sm font-semibold text-encre">Durée (min)</label>
              <input
                type="number"
                value={form.dureeMin}
                onChange={(e) => setForm({ ...form, dureeMin: Number(e.target.value) })}
                className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm focus:border-violet focus:outline-none"
                min={1}
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}