export const STAR_WARS = {
  PAGE_DIV: document.querySelector('.bg'),
  MAIN_DIV: document.querySelector('.main'),
  PERSONAGE_MODAL: document.getElementById("myModal"),
  CLOSE_MODAL_BUTTON: document.querySelector(".close"),
  AVATAR: document.querySelector('img.avatar'),
  BASE_IMAGE: 'img/star.png',
  FIRST_PAGE_URL: 'https://swapi.dev/api/people/',
  BUTTONS: {
    NEXT_BUTTON: document.querySelector('#next'),
    PREVIOUS_BUTTON: document.querySelector('#previous')
  },
  PERSONAGE: {
    NAME: {
      ID: 'name',
      NAME: 'Name'
    },
    GENDER: {
      ID: 'gender',
      NAME: 'Gender'
    },
    BIRTH_YEAR: {
      ID: 'birth_year',
      NAME: 'Berth year'
    },
    HOME_WORLD: {
      ID: 'planet',
      NAME: 'Planet'
    },
    FILMS: {
      ID: 'films',
      NAME: 'Films'
    },
    SPECIES: {
      ID: 'species',
      NAME: 'Species'
    }
  }
}