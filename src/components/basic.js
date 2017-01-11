
class BasicComponent {

  constructor(director) {
    this.director = director;
    this.d3 = this.director.d3;
    this.layout = this.director.scene.append('g');
    this.layout.attr('transform', 'translate(0, 0)');
  }

  draw() {

  }

  // The node in first layout.
  toFront() {

  }
}

export default BasicComponent;
