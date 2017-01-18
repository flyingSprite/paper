
import Director from '../core/director';
import LineDrawing from '../components/LineDrawing';

class Wacom {

  constructor (d3) {
    this.director = new Director(d3);
  }

  draw(divId) {
    this.director.svg(divId);
    const lineDrawing = new LineDrawing(this.director);
    lineDrawing.on();
  }
}

export default Wacom;
