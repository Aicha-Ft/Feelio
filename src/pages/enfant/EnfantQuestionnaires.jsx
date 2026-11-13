import { useEffect, useState } from "react";
import { Heart, CheckCircle2 } from "lucide-react";
import { mockApi } from "../../services/mockApi";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import SectionTitle from "../../components/common/SectionTitle";
import Modal from "../../components/common/Modal";

export default function EnfantQuestionnaires() {
  const [items, setItems] = useState([]);
  const [actif, setActif] = useState(null);
  const [reponses, setReponses] = useState({});
  const [termine, setTermine] = useState(false);

  useEffect(() => {
    mockApi.getQuestionnaires().then((q) => setItems(q.filter((x) => x.public === "enfant")));
  }, []);

  const ouvrir = (q) => {
    setActif(q);
    setReponses({});
    setTermine(false);
  };

  const repondre = (qid, valeur) => {
    setReponses((r) => ({ ...r, [qid]: valeur }));
  };

  const valider = () => {
    setTermine(true);
  };

  const fermer = () => {
    setActif(null);
    setTermine(false);
  };

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Mes questionnaires"
        subtitle="Réponds à quelques questions sur tes émotions"
      />

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((q) => (
          <Card key={q.id} hover>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-corail/20 text-red-700">
                  <Heart size={20} />
                </div>
                <div>
                  <p className="font-bold text-encre">{q.titre}</p>
                  <p className="text-xs text-black/50">{q.description}</p>
                </div>
              </div>
              <Badge couleur={q.statut === "termine" ? "turquoise" : "jaune"}>
                {q.statut === "termine" ? "Terminé" : `${q.dureeMin} min`}
              </Badge>
            </div>
            <div className="mt-4">
              <Button
                variant={q.statut === "termine" ? "outline" : "secondary"}
                onClick={() => ouvrir(q)}
                disabled={q.questions.length === 0}
                className="w-full"
              >
                {q.statut === "termine" ? "Revoir" : "Commencer"}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        open={!!actif}
        onClose={fermer}
        title={actif?.titre || ""}
        footer={
          termine ? (
            <Button onClick={fermer}>Super, merci !</Button>
          ) : (
            <>
              <Button variant="outline" onClick={fermer}>Annuler</Button>
              <Button
                onClick={valider}
                disabled={Object.keys(reponses).length < (actif?.questions?.length || 0)}
              >
                Valider mes réponses
              </Button>
            </>
          )
        }
      >
        {termine ? (
          <div className="flex flex-col items-center gap-2 py-6 text-center">
            <CheckCircle2 size={48} className="text-turquoise" />
            <p className="font-bold text-encre">Bravo, tu as terminé !</p>
            <p className="text-sm text-black/50">Tu gagnes des points pour cette activité.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {actif?.questions?.map((q) => (
              <div key={q.id}>
                <p className="mb-2 font-semibold text-encre">{q.intitule}</p>
                <div className="grid grid-cols-2 gap-2">
                  {q.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => repondre(q.id, opt)}
                      className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                        reponses[q.id] === opt
                          ? "border-turquoise bg-turquoise/15 text-turquoise-dark"
                          : "border-black/10 bg-white text-black/60 hover:bg-black/5"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}