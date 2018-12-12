class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Line {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }

  intersects(other) {
    // For now, decide that parallel lines never
    // intersect, even if they're identical.
    if (this.p1.x === this.p2.x) {
      if (other.p1.x === other.p2.x) {
        return false;
      }
    } else {
      const m1 = (this.p1.x - this.p2.x) / (this.p1.y - this.p2.y);
      const m2 = (other.p1.x - other.p2.x) / (other.p1.y - other.p2.y);
      if (m1 === m2) {
        return false;
      }
    }

    const thisLin = this.linEquation();
    const otherLin = other.linEquation();
    const solution = solveSystem(thisLin.a, thisLin.b, thisLin.c,
      otherLin.a, otherLin.b, otherLin.c);
    if (solution.x < Math.min(this.p1.x, this.p2.x)) {
      return false;
    }
    if (solution.x > Math.max(this.p1.x, this.p2.x)) {
      return false;
    }
    if (solution.y < Math.min(this.p1.y, this.p2.y)) {
      return false;
    }
    if (solution.y > Math.max(this.p1.y, this.p2.y)) {
      return false;
    }
    return true;
  }

  linEquation() {
    const a = this.p2.y - this.p1.y;
    const b = this.p1.x - this.p2.x;
    const c = a * this.p1.x + b * this.p2.y;
    return { a: a, b: b, c: c };
  }
}

class Triangle {
  constructor(p1, p2, p3) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
  }

  contains(point) {
    // https://stackoverflow.com/questions/2049582/how-to-determine-if-a-point-is-in-a-2d-triangle
    const solution = solveSystem(this.p2.x - this.p1.x, this.p3.x - this.p1.x, point.x - this.p1.x,
      this.p2.y - this.p1.y, this.p3.y - this.p1.y, point.y - this.p1.y);
    return (solution.x >= 0 && solution.x <= 1 && solution.y >= 0 && solution.y <= 1 &&
      solution.x + solution.y <= 1);
  }
}

class Polygon {
  constructor(points) {
    this.points = points;
  }

  contains(point) {
    for (let i = 0; i < this.points.length - 2; ++i) {
      for (let j = i + 1; j < this.points.length - 1; ++j) {
        for (let k = j + 1; k < this.points.length; ++k) {
          const t = new Triangle(this.points[i], this.points[j], this.points[k]);
          if (t.contains(point)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  intersects(other) {
    for (let i = 0; i < this.points.length; ++i) {
      if (other.contains(this.points[i])) {
        return true;
      }
      const l1 = new Line(this.points[i], this.points[(i + 1) % this.points.length]);
      for (let j = 0; j < other.points.length; ++j) {
        const l2 = new Line(other.points[j], other.points[(j + 1) % other.points.length]);
        if (l1.intersects(l2)) {
          return true;
        }
      }
    }
    for (let i = 0; i < other.points.length; ++i) {
      if (this.contains(other.points[i])) {
        return true;
      }
    }
    return false;
  }
}

function solveSystem(a1, b1, c1, a2, b2, c2) {
  return {
    y: solveSystemY(a1, b1, c1, a2, b2, c2),
    x: solveSystemY(b1, a1, c1, b2, a2, c2),
  };
}

// Solve for y in a 2-D sytem of equations.
function solveSystemY(a1, b1, c1, a2, b2, c2) {
  const num = (c2 - (a2 * c1) / a1);
  const denom = b2 - (a2 * b1) / a1;
  return num / denom;
}

if ('undefined' !== typeof module) {
  module.exports = {
    Point: Point,
    Line: Line,
    Polygon: Polygon,
    solveSystem: solveSystem,
  }
}
