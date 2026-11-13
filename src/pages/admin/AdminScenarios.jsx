import { useEffect, useState } from "react";
import { Plus, Compass, Pencil, Trash2 } from "lucide-react";
import { mockApi } from "../../services/mockApi";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import SectionTitle from "../../components/common/SectionTitle";
import Modal from "../../components/common/Modal";

export default function AdminScenarios() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const [form, setForm] = useState({ titre: "", description: "", niveau: "Débutant", dureeMin: 10 });

  useEffect(() => {
    mockApi.getScenarios().then(setItems);
  }, []);

  const openCreate = () => {
    setCurrent(null);
    setForm({ titre: "", description: "", niveau: "Débutant", dureeMin: 10 });
    setOpen(true);
  };

  const openEdit = (s) => {
    setCurrent(s);
    setForm({ titre: s.titre, description: s.description, niveau: s.niveau, dureeMin: s.dureeMin });
    setOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (current) {
      setItems((prev) => prev.map((s) => (s.id === current.id ? { ...s, ...form } : s)));
    } else {
      setItems((prev) => [
        {
          id: `s${Date.now()}`,
          ...form,
          statut: "disponible",
          etapes: 3,
        },
        ...prev,
      ]);
    }
    setOpen(false);
  };

  const handleDelete = (id) => setItems((prev) => prev.filter((s) => s.id !== id));

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Scénarios interactifs"
        subtitle="Gérez les scénarios proposés aux enfants"
        action={
          <Button onClick={openCreate}>
            <Plus size={16} /> Nouveau scénario
          </Button>
        }
      />

      <div className="grid gap-3">
        {items.map((s) => (
          <Card key={s.id} className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-jaune/25 text-yellow-800">
                <Compass size={18} />
              </div>
              <div>
                <p className="font-semibold text-encre">{s.titre}</p>
                <p className="text-xs text-black/50">{s.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge couleur="jaune">{s.niveau}</Badge>
              <Badge couleur="gris">{s.dureeMin} min</Badge>
              <Button size="sm" variant="outline" onClick={() => openEdit(s)}>
                <Pencil size={14} />
              </Button>
              <Button size="sm" variant="corail" onClick={() => handleDelete(s.id)}>
                <Trash2 size={14} />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={current ? "Modifier le scénario" : "Nouveau scénario"}
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
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-semibold text-encre">Niveau</label>
              <select
                value={form.niveau}
                onChange={(e) => setForm({ ...form, niveau: e.target.value })}
                className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm focus:border-violet focus:outline-none"
              >
                <option>Débutant</option>
                <option>Intermédiaire</option>
                <option>Avancé</option>
              </select>
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