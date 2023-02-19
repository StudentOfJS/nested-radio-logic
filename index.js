// Import stylesheets
import './style.css';
let logicRadios = document.querySelectorAll(`[data-radio]`);
let logic = sessionStorage.myMap
  ? // sessionStorage.myMap && document.querySelector('.errormessage')
    new Map(JSON.parse(sessionStorage.myMap))
  : new Map();

const setShow = (container, id) => {
  let parent = document.querySelector(`[data-container="${container}"]`);
  if (parent) {
    let toShow = parent.querySelector(`div[data-id="${id}"]`);
    let toHide = parent.querySelectorAll(`div[data-id]:not([data-id="${id}"])`);
    for (let i = 0; i < toHide.length; i++) {
      toHide[i].classList.add('hidden');
    }
    toShow && toShow.classList.remove('hidden');
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
