import React, {Component} from 'react'

class Scorebox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // console.log(this.props);
        let category = this.props.data.data[0].category;
        let counter = this.props.data.counter;
        let length = this.props.data.data.length;
        let score = this.props.data.score;
        return (
            <div>
                Category: {category}<br/>
                Question {counter} of {length}<br/>
                Score: <strong>{score}</strong>
            </div>
        )
    }
}

export default Scorebox