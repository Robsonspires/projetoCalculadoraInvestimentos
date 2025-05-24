import { generateReturnsArray } from "./src/investmentGoals.js";

// const calculateButton = document.getElementById("calculate-results"); trocado do botão para o formulário.
const form = document.getElementById("investment-form");
const calculateButton = document.getElementById("calculate-results");
const cleanFormButton = document.getElementById("clear-form");

function renderProgression(evt) {
  evt.preventDefault(); // Previne o comportamento padrão do formulário de recarregar a página.
  if (document.querySelector(".error")) {
    return;
  }
  const starttingAmount = Number(
    form.elements["starting-amount"].value.replace(",", ".")
  );
  // alteardo para pegar o valor do form
  // const starttingAmount = Number(
  //   document.getElementById("starting-amount").value
  // );
  const additinalContribution = Number(
    form.elements["additional-contribution"].value.replace(",", ".")
  );
  // const additinalContribution = Number(
  //   document.getElementById("additional-contribution").value
  // );
  const timeAmount = Number(document.getElementById("time-amount").value);
  const timeAmountPeriod = document.getElementById("time-amount-period").value;
  const returnRate = Number(
    document.getElementById("return-rate").value.replace(",", ".")
  );
  const evaluationPeriod = document.getElementById("evaluation-period").value;
  const taxrate = Number(
    document.getElementById("tax-rate").value.replace(",", ".")
  );

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

function clearForm() {
  form["starting-amount"].value = "";
  form["additional-contribution"].value = "";
  form["time-amount"].value = "";
  form["return-rate"].value = "";
  form["tax-rate"].value = "";

  const errorInputContainers = document.querySelectorAll(".error");

  for (const errorInputContainer of errorInputContainers) {
    errorInputContainer.classList.remove("error");
    errorInputContainer.parentElement.querySelector("p").remove();
  }
}

function validadeInput(evt) {
  // evt.target é o elemento em uso
  if (evt.target.value === "") {
    return;
  }

  const { parentElement } = evt.target;
  const grantParentElement = parentElement.parentElement;
  const inputValue = evt.target.value.replace(",", ".");

  if (
    !parentElement.classList.contains("error") &&
    (isNaN(inputValue) || Number(inputValue) <= 0)
  ) {
    const errorTextElement = document.createElement("p");
    errorTextElement.classList.add("text-red-500");
    errorTextElement.innerText = "Insira um valor numérico e maior que 0";

    parentElement.classList.add("error");
    grantParentElement.appendChild(errorTextElement);
  } else if (
    parentElement.classList.contains("error") &&
    !isNaN(inputValue) &&
    Number(inputValue) > 0
  ) {
    parentElement.classList.remove("error");
    grantParentElement.querySelector("p").remove();
  }
}

for (const formElement of form) {
  if (formElement.tagName === "INPUT" && formElement.hasAttribute("name")) {
    formElement.addEventListener("blur", validadeInput);
  }
}

// calculateButton.addEventListener("click", renderProgression); // trocado do botão para o formulário.
// form.addEventListener("submit", renderProgression);
calculateButton.addEventListener("click", renderProgression);
cleanFormButton.addEventListener("click", clearForm);
