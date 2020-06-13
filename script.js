const popupButton = document.querySelector('.user-info__button');
const editButton = document.querySelector('.user-info__edit');
const userName = document.querySelector('.user-info__name');
const userJob = document.querySelector('.user-info__job');
const placesListPage = document.querySelector('.places-list')
const newFormPlace = document.querySelector('#new')
const newFormEdit = document.querySelector('#form-edit')
const background = document.querySelector('#image-open');
const inputUser = document.querySelector('.popup__input_type_user');
const inputInfo = document.querySelector('.popup__input_type_info');
const buttonSubUser = document.querySelector('#submit-edit');
const buttonSubPlace = document.querySelector('#submit');

const template = document.querySelector('#card-template').content.querySelector('.place-card');

const errorMessages = {
  empty: 'Это обязательное поле',
  wrongLength: 'Должно быть от 2 до 30 символов',
  wrongUrl: 'Здесь должна быть ссылка'
}

const api = new Api({
  url: 'https://praktikum.tk/cohort11',
  headers: {
    authorization: '5e3b9035-32d1-4ba7-9a38-5bcb2c0ecbb0',
    'Content-Type': 'application/json'
  }
});

const createCard = (...arg) => new Card(...arg, api, createPopupImg, template).create();
const createPopupImg = (item) => zoomBig.openImg(item);

const formValidationPlace = new FormValidator(newFormPlace, errorMessages);
formValidationPlace.setEventListeners();

const formValidationUser = new FormValidator(newFormEdit, errorMessages);
formValidationUser.setEventListeners();

const zoomBig = new ImgPopup(document.querySelector('#popup-image'), document.querySelector('#popup-img-close'), background);
const popupNewPlace = new Popup(document.querySelector('#popup-place'), document.querySelector('#popupClose'));
const popupNewUser = new Popup(document.querySelector('#popup-edit'), document.querySelector('#popup-edit-close'));


popupButton.addEventListener('click', () => {
  newFormPlace.reset();
  formValidationPlace.resetErrors();
  popupNewPlace.open();
})

editButton.addEventListener('click', () => {
  formValidationUser.resetErrors();
  popupNewUser.open();
})

api.getDataUser()
  .then(res => {
    userInfo.setUserInfo(res);
    userInfo.updateUserInfo();
    inputUser.value = userInfo.getUserInfo().userInf;
    inputInfo.value = userInfo.getUserInfo().infoInf;
  })
  .catch((err) => {
    alert('Упс! ' + err);
  });

const userInfo = new UserInfo(userName, userJob);

newFormEdit.addEventListener('submit', (event) => {
  event.preventDefault();
  buttonSubUser.textContent = 'Загрузка...';
  api.changeData(inputUser.value, inputInfo.value).then(res => {
    userInfo.setUserInfo(res);
    userInfo.updateUserInfo()
    popupNewUser.close();
  })
    .catch((err) => {
      alert('Упс! ' + err);
    })
    .finally(() => { buttonSubUser.textContent = 'Сохранить' })
});

const placesList = new CardList(placesListPage, createCard, api);
api.getData()
  .then(res => {
    placesList.render(res);
  })
  .catch((err) => {
    alert('Упс! ' + err);
  });

newFormPlace.addEventListener('submit', (event) => {
  event.preventDefault();
  buttonSubPlace.textContent = 'Загрузка...';
  api.creatTask(newFormPlace.name.value, newFormPlace.link.value)
    .then(res => {
      placesList.addCard('0', newFormPlace.name.value, newFormPlace.link.value, res._id);
      popupNewPlace.close();
    })
    .catch((err) => {
      alert('Упс! ' + err);
    })
    .finally(() => { buttonSubPlace.textContent = '+' })
})
