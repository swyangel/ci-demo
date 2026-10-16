// Simula o ServicoDeHistorico, o sistema acadêmico externo. Responde em até 20 ms;
// LATENCIA_MS=50 simula o dia em que ele está lento.
const HISTORICO = {
  marina: [{ codigo: "BD-I", situacao: "APROVADO" }],
  joao: [],
};

const LATENCIA_MS = Number(process.env.LATENCIA_MS ?? 20);

export const consultarHistorico = async (alunoId) => {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * LATENCIA_MS));
  return HISTORICO[alunoId] ?? [];
};
