const PLAYER_VELOCITY_DECAY = 0.003;
const PLAYER_VELOCITY_RATE = 150;
const PLAYER_BOUNCE_VELOCITY = 20;

class Player extends GameObject {
  constructor(game) {
    super(game);
    this.element = document.createElement('canvas');
    this.element.className = 'game-piece';
    this.element.width = 22;
    this.element.height = 40;
    this.setX(200);
    this.setY(game.height() - 40);
    this.velocity = 0;
    this.legCounter = 0;
  }

  render(time) {
    let newX = this.x() + this.velocity;
    if (newX < 0) {
      newX = 0;
      this.velocity = PLAYER_BOUNCE_VELOCITY;
    } else if (newX > this.game.width() - this.width()) {
      newX = this.game.width() - this.width();
      this.velocity = -PLAYER_BOUNCE_VELOCITY;
    }
    this.setX(newX);
    this.velocity += this.game.arrowPressed * time * PLAYER_VELOCITY_RATE;
    this.velocity = this.velocity;
    this.velocity *= Math.pow(PLAYER_VELOCITY_DECAY, time);

    super.render(time);
    const ctx = this.element.getContext('2d');
    ctx.clearRect(0, 0, this.element.width, this.element.height);
    ctx.strokeStyle = 'black';
    if (this.game.invincible()) {
      ctx.strokeStyle = '#999';
    }

    ctx.beginPath();
    ctx.arc(11, 6, 5, 0, Math.PI * 2, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(11, 11);
    ctx.lineTo(11, 30);
    ctx.moveTo(3, 19);
    ctx.lineTo(18, 19);
    ctx.stroke();

    this.legCounter += time * this.velocity / 2;
    const openFrac = Math.pow(Math.sin(this.legCounter), 2);
    const legX = Math.cos(openFrac + Math.PI / 2) * 7;
    const legY = Math.sin(openFrac + Math.PI / 2) * 10;
    ctx.beginPath();
    ctx.moveTo(11, 30);
    ctx.lineTo(11 + legX, 30 + legY);
    ctx.moveTo(11, 30);
    ctx.lineTo(11 - legX, 30 + legY);
    ctx.stroke();
  }
}
