class UserInfo {
  constructor(userElement, infoElement) {
    this._userElement = userElement;
    this._infoElement = infoElement;
    
  }

  setUserInfo(res) {
    this._user = res.name;
    this._info = res.about;
  }

  getUserInfo() {
    return {
      userInf: this._user,
      infoInf: this._info
    }
  }

  updateUserInfo() {
    this._userElement.textContent = this._user;
    this._infoElement.textContent = this._info;
  }
}
