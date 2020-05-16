const placesList = document.querySelector('.places-list');
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('#popup-edit');
const popupImage = document.querySelector('#popup-image');
const popupButton = document.querySelector('.user-info__button');
const editButton = document.querySelector('.user-info__edit');
const popupClose = document.querySelector('.popup__close');
const popupCloseEdit = document.querySelector('#popup-edit-close');
const addPlaceButton = document.querySelector('.popup__button');
const saveButton = document.querySelector('.popup__button_edit');
const placeName = document.querySelector('.popup__input_type_name');

const userName = document.querySelector('.user-info__name');
const userJob = document.querySelector('.user-info__job');

const popupImageOpen = document.querySelector('.popup__image-open');
const popupCloseImage = document.querySelector('.popup__image-close');

const formEdit = document.querySelector('#form-edit');
const user = document.querySelector('#user');
const info = document.querySelector('#info');

const formNewCard = document.querySelector('#new');
const name = document.querySelector('#name');
const link = document.querySelector('#link');


const errorMessages = {
  empty: 'Это обязательное поле',
  wrongLength: 'Должно быть от 2 до 30 символов',
  wrongUrl: 'Здесь должна быть ссылка',
}

/*
  + Надо исправить: данные карточки нужно передавать как параметры функции:
  function createCard(name, link) 
*/
function createCard(name, link) {
  const placeCard = document.createElement('div');
  placeCard.classList.add('place-card');

  const placeCardImage = document.createElement('div');
  placeCardImage.classList.add('place-card__image');

  /* + Надо исправить: нужно использовать передаваемые в функцию данные, а не брать из формы напрямую */
  placeCardImage.style.backgroundImage = `url(${link})`;

  const placeCardDelIcon = document.createElement('button');
  placeCardDelIcon.classList.add('place-card__delete-icon');

  const placeCardDscrptn = document.createElement('div');
  placeCardDscrptn.classList.add('place-card__description');

  const placeCardName = document.createElement('h3');
  placeCardName.classList.add('place-card__name');

  /* + Надо исправить: нужно использовать передаваемые в функцию данные, а не брать из формы напрямую */
  placeCardName.textContent = name;

  const placeCardLike = document.createElement('button');
  placeCardLike.classList.add('place-card__like-icon');

  placeCard.appendChild(placeCardImage);
  placeCardImage.appendChild(placeCardDelIcon);
  placeCard.appendChild(placeCardDscrptn);
  placeCardDscrptn.appendChild(placeCardName);
  placeCardDscrptn.appendChild(placeCardLike);

  return placeCard;

}

/*
  + Надо исправить: данные карточки нужно передавать как параметры функции:
  function addCardOnBoard(name, link) 
*/
function addCardOnBoard(name, link) {
  const cardElement = createCard(name, link);
  placesList.appendChild(cardElement);
}

function startCard(initialCards) {
  initialCards.forEach(function (item) {
    /*
     + Надо исправить: 

      здесь нужно вызвать addCardOnBoard(item.name, item.link);
      т.е. 
      initialCards.forEach(function (item) {
        addCardOnBoard(item.name, item.link);
      }

      в поля формы тут ничего записывать не нужно
    */
    addCardOnBoard(item.name, item.link);
  });
}

function likeAndDel(event) {
  if (event.target.classList.contains('place-card__like-icon')) {
    event.target.classList.toggle('place-card__like-icon_liked');
  };

  if (event.target.classList.contains('place-card__delete-icon')) {
    placesList.removeChild(event.target.closest('.place-card'));
  }
};

function addCard(event) {
  event.preventDefault();

  /* + Надо исправить: 
     здесь нужно вызвать просто addCardOnBoard(name.value, link.value);
  */
  addCardOnBoard(name.value, link.value);
};

function userEditName(event) {
  event.preventDefault();
  document.querySelector('.user-info__name').textContent = user.value;
  document.querySelector('.user-info__job').textContent = info.value;
}

function openPopupImage(event) {
  if (event.target.classList.contains('place-card__image')) {
    popupImage.classList.add('popup_is-opened');
    popupImageOpen.src = event.target.style.backgroundImage.match(/url\(["']?([^"']*)["']?\)/)[1];
  }
}

function closePopupImage() {
  popupImage.classList.remove('popup_is-opened');
}

function popAdd() {
  popup.classList.add('popup_is-opened');
  formNewCard.reset();
  setSubmitButtonState(addPlaceButton, false);
  resetError(name, link);
}

function popEdit() {
  popupEdit.classList.add('popup_is-opened');
  document.querySelector('.popup__input_type_user').value = userName.textContent;
  document.querySelector('.popup__input_type_info').value = userJob.textContent;
  setSubmitButtonState(saveButton, false);
  resetError(user, info);
}

function popClose() {
  popup.classList.remove('popup_is-opened');
}

function popCloseEdit() {
  popupEdit.classList.remove('popup_is-opened');
}

function resetError(inputA, inputB) {
  const elemA = document.querySelector(`#${inputA.id}-error`);
  elemA.parentNode.classList.remove('.error__message');
  elemA.textContent = '';
  const elemB = document.querySelector(`#${inputB.id}-error`);
  elemB.parentNode.classList.remove('.error__message');
  elemB.textContent = '';
}

