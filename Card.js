class Card {

  constructor(likesNumber, name, link, _id, api, createPopupImg, template) {
    this._likesNumber = likesNumber
    this._name = name;
    this._link = link;
    this._id = _id;
    this._api = api;
    this._createPopupImg = createPopupImg;
    this._template = template;
    this._like = this._like.bind(this);
    this._remove = this._remove.bind(this);
  }

  _like() {
    if (this.iconLike.classList.contains('place-card__like-icon_liked')) {
      this._api.removeLike(this._id)
        .then(res => {
          this.iconNumber.textContent = res.likes.length;
          this.iconLike.classList.remove('place-card__like-icon_liked');
        })
        .catch(err => alert(err));
    } else {
      this._api.addLike(this._id)
        .then(card => {
          this.iconNumber.textContent = card.likes.length;
          this.iconLike.classList.add('place-card__like-icon_liked');
        })
        .catch(err => alert(err));
    }
  }

  _remove() {
    this.removeEventListeners();
    if (confirm('Удалить карточку?')) {
      this._api.deleteTask(this._id)
        .then(res => {
          if (res.ok) {
            this._view.remove();
          } else {
            return Promise.reject(`Ошибка: ${res.status}`);
          }
        })
        .catch(err => alert(err));
    }
  }

  setEventListeners() {
    this.iconLike.addEventListener('click', this._like);
    this.iconDelet.addEventListener('click', this._remove);
    this.imgCard.addEventListener('click', this.zoomImg);
  }

  removeEventListeners() {
    this.iconLike.removeEventListener('click', this._like);
    this.iconDelet.removeEventListener('click', this._remove);
    this.imgCard.removeEventListener('click', this.zoomImg);
  }

  zoomImg = () => {
    this._createPopupImg(this._link);
  }

  create() {
    this._view = this._template.cloneNode(true);
    this._view.querySelector('.place-card__like-number').textContent = this._likesNumber;
    this._view.querySelector('.place-card__name').textContent = this._name;
    this._view.querySelector('.place-card__image').style.backgroundImage = `url(${this._link})`;
    this._view.querySelector('.place-card__image').dataset.url = this._link;
    this.iconNumber = this._view.querySelector('.place-card__like-number');
    this.iconLike = this._view.querySelector('.place-card__like-icon');
    this.iconDelet = this._view.querySelector('.place-card__delete-icon');
    this.imgCard = this._view.querySelector('.place-card__image');
    this.setEventListeners();

    return this._view
  }
}

