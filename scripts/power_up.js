const POWER_UP_SIZE = 30;

class PowerUp extends GravObject {
  constructor(game) {
    super(game);
    this.element = document.createElement('canvas');
    this.element.width = POWER_UP_SIZE;
    this.element.height = POWER_UP_SIZE;
    this.element.className = 'game-piece power-up';
    this.time = 0;
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
    ctx.fillStyle = 'red';
    ctx.clearRect(0, 0, this.element.width, this.element.height);
    ctx.beginPath();
    this.relativeCorners().forEach((p, i) => {
      if (i === 0) {
        ctx.moveTo(p.x, p.y);
      } else {
        ctx.lineTo(p.x, p.y);
      }
    })
    ctx.fill();
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
