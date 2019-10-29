class Idea {
  constructor(title, body, id, star) {
    this.title = title;
    this.body = body;
    this.id = id || Date.now();
    this.star = star || false;
  }

  toggleStar() {
  this.star = !this.star;
  }

  saveToLocal() {
      // check to see if star exists in local,
      // if yes only change the values and then saveToLocal
      // if no save to local the entire object
    localStorage.setItem(JSON.stringify(this.id), JSON.stringify(this));
  }

  removeFromLocal() {
    localStorage.removeItem(this.id);
  }

}
