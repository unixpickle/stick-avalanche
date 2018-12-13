const POWER_UP_SIZE = 30;
const POWER_UP_TIME = 5;

const POWER_UP_INVERSE = 0;
const POWER_UP_NO_ROCKS = 1;
const POWER_UP_INVINCIBLE = 2;

class PowerUp extends GravObject {
  constructor(game) {
    super(game);
    this.element = document.createElement('canvas');
    this.element.width = POWER_UP_SIZE;
    this.element.height = POWER_UP_SIZE;
    this.element.className = 'game-piece power-up';
    this.time = 0;
    this.type = Math.floor(Math.random() * (3 - 0.0001));
  }

  bounds() {
    const x = this.x();
    const y = this.y();
    return new Polygon(this.relativeCorners().map((p) => new Point(p.x + x, p.y + y)));
  }

  render(time) {
    super.render(time);
    this.time += time;
    const ctx = this.element.getContext('2d');
    if (this.type === POWER_UP_INVERSE) {
      ctx.fillStyle = 'yellow';
    } else if (this.type === POWER_UP_NO_ROCKS) {
      ctx.fillStyle = 'green';
    } else if (this.type === POWER_UP_INVINCIBLE) {
      ctx.fillStyle = 'orange';
    }
    ctx.clearRect(0, 0, this.element.width, this.element.height);
    ctx.beginPath();
    this.relativeCorners().forEach((p, i) => {
      if (i === 0) {
        ctx.moveTo(p.x, p.y);
      } else {
        ctx.lineTo(p.x, p.y);
      }
    });
    ctx.fill();
  }

  playerCollision() {
    if (this.type === POWER_UP_INVERSE) {
      this.game.gravState.inverse();
    } else if (this.type === POWER_UP_NO_ROCKS) {
      this.game.gravState.noRocks();
    } else if (this.type === POWER_UP_INVINCIBLE) {
      this.game.invincibleTimer = Math.random() * 5 + 3;
    }
    this.remove();
  }

  relativeCorners() {
    const angle = (this.time * 2) % (Math.PI * 2);
    const r = POWER_UP_SIZE / 2;
    return [
      new Point(r + r * Math.cos(angle), r + r * Math.sin(angle)),
      new Point(r + r * Math.cos(angle + Math.PI / 2), r + r * Math.sin(angle + Math.PI / 2)),
      new Point(r + r * Math.cos(angle + Math.PI), r + r * Math.sin(angle + Math.PI)),
      new Point(r + r * Math.cos(angle + 3 * Math.PI / 2),
        r + r * Math.sin(angle + 3 * Math.PI / 2)),
    ];
  }
}

class PowerUpGenerator extends ObjectGenerator {
  constructor(game) {
    super(game, POWER_UP_TIME);
  }

  generate() {
    if (this.game.gravState.flag === GRAV_INVERSE) {
      return;
    }
    const pu = new PowerUp(this.game);
    pu.setX(Math.random() * (this.game.width() - pu.width()));
    this.game.add(pu);
  }
}
