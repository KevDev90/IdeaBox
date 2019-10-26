class Idea {
  constructor(title, body, id) {
    this.title = title;
    this.body = body;
    this.id = id || Date.now();
    this.star = false;
  }

  toggleStar() {
  this.star = !this.star;
  }

  saveToLocal() {
    localStorage.setItem(JSON.stringify(this.id), JSON.stringify(this))
  }

  removeFromLocal(id) {
    localStorage.removeItem(id);
  }

}
