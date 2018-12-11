class GravObject extends GameObject {
  constructor(game) {
    super(game);
    this.element = null;
    this.velocity = 0;
    this.acceleration = 50 + 50 * Math.random();
  }

  render(time) {
    console.log('y is ' + this.y());
    this.velocity += time * this.acceleration;
    const newY = this.y() + time * this.velocity;
    this.element.style.top = newY.toFixed(5) + 'px';
    if (newY > this.game.height()) {
      this.remove();
    }
  }

  y() {
    // TODO: get element height and use negative of that
    // as the default Y.
    const yStr = this.element.style.top || '-100px';
    return parseFloat(yStr.split('px')[0]);
  }
}