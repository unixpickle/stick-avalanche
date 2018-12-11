class Game {
  constructor() {
    this.element = document.getElementById('game');
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

  add() {
    this.game.add(this);
  }

  remove() {
    this.game.remove(this);
  }

  y() {
    // TODO: get element height and use negative of that
    // as the default Y.
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