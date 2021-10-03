import React, {Component} from 'react'

class Scorebox extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        console.log(this.props.data);

        return (

            <div>
                {/*Question <strong>{this.props.current + 1}</strong> of <strong>{this.props.questions.length}</strong><br />*/}
                {/*<strong>Score </strong><span className="score">{this.props.score}</span>*/}
                This is the score box

            </div>
        )
    }
}

export default Scorebox