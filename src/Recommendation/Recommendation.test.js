import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Recommendation from './Recommendation'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const props = {
    recommendation_id: "2a95459a-a929-11eb-bcbc-0242ac130002",
    recommendation_type: "test",
    recommendation_notes: "test"
  }
  ReactDOM.render(
    <BrowserRouter>
      <Recommendation  {... props}/>
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
