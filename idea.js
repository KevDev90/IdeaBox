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
    // removeFromLocal()
    localStorage.setItem(JSON.stringify(this.id), JSON.stringify(this));
  }

  removeFromLocal() {
    localStorage.removeItem(this.id);
  }

}
