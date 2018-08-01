import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'
import MainPage from './routes/MainPage'
import GamePage from './routes/GamePage'
import {connect} from 'react-redux'

class Root extends Component {
    static propTypes = {

    };

    render() {
        return (
            <Switch>
                <Route exact path="/" component={MainPage}/>
                <Route path="/game" component={GamePage}/>
            </Switch>


        )
    }
}

// export default Root

export default connect(state => ({
    signedIn: true
}), null, null, {pure: false})(Root)