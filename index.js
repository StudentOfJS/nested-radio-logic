// Import stylesheets
import './style.css';
let logicRadios = document.querySelectorAll(`[data-radio]`);
let logic = sessionStorage.myMap
  ? // sessionStorage.myMap && document.querySelector('.errormessage')
    new Map(JSON.parse(sessionStorage.myMap))
  : new Map();

const setShow = (container, id) => {
  let toShow = document.querySelector(`div[data-id="${container}|${id}"]`);
  let toHide = document.querySelectorAll(
    `div[data-id^=${container}]:not([data-id="${container}|${id}"])`
  );
  for (let i = 0; i < toHide.length; i++) {
    toHide[i].classList.add('hidden');
    let children = toHide[i].querySelectorAll(`[data-radio]`);
    for (let i = 0; i < children.length; i++) {
      children[i].setAttribute('disabled', 'disabled');
    }
  }
  if (toShow) {
    toShow.classList.remove('hidden');
    let children = toShow.querySelectorAll(`[data-radio]`);
    for (let i = 0; i < children.length; i++) {
      children[i].removeAttribute('disabled');
    }
  }
};

if (logic && logic.size) {
  console.log(logic.size);
  logic.forEach((value, key) => {
    let radio = document.querySelector(`[data-radio="${key}|${value}"]`);
    radio.checked = true;
    setShow(key, value);
  });
}

const updateLogic = (container, id) => {
  if (!container) return;
  logic.set(container, id);
  setShow(container, id);
  sessionStorage.myMap = JSON.stringify(Array.from(logic.entries()));
};

for (let i = 0; i < logicRadios.length; i++) {
  logicRadios[i].addEventListener('change', (event) => {
    let { radio } = event.target.dataset;
    if (radio) {
      updateLogic(...radio.split('|'));
    }
  });
}
// for success page
// const removeMapFromSessionStorage = () => {
//   sessionStorage.removeItem('myMap');
// };
