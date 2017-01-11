

class StandardLayout {

  constructor(director) {
    this.director = director;
  }

  create() {
    // let width = this.director.width / 2;
    // let height = this.director.height / 2;
    return this.director.scene.append('g')
       .attr('transform', 'translate(0, 0)')
       .attr('class', 'svg-sence');
  }
}

export default StandardLayout;
