import React, {Component} from 'react'

const style = {
    correct: {
        color: '#008000'
    },
    wrong: {
        color: '#FF0000'
    }
}


class Results extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.results.length === 0
                    ? <div>&nbsp;</div>
                    : <div>
                        {this.props.results.map((r, index) => {
                            if (r === "✓") {
                                return <span key={index} style={style.correct}>{r}</span>;
                            } else {
                                return <span key={index} style={style.wrong}>{r}</span>;
                            }
                        })}
                    </div>}
            </div>
        )
    }


}

export default Results