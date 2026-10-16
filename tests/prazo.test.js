import { expect, test } from "vitest";
import { dentroDoPrazo, fimDaMatricula } from "../src/regras.js";

const periodo = {
  codigo: "2026/2",
  inicio_matricula: "2026-07-20",
  fim_matricula: "2026-10-20",
};

test("mostra o último dia de matrícula", () => {
  expect(fimDaMatricula(periodo)).toBe("Matrícula até 20/10/2026");
});

test("o último dia ainda está dentro do prazo", () => {
  expect(dentroDoPrazo(periodo, new Date("2026-10-20T22:00:00-03:00"))).toBe(
    true,
  );
});

test("o dia seguinte já está fora do prazo", () => {
  expect(dentroDoPrazo(periodo, new Date("2026-10-21T08:00:00-03:00"))).toBe(
    false,
  );
});
