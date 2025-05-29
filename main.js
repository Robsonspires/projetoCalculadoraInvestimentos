import { generateReturnsArray } from "./src/investmentGoals.js";
import { Chart } from "chart.js/auto";
import { createTable } from "./src/table.js";

// const calculateButton = document.getElementById("calculate-results"); trocado do botão para o formulário.
const form = document.getElementById("investment-form");
const calculateButton = document.getElementById("calculate-results");
const cleanFormButton = document.getElementById("clear-form");
const finalMoneyChart = document.getElementById("final-money-distribuition");
const progressionChart = document.getElementById("progression");

let doughnutChartRefernce = {};
let progressionChartReference = {};

const columnsArray = [
  { columnLabel: "Mês", accessor: "month" },
  {
    columnLabel: "Total Investido",
    accessor: "investedAmount",
    format: (numberInfo) => formatCurrencyToTable(numberInfo),
  },
  {
    columnLabel: "Rendimento Mensal",
    accessor: "interestReturns",
    format: (numberInfo) => formatCurrencyToTable(numberInfo),
  },
  {
    columnLabel: "Rendimento Total",
    accessor: "totalInterestReturns",
    format: (numberInfo) => formatCurrencyToTable(numberInfo),
  },
  {
    columnLabel: "Quantia Total",
    accessor: "totalAmount",
    format: (numberInfo) => formatCurrencyToTable(numberInfo),
  },
];

function formatCurrencyToTable(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatCurrency(value) {
  return value.toFixed(2);
}

function renderProgression(evt) {
  evt.preventDefault(); // Previne o comportamento padrão do formulário de recarregar a página.
  if (document.querySelector(".error")) {
    return;
  }

  resetCharts();

  const startingAmount = Number(
    form.elements["starting-amount"].value.replace(",", ".")
  );
  // alteardo para pegar o valor do form
  // const startingAmount = Number(
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
    startingAmount,
    timeAmount,
    timeAmountPeriod,
    additinalContribution,
    returnRate,
    evaluationPeriod,
    taxrate
  );

  console.log(returnsArray);
  const finalInestimentObject = returnsArray[returnsArray.length - 1];

  doughnutChartRefernce = new Chart(finalMoneyChart, {
    type: "doughnut",
    data: {
      labels: ["Total Investido", "Rendimento", "Imposto"],
      datasets: [
        {
          data: [
            formatCurrency(finalInestimentObject.investedAmount),
            formatCurrency(
              finalInestimentObject.totalInterestReturns * (1 - taxrate / 100)
            ),
            formatCurrency(
              finalInestimentObject.totalInterestReturns * (taxrate / 100)
            ),
          ],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  });

  progressionChartReference = new Chart(progressionChart, {
    type: "bar",
    data: {
      labels: returnsArray.map((investmentObject) => investmentObject.month),
      datasets: [
        {
          label: "Total Investido",
          data: returnsArray.map((investmentObject) =>
            formatCurrency(investmentObject.investedAmount)
          ),
          backgroundColor: "rgb(255, 99, 132)",
        },
        {
          label: "Retorno do Rendimento",
          data: returnsArray.map((investmentObject) =>
            formatCurrency(investmentObject.interestReturns)
          ),
          backgroundColor: "rgb(54, 162, 235)",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  });

  createTable(columnsArray, returnsArray, "results-table");
}

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function resetCharts() {
  if (
    !isObjectEmpty(doughnutChartRefernce) &&
    !isObjectEmpty(progressionChartReference)
  ) {
    doughnutChartRefernce.destroy();
    progressionChartReference.destroy();
  }
}
function clearForm() {
  form["starting-amount"].value = "";
  form["additional-contribution"].value = "";
  form["time-amount"].value = "";
  form["return-rate"].value = "";
  form["tax-rate"].value = "";

  resetCharts();

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

const mainEl = document.querySelector("main");
const carouselEl = document.getElementById("carousel");
const nextButton = document.getElementById("slide-arrow-next");
const previousButton = document.getElementById("slide-arrow-previous");

nextButton.addEventListener("click", () => {
  carouselEl.scrollLeft += mainEl.clientWidth;
});
previousButton.addEventListener("click", () => {
  carouselEl.scrollLeft -= mainEl.clientWidth;
});

form.addEventListener("submit", renderProgression);
// calculateButton.addEventListener("click", renderProgression); // trocado do botão para o formulário.
cleanFormButton.addEventListener("click", clearForm);
