const GRAV_NORMAL = 0;
const GRAV_INVERSE = 1;
const GRAV_NO_ROCKS = 2;

const GRAV_MIN_SPEED = 200;
const GRAV_SPEED_RANGE = 300;

const GRAV_INVERSE_TIME = 2.0;
const GRAV_NO_ROCKS_TIME = 3.0;

class GravState {
  constructor() {
    this.flag = GRAV_NORMAL;
    this.timeLeft = 0;
  }

  inverse() {
    this.flag = GRAV_INVERSE;
    this.timeLeft = GRAV_INVERSE_TIME;
  }

  noRocks() {
    this.flag = GRAV_NO_ROCKS;
    this.timeLeft = GRAV_NO_ROCKS_TIME;
  }

  step(time) {
    this.timeLeft -= time;
    if (this.timeLeft <= 0) {
      this.flag = GRAV_NORMAL;
      this.timeLeft = 0;
    }
  }

  acceleration(obj) {
    if (this.flag === GRAV_NORMAL) {
      return obj.acceleration;
    } else if (this.flag === GRAV_INVERSE) {
      return -obj.acceleration;
    } else if (this.flag === GRAV_NO_ROCKS) {
      if (obj.isRock()) {
        return -obj.velocity;
      } else {
        return obj.acceleration;
      }
    }
  }

  reset() {
    this.flag = GRAV_NORMAL;
  }
}

class GravObject extends GameObject {
  constructor(game) {
    super(game);
    this.element = null;
    this.velocity = 0;
    this.acceleration = GRAV_MIN_SPEED + GRAV_SPEED_RANGE * Math.random();
  }

  render(time) {
    this.velocity += time * this.game.gravState.acceleration(this);
    const newY = this.y() + time * this.velocity;
    this.element.style.top = newY.toFixed(5) + 'px';
    if (newY > this.game.height()) {
      this.remove();
    }
  }

  isRock() {
    return false;
  }
}
