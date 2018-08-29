import React from 'react'
import { compose, lifecycle } from 'recompose'
import { withRouter } from 'react-router'
import axios from 'axios'

const BearSighting = ({ loading, data }) => (
  <div>
    <h2>Bear Sighting</h2>
    {loading
      ? <p>Loading...</p>
      : (
        <div>
          <hr />
          <p><strong>Bear Type:</strong> {data.bear_type}</p>
          <p><strong>Notes:</strong> {data.notes}</p>
          <p><strong>Number of Bears:</strong> {data.num_bears}</p>
          <p><strong>Zip Code:</strong> {data.zip_code}</p>
        </div>
      )}
  </div>
)

const withBearSightingsData = lifecycle({
  state: { loading: true, data: null },
  componentDidMount() {
    axios.get(`/sighting/${this.props.match.params.id}`)
      .then(response => this.setState({ loading: false, data: response.data}))
      .catch((err) => console.log(err))
  }
})

export default compose(
  withRouter,
  withBearSightingsData
)(BearSighting)