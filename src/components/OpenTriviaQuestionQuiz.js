import React, {Component} from "react";
import {ListGroup, ListGroupItem} from "reactstrap";

const results = [];

const style = {
    correct: {
        color: '#008000'
    },
    wrong: {
        color: '#FF0000'
    }
}

class OpenTriviaQuestionQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: undefined,
            isLoaded: false,
            counter: 0,
            data: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:10001/get-questions?category=" + this.props.category + "&amount=10")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    checkAnswer = (answer, choice) => {
        if (choice === answer) {
            results.push("✓");
        } else {
            results.push("X");
        }
        this.setState({counter: this.state.counter + 1})
    }

    render() {
        const {error, isLoaded, counter, data} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    {results.length === 0
                        ? <div>&nbsp;</div>
                        : <div>
                            {results.map((r, index) => {
                                if (r === "✓") {
                                    return <span key={index} style={style.correct}>{r}</span>;
                                } else {
                                    return <span key={index} style={style.wrong}>{r}</span>;
                                }
                            })}
                        </div>}

                    <h3>{data[counter].category}</h3>
                    <p>{data[counter].question}</p>

                    <ListGroup>
                        {data[counter].choices.map((c, index) => {
                            return (
                                // https://reactjs.org/docs/handling-events.html
                                // <ListGroupItem key={index} tag="button" action onClick={this.checkAnswer.bind(this, data[counter].answer, c)}>{c}</ListGroupItem>
                                <ListGroupItem key={index} tag="button" action onClick={(e) => this.checkAnswer(data[counter].answer, c, e)}>{c}</ListGroupItem>
                            );
                        })}
                    </ListGroup>
                </div>
            );
        }


    }
}

export default OpenTriviaQuestionQuiz;