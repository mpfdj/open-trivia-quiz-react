import React, {Component} from "react";
import {Button, ListGroup, ListGroupItem} from "react-bootstrap";
import Scorebox from "./Scorebox";
import Summary from "./Summary";
import Results from "./Results";

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: undefined,
            isLoaded: false,
            counter: 0,
            results: [],
            score: 0,
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
            this.state.results.push("✓");
            this.state.score = this.state.score + 1
        } else {
            this.state.results.push("X");
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
                    {/* Pass the whole state object here */}
                    <Scorebox data={this.state}/>
                    <Results results={this.state.results}/>

                    {counter < data.length
                        ? <div>
                            <p>{data[counter].question}</p>

                            <ListGroup>
                                {data[counter].choices.map((c, index) => {
                                    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
                                    return (
                                        // https://reactjs.org/docs/handling-events.html
                                        // <ListGroupItem key={index} tag="button" action onClick={this.checkAnswer.bind(this, data[counter].answer, c)}>{c}</ListGroupItem>
                                        <ListGroupItem key={index} variant="info" action onClick={(e) => this.checkAnswer(data[counter].answer, c, e)}>
                                            <Button key={index} variant="primary">{alphabet[index]}</Button>
                                            <span className="choice">{c}</span>
                                        </ListGroupItem>
                                    );
                                })}
                            </ListGroup></div>
                        : <div>
                            {/* Pass the whole state object here */}
                            <Summary data={this.state}/>
                        </div>}

                </div>
            );
        }
    }
}

export default Quiz;