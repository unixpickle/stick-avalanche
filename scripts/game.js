class Game {
  constructor() {
    this.element = document.getElementById('game');
    this.gravState = new GravState();
    this._objects = [];
  }

  width() {
    return this.element.offsetWidth;
  }

  height() {
    return this.element.offsetHeight;
  }

  add(object) {
    this._objects.push(object);
    this.element.appendChild(object.element);
  }

  remove(object) {
    const index = this._objects.indexOf(object);
    if (index < 0) {
      throw 'object not in game';
    }
    this.element.removeChild(object.element);
    this._objects.splice(index, 1);
  }
}

class GameObject {
  constructor(game) {
    this.game = game;
    this.element = null;
  }

  remove() {
    this.game.remove(this);
  }

  y() {
    const yStr = this.element.style.top || ('-' + this.height().toFixed(1));
    return parsePxSize(yStr)
  }

  x() {
    const xStr = this.element.style.top || '0px';
    return parsePxSize(xStr);
  }

  width() {
    return this.element.offsetWidth;
  }

  height() {
    return this.element.offsetHeight;
  }
}

function parsePxSize(size) {
  return parseFloat(size.split('px')[0]);
}