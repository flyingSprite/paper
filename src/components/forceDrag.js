

class ForceDrag {
  constructor(d3) {
    this.d3 = d3;
    this.canvas = document.querySelector('canvas');
    this.context = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.radius = 20;
  }

  draw() {
    this.circles = this.d3.range(324).map((i) => {
      return {
        x: (i % 25) * (this.radius + 1) * 2,
        y: Math.floor(i / 25) * (this.radius + 1) * 2
      };
    });

    this.simulation = this.d3.forceSimulation(this.circles)
      .force('collide', this.d3.forceCollide(this.radius + 1).iterations(4))
      .on('tick', this.drawCircles.bind(this));

    this.d3.select(this.canvas)
      .call(this.d3.drag()
          .container(this.canvas)
          .subject(this.dragsubject.bind(this))
          .on('start', this.dragstarted.bind(this))
          .on('drag', this.dragged.bind(this))
          .on('end', this.dragended.bind(this)));
  }

  drawCircles() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.save();
    this.context.beginPath();
    this.circles.forEach(this.drawCircle.bind(this));
    this.context.fill();
    this.context.strokeStyle = '#fff';
    this.context.stroke();
  }

  drawCircle(d) {
    this.context.moveTo(d.x + this.radius, d.y);
    this.context.arc(d.x, d.y, this.radius, 0, 2 * Math.PI);
  }

  dragsubject() {
    return this.simulation.find(this.d3.event.x, this.d3.event.y, this.radius);
  }

  dragstarted() {
    if (!this.d3.event.active) {
      this.simulation.alphaTarget(0.3).restart();
    }
    this.d3.event.subject.fx = this.d3.event.subject.x;
    this.d3.event.subject.fy = this.d3.event.subject.y;
  }

  dragged() {
    this.d3.event.subject.fx = this.d3.event.x;
    this.d3.event.subject.fy = this.d3.event.y;
  }

  dragended() {
    if (!this.d3.event.active) {
      this.simulation.alphaTarget(0);
    }
    this.d3.event.subject.fx = null;
    this.d3.event.subject.fy = null;
  }
}

export default ForceDrag;
