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

}