function isValidate(input) {
  input.setCustomValidity("");

  if (input.validity.valueMissing) {

    input.setCustomValidity(errorMessages.empty);
    return false
  }

  if (input.validity.tooShort || input.validity.tooLong) {
    input.setCustomValidity(errorMessages.wrongLength);
    return false
  }

  if (input.validity.typeMismatch && input.type === 'url') {
    input.setCustomValidity(errorMessages.wrongUrl);
    return false
  }

  return input.checkValidity();
}

function checkInputValidity(input) {
  const errorElem = input.parentNode.querySelector(`#${input.id}-error`);
  const valid = isValidate(input);
  errorElem.textContent = input.validationMessage;

  return valid;

}

function setSubmitButtonState(button, state) {
  if (state) {
    button.removeAttribute('disabled');
    button.classList.add(`popup__button_activ`);
    button.classList.remove(`popup__button_disabled`);
  } else {
    button.setAttribute('disabled', true);
    button.classList.add(`popup__button_disabled`);
    button.classList.remove(`popup__button_activ`);
  }
}

function handleFormInput(event) {
  const submit = event.currentTarget.querySelector('.button');
  const [...inputs] = event.currentTarget.elements;

  checkInputValidity(event.target);

  setSubmitButtonState(submit, inputs.every(isValidate));
}

formNewCard.addEventListener('input', handleFormInput, true);
formEdit.addEventListener('input', handleFormInput, true);

placesList.addEventListener('click', openPopupImage);
popupCloseImage.addEventListener('click', closePopupImage)

popupButton.addEventListener('click', popAdd);
popupClose.addEventListener('click', popClose);

editButton.addEventListener('click', popEdit);
popupCloseEdit.addEventListener('click', popCloseEdit);

window.onkeydown = function (event) {
  if (event.keyCode == 27) {
    popClose();
    popCloseEdit();
    closePopupImage();
  }
};

formNewCard.addEventListener('submit', addCard);
addPlaceButton.addEventListener('click', popClose);

formEdit.addEventListener('submit', userEditName);
saveButton.addEventListener('click', popCloseEdit);

placesList.addEventListener('click', likeAndDel);


startCard(initialCards);
/*
    Отлично, часть задания работает правильно, ошибки лайв валидации отображаются, но по сохранению формы
    и структуре кода есть замечания:

    Надо исправить:
    - если кнопка сохранения в попапе не активна при нажатии на неё попап не должен закрываться
    Сейчас сохранение при нажатии на кнопку происходит даже если форма невалидна

    - функция createCard должна только создавать карточку, никаких проверок nameValue и linkValue быть не должно

    - в функцию setSubmitButtonState нужно передавать кнопку и параметр state - true/false

    - если нужно использовать event то его необходимо явно передавать как параметр функции

    - аттрибут disabled должен задаваться кнопке, а не div

    - название setEventListeners подразумевает, что функция навешивает обработчики
    а не занимается валидацией

    - функция checkInputValidity должна производить валидацию одного поля ввода

    - у метода removeAttribute есть только один параметр

    Можно лучше:
    - сообщения об ошибках вынести в отдельный объект

    - функция createCard не должна добавлять сама карточку в контейнер т.к.
    это делает код плохо переиспользуемым - нельзя будет создавать и добавлять карточки в несколько
    разных контейнеров. Из функции createCard должна возвращаться созданная карточка, а добавляться в
    контейнер она должна там где  createCard вызывается

    - для перебора массива использовать forEach

    - для валидации поля ввода можно использовать нативные средства браузера.
*/

/*

  Часть замечаний исправлено, но несколько ещё осталось:

  Надо исправить:
  - если добавить одну карточку и повторно открыть попап, то кнопка добавления остается активной,
  хотя поля формы очистились. И можно добавить пустую карточку

  - в функции startCard достаточно вызывать createCard(item.name, item.link);
  Не нужно записывать данные в поля формы и производить очистку формы

  - если на форме профиля отображались ошибки, затем закрыть попап и снова открыть, то в поля формы
  подставятся значения, но ошибки все так и отображаются http://prntscr.com/se283r
  Нужно очищать ошибки

  - название функции setEventListeners неверно описывает то что она делает, нужно выбрать другое имя

  Можно лучше:
  - дать более уникальное имя переменной form, например formNewCard

  - функция createCard не должна добавлять сама карточку в контейнер

  - функция sendForm не используется, можно удалить её
*/

/*
  Отлично, по валидации формы все замечания исправлены
  Но по добавлению карточек ещё путаница:
  Надо исправить:
  + в функцию createCard данные карточки передавать как параметры функции:
    function createCard(name, link) и использовать эти передаваемые параметры, а не данные из полей формы

  + в функцию addCardOnBoard данные карточки так же должны передаваться как параметры

  + в функции startCard просто вызываем addCardOnBoard(item.name, item.link); , форму не трогаем

  + в функции addCard так же вызываем addCardOnBoard, но передаем туда уже параметры из формы:
    addCardOnBoard(name.value, link.value)

*/




