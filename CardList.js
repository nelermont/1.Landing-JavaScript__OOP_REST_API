class CardList {
  constructor(container, createCard, api) {
    this._container = container;
    this._createCard = createCard;
    this._api = api;
  }

  addCard(likes, name, link, _id) {
    this._container.append(this._createCard(likes, name, link, _id));
  }

  render(cards) {
    this._api.getData()
      .then(cards.forEach(({ likes, name, link, _id }) => {
        this.addCard(likes.length, name, link, _id);
      }))
      .catch(err => alert(err));
  }
}
