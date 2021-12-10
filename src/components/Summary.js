import React, {Component} from 'react'
import {Button} from "react-bootstrap";

class Summary extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let score = this.props.data.score;
        let length = this.props.data.data.length;
        let category = this.props.data.data[0].category;
        let percent = (score / length * 100)
        return (
            <div>
                <h3>You got {score} out of {this.props.data.data.length} correct</h3>
                <h3>{this.createScoreMessage(percent)}</h3>
                <Button variant="outline-primary" href={category}>Take again</Button>
            </div>
        )
    }

    createScoreMessage(percent) {
        let message = ""
        if (percent === 100) {
            message = "Perfect Score!"
        } else if (percent > 80) {
            message = "Awesome Job!"
        } else if (percent < 80 && percent > 50) {
            message = "You Did Ok!"
        } else {
            message = "Don't Quit your Day Job!"
        }
        return message
    }
}

export default Summary