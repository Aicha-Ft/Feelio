import { useEffect, useState } from "react";
import { Plus, ClipboardList, Pencil, Trash2 } from "lucide-react";
import { mockApi } from "../../services/mockApi";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import SectionTitle from "../../components/common/SectionTitle";
import Modal from "../../components/common/Modal";

export default function AdminQuestionnaires() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const [form, setForm] = useState({ titre: "", description: "" });

  useEffect(() => {
    mockApi.getQuestionnaires().then(setItems);
  }, []);

  const openCreate = () => {
    setCurrent(null);
    setForm({ titre: "", description: "" });
    setOpen(true);
  };

  const openEdit = (q) => {
    setCurrent(q);
    setForm({ titre: q.titre, description: q.description });
    setOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (current) {
      setItems((prev) => prev.map((q) => (q.id === current.id ? { ...q, ...form } : q)));
    } else {
      const nouveau = {
        id: `q${Date.now()}`,
        titre: form.titre,
        description: form.description,
        public: "enfant",
        dureeMin: 5,
        statut: "disponible",
        questions: [],
      };
      setItems((prev) => [nouveau, ...prev]);
    }
    setOpen(false);
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Questionnaires"
        subtitle="Gérez les questionnaires émotionnels"
        action={
          <Button onClick={openCreate}>
            <Plus size={16} /> Nouveau questionnaire
          </Button>
        }
      />

      <div className="grid gap-3">
        {items.map((q) => (
          <Card key={q.id} className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet/15 text-violet-dark">
                <ClipboardList size={18} />
              </div>
              <div>
                <p className="font-semibold text-encre">{q.titre}</p>
                <p className="text-xs text-black/50">{q.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge couleur="violet">{q.dureeMin} min</Badge>
              <Badge couleur={q.statut === "disponible" ? "turquoise" : "jaune"}>{q.statut}</Badge>
              <Button size="sm" variant="outline" onClick={() => openEdit(q)}>
                <Pencil size={14} />
              </Button>
              <Button size="sm" variant="corail" onClick={() => handleDelete(q.id)}>
                <Trash2 size={14} />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={current ? "Modifier le questionnaire" : "Nouveau questionnaire"}
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
        </form>
      </Modal>
    </div>
  );
}