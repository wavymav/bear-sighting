import React from 'react'
import { compose, lifecycle } from 'recompose'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ListItem = ({ _id, bear_type, notes, num_bears, zip_code }) => (
  <div>
    <Link to={`/sighting/${_id}`}>
      <hr />
      <p><strong>Bear Type:</strong> {bear_type}</p>
      <p><strong>Notes:</strong> {notes}</p>
      <p><strong>Number of Bears:</strong> {num_bears}</p>
      <p><strong>Zip Code:</strong> {zip_code}</p>
    </Link>
  </div>
)
const SearchBearSightings = ({ loading, data }) => (
  <div>
    <h2>Bear Sightings</h2>
    {loading
      ? <p>Loading...</p>
      : data.map(item => <ListItem key={item._id} {...item} />)}
  </div>
)

const withBearSightingsData = lifecycle({
  state: { loading: true, data: null },
  componentDidMount() {
    axios.get('/sighting/search')
      .then(response => this.setState({ loading: false, data: response.data}))
      .catch((err) => console.log(err))
  }
})

export default compose(
  withBearSightingsData
)(SearchBearSightings)