import { expect, test } from "vitest";
import { ocuparVaga, temVaga } from "../src/regras.js";

const turma = { codigo: "ENG-101-A", vagas_totais: 2, vagas_ocupadas: 1 };

test("turma com vaga aceita matrícula", () => {
  expect(temVaga(turma)).toBe(true);
});

test("ocupar a última vaga lota a turma", () => {
  ocuparVaga(turma);
  expect(temVaga(turma)).toBe(false);
});
