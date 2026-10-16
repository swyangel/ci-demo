import { expect, test } from "vitest";
import { creditosDoSemestre, dentroDoPrazo, passouDoLimite } from "../src/regras.js";

const periodo = { codigo: "2026/2", inicio_matricula: "2026-07-20", fim_matricula: "2026-10-20" };
const matriculas = [];

test("matrícula confirmada soma créditos", () => {
  matriculas.push({ disciplina: "ENG-101", estado: "CONFIRMADA", creditos: 4 });
  expect(creditosDoSemestre(matriculas)).toBe(4);
});

test("matrícula trancada não soma créditos", () => {
  matriculas.push({ disciplina: "ENG-204", estado: "TRANCADA", creditos: 4 });
  expect(creditosDoSemestre(matriculas)).toBe(4);
});

test("com 20 créditos, o aluno ainda pega uma disciplina de 4", () => {
  expect(dentroDoPrazo(periodo)).toBe(true);
  expect(passouDoLimite(20 + 4)).toBe(false);
});
