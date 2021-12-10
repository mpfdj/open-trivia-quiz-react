import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import styles from "./Navigation.module.css";

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {categories: ["animals", "brain-teasers", "celebrities", "entertainment", "for-kids", "general", "geography", "history", "hobbies", "humanities"]};
    };

    render() {
        return (
            <div className={styles.navigation}>
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