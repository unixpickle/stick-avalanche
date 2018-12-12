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

  isRock() {
    return true;
  }
}

class RockGenerator {
  constructor(game) {
    this.game = game;
    this.lastTime = 0;
    this.time = 0;
  }

  step(time) {
    this.time += time;
    if (this.time > this.lastTime + ROCK_TIME) {
      this.lastTime = this.time;
      this.generateRock();
    }
  }

  generateRock() {
    const rock = new Rock(this.game);
    rock.setX(Math.random() * (this.game.width() - rock.width()));
    this.game.add(rock);
  }
}
