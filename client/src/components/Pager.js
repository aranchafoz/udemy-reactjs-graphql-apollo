import React, {Component} from 'react';

class Pager extends Component {
  state = {
    pager: {
      pages: Math.ceil(Number(this.props.total) / this.props.limit)
    }
  }


  render() {
    const {actual} = this.props
    const btnPrev = (actual > 1) ? <button type="button" className="btn btn-success mr-2" onClick={this.props.pagePrev}>&laquo; Prev </button> : ''

    const {pages} = this.state.pager
    const btnNext = (actual !== pages) ? <button type="button" className="btn btn-success ml-2" onClick={this.props.pageNext}>Next &raquo;</button> : ''
    return (
      <div className="mt-5 mb-5 d-flex justify-content-center">
        {btnPrev}
        {btnNext}
      </div>
    )
  }
}

export default Pager
