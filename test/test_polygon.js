const { Point, Line, Polygon, solveSystem } = require('../scripts/polygon.js');
const assert = require('assert');

function testSystem() {
  const { x, y } = solveSystem(1, 2, 17, 3, 4, 39);
}

function testLineIntersection() {
  const p1 = new Point(0, 0);
  const p2 = new Point(1, 2);
  const p3 = new Point(0, 3);
  const p4 = new Point(2, 3);
  const p5 = new Point(1, 5);

  const l1 = new Line(p1, p2);
  const l2 = new Line(p3, p4);
  const l3 = new Line(p2, p5);

  assert(!l1.intersects(l2));
  assert(l2.intersects(l3));
}

function testPolyContains() {
  const p1 = new Point(1, 2);
  const p2 = new Point(2, -1);
  const p3 = new Point(1, -3);
  const p4 = new Point(-2, -3);
  const p5 = new Point(-2, 3);

  const poly = new Polygon([p1, p2, p3, p4, p5]);

  assert(poly.contains(new Point(-1, 1)));
  assert(poly.contains(new Point(1, -2)));

  assert(!poly.contains(new Point(100, 100)));
  assert(!poly.contains(new Point(100, -100)));
  assert(!poly.contains(new Point(-100, 100)));
  assert(!poly.contains(new Point(-100, -100)));
  assert(!poly.contains(new Point(1, 3)));
}

testSystem();
testLineIntersection();
testPolyContains();
console.log('PASS');
