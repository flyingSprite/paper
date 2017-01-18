
import BasicComponent from '../core/basic';

class BrushBackground extends BasicComponent {
  constructor(director) {
    super(director);
  }

  gen() {
    const self = this;
    function brushed() {
      var s = self.d3.event.selection;
      console.log(s);
    }

    function brushended() {
    }
    this.layout.attr('class', 'brush')
    .call(self.d3.brush()
      .on('start brush', brushed)
      .on('end', brushended));
  }
}

export default BrushBackground;
