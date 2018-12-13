const ARROW_LEFT = 37;
const ARROW_RIGHT = 39;
const SPACE = 32;

class Game {
  constructor() {
    this.element = document.getElementById('game');
    this.gameOverElement = document.getElementById('game-over');
    this.gravState = new GravState();
    this.invincibleTimer = 0;
    this.rockGenerator = new RockGenerator(this);
    this.puGenerator = new PowerUpGenerator(this);
    this._objects = [];
    this._gameOver = true;

    this._leftPressed = false;
    this._rightPressed = false;

    this.score = 0;

    const player = new Player(this);
    this.add(player);

    this._setupKeyEvents();
  }

  _setupKeyEvents() {
    window.addEventListener('keydown', (e) => {
      if (e.which === ARROW_LEFT) {
        this._leftPressed = true;
      } else if (e.which === ARROW_RIGHT) {
        this._rightPressed = true;
      }
    });
    window.addEventListener('keyup', (e) => {
      if (e.which === ARROW_LEFT) {
        this._leftPressed = false;
      } else if (e.which === ARROW_RIGHT) {
        this._rightPressed = false;
      } else if (e.which === SPACE && this._gameOver) {
        this.newGame();
      }
    });
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

  render(time) {
    if (!this._gameOver) {
      this._objects.slice().forEach((x) => x.render(time));
      this.rockGenerator.step(time);
      this.puGenerator.step(time);
      this.gravState.step(time);
      this.invincibleTimer -= time;
      this.checkCollisions();
      this.score += time;
    }
  }

  invincible() {
    return this.invincibleTimer > 0;
  }

  movementDirection() {
    if (this._leftPressed && !this._rightPressed) {
      return -1;
    } else if (!this._leftPressed && this._rightPressed) {
      return 1;
    }
    return 0;
  }

  checkCollisions() {
    const player = this.player();
    const playerBounds = player.bounds();
    this._objects.forEach((obj) => {
      if (obj == player) {
        return;
      }
      const bounds = obj.bounds();
      if (bounds.intersects(playerBounds)) {
        obj.playerCollision();
      }
    });
  }

  gameOver() {
    this._gameOver = true;
    this.gameOverElement.style.display = 'block';
  }

  newGame() {
    this.gameOverElement.style.display = 'none';
    this._gameOver = false;
    this._objects.slice().forEach((x) => x.remove());
    const player = new Player(this);
    this.add(player);
    this.gravState.reset();
    this.invincibleTimer = 0;
    this.score = 0;
  }

  player() {
    return this._objects.filter((x) => x instanceof Player)[0];
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

  x() {
    const xStr = this.element.style.left || '0px';
    return parsePxSize(xStr);
  }

  setX(x) {
    this.element.style.left = x.toFixed(5) + 'px';
  }

  y() {
    const yStr = this.element.style.top || ('-' + this.height().toFixed(1));
    return parsePxSize(yStr)
  }

  setY(y) {
    this.element.style.top = y.toFixed(5) + 'px';
  }

  width() {
    return this.element.offsetWidth;
  }

  height() {
    return this.element.offsetHeight;
  }

  bounds() {
    const x = this.x();
    const y = this.y();
    const width = this.width();
    const height = this.height();
    return new Polygon([
      new Point(x, y),
      new Point(x + width, y),
      new Point(x + width, y + height),
      new Point(x, y + height),
    ]);
  }

  render(time) {
  }

  playerCollision() {
  }
}

class ObjectGenerator {
  constructor(game, interval) {
    this.game = game;
    this.interval = interval;
    this.lastTime = 0;
    this.time = 0;
  }

  step(time) {
    this.time += time;
    if (this.time > this.lastTime + this.interval) {
      this.lastTime = this.time;
      this.generate();
    }
  }

  generate() {
  }
}

function parsePxSize(size) {
  return parseFloat(size.split('px')[0]);
}
