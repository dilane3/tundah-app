import React from 'react'
import { Switch, Route } from 'react-router-dom';

import Social from './pages/social/Social'
import Wiki from './pages/wiki/Wiki'
import Signup from './pages/signup/Signup'
import Signin from './pages/signin/Signin'
import Notifications from './pages/notifications/Notifications'
import Messages from './pages/messages/Messages'
import Profile from './pages/profile/Profile'
import SpecificPost from './pages/specificPost/SpecificPost'
import Error404 from './pages/error404/Error404'

const Routes = () => {

	return (
    <Switch>
      <Route exact path="/" component={Social} />
      <Route  path="/wiki/feed" component={Wiki} />
      <Route  path="/signup" component={Signup} />
      <Route  path="/signin" component={Signin} />
      <Route  path="/notifications" component={Notifications} />
      <Route  path="/messages" component={Messages} />
      <Route exact path="/leDoyen" component={Profile} />
      <Route  path="/leDoyen/status/123" component={SpecificPost} />
      <Route  component={Error404} />
    </Switch>
	)
}

export default Routes
