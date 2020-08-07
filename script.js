import { People } from './src/people.js'
import { Personage } from './src/personage.js'
import { STAR_WARS } from './consts/main.js'


window.addEventListener('DOMContentLoaded', async () => {

  const people = new People();
  let clickedCard;

  async function newPageList(page) {
    if (page === STAR_WARS.FIRST_PAGE_URL) {
      STAR_WARS.BUTTONS.PREVIOUS_BUTTON.setAttribute('disabled', 'disabled');
    }
    await people.getData(page);
    people.fillPage(document.querySelectorAll('div.flip-card-front'));
    window.localStorage.setItem('page', page)
  }

  if (window.localStorage.page) {
    await newPageList(window.localStorage.page);
  } else {
    await newPageList(STAR_WARS.FIRST_PAGE_URL);
  }

  async function fillModal(name) {
    let person = people.getPerson(name);
    let personage = new Personage(...person);
    await personage.fillTable();
  }

  async function clickButton(event) {
    if (event.target.className === 'flip-card-front') {
      STAR_WARS.MAIN_DIV.classList.add('disabled');
      let parentElem = event.target.parentElement;
      clickedCard = parentElem;
      let personageName = event.target.innerHTML;
      let backSide = event.target.nextElementSibling
        backSide.style.backgroundImage = `url('img/${personageName.toLowerCase()}.png')`;
        STAR_WARS.AVATAR.setAttribute('src', `img/${personageName.toLowerCase()}.png`);
        STAR_WARS.AVATAR.onerror = () => {
          STAR_WARS.AVATAR.setAttribute('src', STAR_WARS.BASE_IMAGE);
          backSide.style.backgroundImage = `url('${STAR_WARS.BASE_IMAGE}')`;
        }
      STAR_WARS.AVATAR.style.display = 'block';
      await fillModal(event.target.innerHTML);
      parentElem.classList.add('flipped');
      STAR_WARS.PERSONAGE_MODAL.style.display = "block";
    }
  }

  function removeMain() {
    while (STAR_WARS.MAIN_DIV.firstChild) {
      STAR_WARS.MAIN_DIV.removeChild(STAR_WARS.MAIN_DIV.lastChild);
    }
  }

  async function nextPageMove(event) {
    if (!people.data['previous']) {
      STAR_WARS.BUTTONS.PREVIOUS_BUTTON.removeAttribute('disabled');
    }
    event.target.setAttribute('disabled', 'disabled');

    STAR_WARS.MAIN_DIV.animate([
      {opacity: 0.8},
      {opacity: 1}],
    {duration: 500});

    let nextPage = people.data['next'];
    if (nextPage) {
      STAR_WARS.PAGE_DIV.classList.add('disabled');
      removeMain()
      await newPageList(nextPage);
      STAR_WARS.PAGE_DIV.classList.remove('disabled');
      if (people.data['next']) {
        event.target.removeAttribute('disabled');
      }
    }
  }

  async function prevPageMove(event) {
    if (!people.data['next']) {
      STAR_WARS.BUTTONS.NEXT_BUTTON.removeAttribute('disabled');
    }
    event.target.setAttribute('disabled', 'disabled');

    STAR_WARS.MAIN_DIV.animate([
      {opacity: 0.8},
      {opacity: 1}],
    {duration: 500});

    let prevPage = people.data['previous'];
    if (prevPage) {
      STAR_WARS.PAGE_DIV.classList.add('disabled');
      removeMain()
      await newPageList(prevPage);
      STAR_WARS.PAGE_DIV.classList.remove('disabled');
      if (people.data['previous']) {
        event.target.removeAttribute('disabled');
      }
    }
  }

  function backToList () {
    clickedCard.classList.remove('flipped');
    let tbody = document.querySelector('tbody');
    STAR_WARS.PERSONAGE_MODAL.style.display = "none";
    tbody.remove();
    STAR_WARS.MAIN_DIV.classList.remove('disabled');
  }

  STAR_WARS.MAIN_DIV.addEventListener('click', clickButton);
  STAR_WARS.BUTTONS.NEXT_BUTTON.addEventListener('click', nextPageMove);
  STAR_WARS.BUTTONS.PREVIOUS_BUTTON.addEventListener('click', prevPageMove)
  STAR_WARS.CLOSE_MODAL_BUTTON.addEventListener('click', backToList)

})
