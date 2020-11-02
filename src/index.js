import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries.js';
import template from './template/template.hbs';
import './styles.css';

const output = document.querySelector('.output');

const serch = document.querySelector('.input-country');

const show = function (data) {
  if (data.status === 404) {
    output.innerHTML = 'По вашему запросу ничего не найдено';
    return;
  } else if (data.length > 10) {
    output.innerHTML = 'привышен лимит';
    return;
  }
  if (data.length > 1 && data.length < 10) {
    output.innerHTML = data.reduce(
      (acc, el) => acc + `<ul><li class="cauntrys">${el.name}</li></ul>`,
      '',
    );
  } else {
    output.innerHTML = template(data[0]);
  }
};
console.log(serch);

const onInput = function () {
  console.log(serch.value);
  fetchCountries(serch.value).then(res => {
    console.log(res);
    show(res);
  });
};
if (localStorage.state) {
  serch.value = localStorage.state;
  onInput();
}
serch.addEventListener('input', debounce(onInput, 500));

window.addEventListener('beforeunload', () => {
  localStorage.setItem('state', serch.value);
});

output.addEventListener('click', e => {
  if (e.target.classList.contains('cauntrys')) {
    serch.value = e.target.textContent;

    onInput();
  }
});
