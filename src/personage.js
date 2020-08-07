import {STAR_WARS} from "../consts/main.js";


export class Personage {
  constructor(name, gender, birthYear, homeWorld, films, species) {
    this.name = name
    this.gender = gender
    this.birthYear = birthYear
    this.homeWorld = homeWorld
    this.films = films
    this.species = species
    this.table = document.querySelector('table')
  }

  async getData(page) {
    let securePage = page.replace('http:', 'https:');
    let response = await fetch(securePage);
    return await response.json();
  }

  tableBody() {
    let tableBody = document.createElement('tbody');
    this.table.insertAdjacentElement('afterbegin', tableBody);
  }

  tableRow(id, trow, kwargs) {
    let tableRowElement = document.createElement('tr');
    tableRowElement.id = id;
    let tableRowHead = document.createElement('th');
    let tableRowValue = document.createElement('td');
    for (const [key, value] of Object.entries(kwargs)) {
      let keyS = key.split('_');
      if (keyS[0] === 'th') {
        tableRowHead.setAttribute(keyS[1], value.toString());
      } else {
        tableRowValue.setAttribute(keyS[1], value.toString());
      }
    }
    tableRowElement.insertAdjacentElement('beforeend', tableRowHead);
    if (trow) {
      tableRowElement.insertAdjacentElement('beforeend', tableRowValue);
    }
    return tableRowElement
  }

  createList(row) {
    let ul = document.createElement('ul');
    row.lastElementChild.insertAdjacentElement('afterbegin', ul);
    return ul
  }

  getName() {
    let tr = this.tableRow(STAR_WARS.PERSONAGE.NAME.ID, false, {th_scope: "row", th_colspan: "2"});
    tr.firstElementChild.innerHTML = this.name.toString();
    console.log(this.name)
    document.querySelector('tbody').insertAdjacentElement('beforeend', tr);
  }

  getGender() {
    let tr = this.tableRow(STAR_WARS.PERSONAGE.GENDER.ID, true, {th_scope: "row", tr_colspan: "2"});
    tr.firstElementChild.innerHTML = STAR_WARS.PERSONAGE.GENDER.NAME;
    tr.lastElementChild.innerHTML = this.gender.toString();
    document.querySelector('tbody').insertAdjacentElement('beforeend', tr);
  }

  getBirthYear() {
    let tr = this.tableRow(STAR_WARS.PERSONAGE.BIRTH_YEAR.ID, true, {th_scope: "row", tr_colspan: "2"});
    tr.firstElementChild.innerHTML = STAR_WARS.PERSONAGE.BIRTH_YEAR.NAME;
    tr.lastElementChild.innerHTML = this.birthYear.toString();
    document.querySelector('tbody').insertAdjacentElement('beforeend', tr);
  }

  async getHomeWorld() {
    let planet = await this.getData(this.homeWorld);
    let tr = this.tableRow(STAR_WARS.PERSONAGE.HOME_WORLD.ID, true, {th_scope: "row", tr_colspan: "2"});
    tr.firstElementChild.innerHTML = STAR_WARS.PERSONAGE.HOME_WORLD.NAME;
    tr.lastElementChild.innerHTML = planet.name;
    document.querySelector('tbody').insertAdjacentElement('beforeend', tr);
  }

  async getFilms() {
    let tr = this.tableRow(STAR_WARS.PERSONAGE.FILMS.ID, true, {th_scope: "row", tr_colspan: "2"});
    tr.firstElementChild.innerHTML = STAR_WARS.PERSONAGE.FILMS.NAME;
    if (this.films.length > 0) {
      let list = this.createList(tr);
      for (let film of this.films) {
        let data = await this.getData(film);
        let li = document.createElement('li');
        li.innerHTML = data.title;
        list.insertAdjacentElement('beforeend', li);
      }
    } else {
      tr.lastElementChild.innerHTML = 'No films';
    }
    document.querySelector('tbody').insertAdjacentElement('beforeend', tr);
  }

  async gerSpecies() {
    let tr = this.tableRow(STAR_WARS.PERSONAGE.SPECIES.ID, true, {th_scope: "row", tr_colspan: "2"});
    tr.firstElementChild.innerHTML = STAR_WARS.PERSONAGE.SPECIES.NAME;
    if (this.species.length > 0) {
      let list = this.createList(tr);
      for (let spec of this.species) {
        let data = await this.getData(spec);
        let li = document.createElement('li');
        li.innerHTML = data.name;
        list.insertAdjacentElement('beforeend', li);
      }
    } else {
      tr.lastElementChild.innerHTML = 'No species';
    }
    document.querySelector('tbody').insertAdjacentElement('beforeend', tr);
  }

  async fillTable() {
    this.tableBody();
    this.getName();
    this.getGender();
    this.getBirthYear();
    await this.getHomeWorld();
    await this.getFilms();
    await this.gerSpecies();
  }
}
