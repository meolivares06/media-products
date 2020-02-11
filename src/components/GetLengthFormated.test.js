import React from "react";
import GetLengthFormated from "./GetLengthFormated";

it("Menos de 60seg devuelve eso mismo", () => {
  let value = GetLengthFormated(59);
  expect(value).toBe(59);

  value = GetLengthFormated(1);
    expect(value).toBe('01');

  value = GetLengthFormated(10);
  expect(value).toBe(10);
});
it("60seg devuelve 60", () => {
  const value = GetLengthFormated(60);
  expect(value).toBe('01:00');
});

it("180seg devuelve 03:00", () => {
  const value = GetLengthFormated(180);
  expect(value).toBe("03:00");
});

it("3600seg devuelve 01:00:00", () => {
    const value = GetLengthFormated(3600);
    expect(value).toBe("01:00:00");
});
