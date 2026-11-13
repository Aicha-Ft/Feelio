import { utilisateurs } from "../data/utilisateurs";
import { questionnaires } from "../data/questionnaires";
import { scenarios } from "../data/scenarios";
import { jeux } from "../data/jeux";
import { badges } from "../data/badges";
import { recommandations } from "../data/recommandations";
import { rapports } from "../data/rapports";
import { evaluations } from "../data/evaluations";
import { progressions } from "../data/progressions";
import { historique } from "../data/historique";
import { enfants } from "../data/enfants";

const delai = (ms = 120) => new Promise((r) => setTimeout(r, ms));

export const mockApi = {
  async getUtilisateurs() { await delai(); return [...utilisateurs]; },
  async getQuestionnaires() { await delai(); return [...questionnaires]; },
  async getScenarios() { await delai(); return [...scenarios]; },
  async getJeux() { await delai(); return [...jeux]; },
  async getBadges() { await delai(); return [...badges]; },
  async getRecommandations() { await delai(); return [...recommandations]; },
  async getRapports() { await delai(); return [...rapports]; },
  async getEvaluations() { await delai(); return [...evaluations]; },
  async getProgressions() { await delai(); return [...progressions]; },
  async getEnfants() { await delai(); return [...enfants]; },

  async getRapportsByEnfant(id) { await delai(); return rapports.filter((r) => r.enfantId === id); },
  async getRecommandationsByEnfant(id) { await delai(); return recommandations.filter((r) => r.enfantId === id); },
  async getEvaluationsByEnfant(id) { await delai(); return evaluations.filter((e) => e.enfantId === id); },
  async getProgressionByEnfant(id) { await delai(); return progressions.find((p) => p.enfantId === id) || null; },
  async getHistoriqueByEnfant(id) { await delai(); return historique.filter((h) => h.enfantId === id); },
};