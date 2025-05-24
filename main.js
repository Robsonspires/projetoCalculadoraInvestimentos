import { generateReturnsArray } from "./src/investmentGoals.js";

// const calculateButton = document.getElementById("calculate-results"); trocado do botão para o formulário.
const form = document.getElementById("investment-form");
const calculateButton = document.getElementById("calculate-results");

function renderProgression(evt) {
  evt.preventDefault(); // Previne o comportamento padrão do formulário de recarregar a página.
  const starttingAmount = Number(form.elements["starting-amount"].value);
  // const starttingAmount = Number(
  //   document.getElementById("starting-amount").value
  // );
  const additinalContribution = Number(
    form.elements["additional-contribution"].value
  );
  // const additinalContribution = Number(
  //   document.getElementById("additional-contribution").value
  // );
  const timeAmount = Number(document.getElementById("time-amount").value);
  const timeAmountPeriod = document.getElementById("time-amount-period").value;
  const returnRate = Number(document.getElementById("return-rate").value);
  const evaluationPeriod = document.getElementById("evaluation-period").value;
  const taxrate = Number(document.getElementById("tax-rate").value);

  const returnsArray = generateReturnsArray(
    starttingAmount,
    timeAmount,
    timeAmountPeriod,
    additinalContribution,
    returnRate,
    evaluationPeriod,
    taxrate
  );

  console.log(returnsArray);
}

// calculateButton.addEventListener("click", renderProgression); // trocado do botão para o formulário.
// form.addEventListener("submit", renderProgression);
calculateButton.addEventListener("click", renderProgression);
