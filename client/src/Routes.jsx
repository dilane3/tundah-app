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
import About from './pages/about/About'
import TermsUses from './pages/termsUses/TermsUses'
import Error404 from './pages/error404/Error404'
import ProposalPost from './pages/proposalPost/ProposalPost'
import Search from './pages/search/Search';

const Routes = () => {

	return (
    <Switch>
       <Route exact path="/" component={Wiki} /> 
      <Route  path="/wiki/feed" component={Wiki} />
      <Route  path="/signup" component={Signup} />
      <Route  path="/signin" component={Signin} />
      {/* <Route  path="/notifications" component={Notifications} /> */}
      {/* <Route  path="/messages" component={Messages} /> */}
      <Route exact path="/profile/:username" component={Profile} />
      {/* <Route  path="/about" component={About} /> */}
      {/* <Route  path="/termsuses" component={TermsUses} /> */}
      <Route  path="/posts/:id" component={SpecificPost} />
      <Route path="/proposal_posts" component={ProposalPost} />
      <Route path="/search" component={Search} />
      <Route path="/post/:id" component={SpecificPost} />
      {/* <Route path="/profil" component={Profile} /> */}
      <Route  component={Error404} />
    </Switch>
	)
}

export default Routes
