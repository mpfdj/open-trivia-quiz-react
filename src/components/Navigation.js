import React, {Component} from 'react';

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
                        <a key={index} href={c}>{c}&nbsp;</a>
                    );
                })}
            </div>
        );
    }

}

export default Navigation;