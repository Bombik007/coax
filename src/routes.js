import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Form from './pages/Form'
import store from './store/store'

export const Router = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route path='/user' component={Form} />
            </Switch>
        </BrowserRouter>
    </Provider>
)