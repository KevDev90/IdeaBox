class Idea {
  constructor(title, body) {
    this.title = title;
    this.body = body;
    this.id = Date.now();
    this.star = false;
  }

  toggleStar() {
  this.star = !this.star;
  }

}
