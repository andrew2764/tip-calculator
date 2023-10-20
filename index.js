const billInput = document.getElementById("bill");
const peopleCountInput = document.getElementById("people-count");
const customTipInput = document.getElementById("tip-custom");
const tipRadioInputs = document.querySelectorAll(
  'input[type="radio"].tip-input'
);
const tipPerPersonElem = document.getElementById("tip-per-person");
const totalPerPersonElem = document.getElementById("total-per-person");
const form = document.getElementById("form");
const resetButton = document.querySelector(".reset-btn");

form.addEventListener("input", () => {
  resetButton.disabled = false;
  resetButton.classList.remove("disabled");
});
resetButton.addEventListener("click", (e) => {
  e.target.disabled = true;
  e.target.classList.add("disabled");
  tipPerPersonElem.innerHTML = "$0.00";
  totalPerPersonElem.innerHTML = "$0.00";
  peopleCountInput.parentElement.classList.remove("error");
  document.querySelectorAll(".error-message").forEach((elem) => elem.remove());
});

billInput.addEventListener("input", renderAmount);
peopleCountInput.addEventListener("input", renderAmount);
customTipInput.addEventListener("input", renderAmount);

tipRadioInputs.forEach((input) =>
  input.addEventListener("click", renderAmount)
);

function renderAmount(e) {
  peopleCountInput.parentElement.classList.remove("error");
  document.querySelectorAll(".error-message").forEach((elem) => elem.remove());
  if (peopleCountInput.value === "") {
    return;
  }
  if (+peopleCountInput.value <= 0) {
    const errorMessageElem = document.createElement("p");
    errorMessageElem.classList.add("error-message");
    errorMessageElem.innerHTML = "Can't be zero or less";
    document
      .querySelector(".people-count-label--container")
      .appendChild(errorMessageElem);
    peopleCountInput.parentElement.classList.add("error");
    return;
  }
  if (isNaN(+peopleCountInput.value)) {
    const errorMessageElem = document.createElement("p");
    errorMessageElem.classList.add("error-message");
    errorMessageElem.innerHTML = "Must be a number";
    document
      .querySelector(".people-count-label--container")
      .appendChild(errorMessageElem);
    peopleCountInput.parentElement.classList.add("error");
    return;
  }
  const billNum = ((+billInput.value * 100) / 100).toFixed(2);

  let tipAmount;
  const selectedTipBtn = document.querySelector(
    'input[type="radio"].tip-input:checked'
  );
  if (e.target.id === "tip-custom") {
    tipAmount = customTipInput.value;
    if (selectedTipBtn) {
      selectedTipBtn.checked = false;
    }
  } else {
    if (!selectedTipBtn) {
      return;
    }
    tipAmount = billNum * (+selectedTipBtn.value / 100);
  }
  const tipPerPerson = (tipAmount / +peopleCountInput.value).toFixed(2);
  tipPerPersonElem.innerHTML = `$${tipPerPerson}`;

  const billPerPerson = (billNum / +peopleCountInput.value).toFixed(2);
  const totalPerPerson = (+billPerPerson + +tipPerPerson).toFixed(2);
  totalPerPersonElem.innerHTML = `$${totalPerPerson}`;
}
