import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Navigation from './components/Navigation';
import Quiz from "./components/Quiz";
import './App.css'

// https://stackoverflow.com/questions/46820682/how-do-i-reload-a-page-with-react-router
// https://reactrouter.com/web/api/BrowserRouter
// https://stackoverflow.com/questions/47602091/how-to-use-react-router-4-0-to-refresh-current-route-not-reload-the-whole-page
// https://www.google.com/search?q=react-router+reload+same+route


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {categories: ["animals", "brain-teasers", "celebrities", "entertainment", "for-kids", "general", "geography", "history", "hobbies", "humanities"]};
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navigation/>
                    <Switch>
                        {this.state.categories.map((c, index) => {
                            return (
                                // https://learnwithparam.com/blog/how-to-pass-props-in-react-router/
                                <Route key={index} path={"/" + c} render={(props) => <Quiz {...props} category={c} />} />
                            );
                        })};
                        <Route component={Home}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;