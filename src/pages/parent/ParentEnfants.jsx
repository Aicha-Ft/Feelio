import { useState } from "react";
import { Plus, UserPlus } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { enfants } from "../../data/enfants";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Avatar from "../../components/common/Avatar";
import Badge from "../../components/common/Badge";
import ProgressBar from "../../components/common/ProgressBar";
import Modal from "../../components/common/Modal";
import SectionTitle from "../../components/common/SectionTitle";

export default function ParentEnfants() {
  const { utilisateur } = useAuth();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ prenom: "", age: "" });

  const mesEnfants = enfants.filter((e) => utilisateur?.enfants?.includes(e.id));

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    setForm({ prenom: "", age: "" });
  };

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Mes enfants"
        subtitle="Gérez les profils de vos enfants"
        action={
          <Button onClick={() => setOpen(true)}>
            <Plus size={16} /> Ajouter un enfant
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2">
        {mesEnfants.map((enfant) => (
          <Card key={enfant.id} hover>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar nom={enfant.prenom} couleur={enfant.couleur} size="lg" />
                <div>
                  <p className="text-base font-bold text-encre">
                    {enfant.prenom} {enfant.nom}
                  </p>
                  <p className="text-sm text-black/50">{enfant.age} ans</p>
                </div>
              </div>
              <Badge couleur={enfant.couleur}>Niveau {enfant.niveau}</Badge>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-xl bg-black/[0.03] px-3 py-2">
                <p className="text-xs text-black/50">Points</p>
                <p className="font-bold text-encre">{enfant.points}</p>
              </div>
              <div className="rounded-xl bg-black/[0.03] px-3 py-2">
                <p className="text-xs text-black/50">Badges</p>
                <p className="font-bold text-encre">{enfant.badges.length}</p>
              </div>
            </div>
            <div className="mt-4">
              <ProgressBar value={enfant.progression} couleur={enfant.couleur} label="Progression globale" />
            </div>
          </Card>
        ))}

        <button
          onClick={() => setOpen(true)}
          className="flex min-h-[180px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-black/10 bg-white/50 text-black/40 transition hover:border-turquoise hover:text-turquoise-dark"
        >
          <UserPlus size={28} />
          <span className="text-sm font-semibold">Ajouter un enfant</span>
        </button>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Ajouter un enfant"
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
            <Button onClick={handleSubmit}>Enregistrer</Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-semibold text-encre">Prénom</label>
            <input
              value={form.prenom}
              onChange={(e) => setForm({ ...form, prenom: e.target.value })}
              className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm focus:border-turquoise focus:outline-none"
              placeholder="Prénom de l'enfant"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-encre">Âge</label>
            <input
              type="number"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm focus:border-turquoise focus:outline-none"
              placeholder="6 à 12"
              min="6"
              max="12"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}