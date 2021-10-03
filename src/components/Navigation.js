import React, {Component} from 'react';
import {Button} from "react-bootstrap";

class Navigation extends Component {

    constructor() {
        super();
        this.state = {categories: ["animals", "brain-teasers", "celebrities", "entertainment", "for-kids", "general", "geography", "history", "hobbies", "humanities"]};
    };

    render() {
        return (
            <div>
                {this.state.categories.map((c, index) => {
                    return (
                        <Button key={index} variant="outline-primary" href={c}>{c}</Button>
                    );
                })}
            </div>
        );
    }

}

export default Navigation;