const ROCK_TIME = 0.3;

class Rock extends GravObject {
  constructor(game) {
    super(game);
    this.element = document.createElement('canvas');
    this.element.width = 25;
    this.element.height = 35;
    this.element.className = 'game-piece rock';
    this.time = 0;
  }

  bounds() {
    const x = this.x();
    const y = this.y();
    const width = this.width();
    const height = this.height();
    return new Polygon([
      new Point(x, y),
      new Point(x + width / 2, y + height),
      new Point(x + width, y),
    ]);
  }

  render(time) {
    super.render(time);
    this.time += time;
    const ctx = this.element.getContext('2d');
    ctx.clearRect(0, 0, this.element.width, this.element.height);
    const randOffset = Math.round((this.time * 30) % 30);
    for (let y = 0; y < this.element.height; ++y) {
      const fracWide = 1 - y / this.element.height;
      const offset = fracWide * this.element.width / 2
      for (let x = 0; x < 2 * offset; ++x) {
        const bx = ((x + randOffset) % (2 * offset)) - offset + this.element.width / 2;
        const brightness = ((133 * y + 150 * x) % 39) / 39;
        const bs = Math.round(brightness * 255);
        ctx.fillStyle = 'rgba(' + bs + ',' + bs + ',' + bs + ',1.0)';
        ctx.fillRect(bx, y, 1, 1);
      }
    }
  }

  playerCollision() {
    if (!this.game.invincible()) {
      this.game.gameOver();
    }
  }

  isRock() {
    return true;
  }
}

class RockGenerator extends ObjectGenerator {
  constructor(game) {
    super(game, ROCK_TIME);
  }

  generate() {
    if (this.game.gravState.flag !== GRAV_NORMAL) {
      return;
    }
    const rock = new Rock(this.game);
    rock.setX(Math.random() * (this.game.width() - rock.width()));
    this.game.add(rock);
  }
}
