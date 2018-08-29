import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import SearchBearSightings from './SearchBearSightings'
import BearSighting from './BearSighting'
import CreateBearSighting from './CreateBearSighting'

const App = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to='/'>Bear Sightings</Link>
        </li>
        <li>
          <Link to='/sighting'>Submit Bear Sighting</Link>
        </li>
      </ul>

      <hr />
      <Route exact path='/' component={SearchBearSightings} />
      <Route exact path='/sighting' component={CreateBearSighting} />
      <Route exact path='/sighting/:id' component={BearSighting} />
    </div>
  </Router>
)

export default App
