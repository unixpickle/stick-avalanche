class Player extends GameObject {
  constructor(game) {
    super(game);
    this.element = document.createElement('canvas');
    this.element.className = 'game-piece';
    this.element.width = 22;
    this.element.height = 45;
    this.setX(100);
    this.setY(game.height() - 45);
    this.velocity = 10;
    this.legCounter = 0;
  }

  render(time) {
    let newX = this.x() + this.velocity;
    if (newX < 0) {
      newX = 0;
      this.velocity = 10;
    } else if (newX > this.game.width() - this.width()) {
      newX = this.game.width() - this.width();
      this.velocity = -10;
    }
    this.setX(newX);
    this.velocity *= 0.9;

    super.render(time);
    const ctx = this.element.getContext('2d');
    ctx.clearRect(0, 0, this.element.width, this.element.height);
    ctx.strokeStyle = 'black';

    ctx.beginPath();
    ctx.arc(11, 10, 5, 0, Math.PI * 2, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(11, 15);
    ctx.lineTo(11, 35);
    ctx.moveTo(3, 24);
    ctx.lineTo(18, 24);
    ctx.stroke();

    this.legCounter += time * this.velocity / 2;
    const openFrac = Math.pow(Math.sin(this.legCounter), 2);
    const legX = Math.cos(openFrac + Math.PI / 2) * 7;
    const legY = Math.sin(openFrac + Math.PI / 2) * 10;
    ctx.beginPath();
    ctx.moveTo(11, 35);
    ctx.lineTo(11 + legX, 35 + legY);
    ctx.moveTo(11, 35);
    ctx.lineTo(11 - legX, 35 + legY);
    ctx.stroke();
  }
}
