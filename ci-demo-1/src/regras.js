// Regras do MatriculaJá (app/especificacao.md), sem banco e sem API.
import { consultarHistorico } from "./historico.js";

// ── RN-1 · Vaga ─────────────────────────────────────────────────────────────
export const temVaga = (turma) => {
  return turma.vagas_ocupadas < turma.vagas_totais;
};

export const ocuparVaga = (turma) => {
  turma.vagas_ocupadas += 1;
};

// ── RN-4 · Prazo ────────────────────────────────────────────────────────────
// Datas do período no formato AAAA-MM-DD. Limites inclusivos, "hoje" no fuso de São Paulo.
export const dentroDoPrazo = (periodo, agora = new Date()) => {
  const hoje = agora.toLocaleDateString("sv-SE", {
    timeZone: "America/Sao_Paulo",
  });
  return periodo.inicio_matricula <= hoje && hoje <= periodo.fim_matricula;
};

export const fimDaMatricula = (periodo) => {
  // return `Matrícula até ${new Date(periodo.fim_matricula).toLocaleDateString("pt-BR")}`;
  return `Matrícula até ${new Date(periodo.fim_matricula).toLocaleDateString("pt-BR", { timeZone: "UTC" })}`;
};

// ── RN-5 · Créditos do semestre ─────────────────────────────────────────────
const MAX_CREDITOS = 24;

export const creditosDoSemestre = (matriculas) => {
  return matriculas
    .filter((m) => m.estado === "CONFIRMADA")
    .reduce((total, m) => total + m.creditos, 0);
};

export const passouDoLimite = (total) => {
  return total > MAX_CREDITOS;
};

// ── RN-2 · Pré-requisito ────────────────────────────────────────────────────
export const cumprePreRequisito = async (
  alunoId,
  disciplina,
  consultar = consultarHistorico,
) => {
  if (!disciplina.pre_requisito) return true;
  const historico = await consultar(alunoId);
  return historico.some(
    (h) => h.codigo === disciplina.pre_requisito && h.situacao === "APROVADO",
  );
};
