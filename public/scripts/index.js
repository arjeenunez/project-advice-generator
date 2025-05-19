'use strict';

const getAdvice = async () => {
    const response = await fetch('https://api.adviceslip.com/advice');
    const data = await response.json();
    return data;
};

const toggleSpinner = element => {
    element.querySelector('.spinner-border').classList.toggle('hidden');
    element.querySelector('.advice-text').classList.toggle('hidden');
};

//prettier-ignore
const generateAdvice = async function (element) {
    toggleSpinner(element);
    const { slip: { id, advice } } = await getAdvice();
    element.querySelector(".advice-head").textContent = `ADVICE #${id}`;
    element.querySelector(".advice-text").textContent = advice;
    toggleSpinner(element);
};

const autoLoadAdvice = async function () {
    await generateAdvice(this.document);
};

document.querySelector('.card-advice').addEventListener('click', function (evt) {
    const isButton = evt.target.closest('.advice-button');
    if (isButton?.classList.contains('advice-button')) {
        generateAdvice(this);
    }
});

window.addEventListener('load', autoLoadAdvice);
