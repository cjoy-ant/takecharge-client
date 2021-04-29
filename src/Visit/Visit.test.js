import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Visit from './Visit'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const props = {      
    visit_id:"2a95459a-a929-11eb-bcbc-0242ac130002",
    visit_type:"test",
    visit_provider_name:"test",
    visit_location:"test",
    visit_date:"2021-01-01T00:00:000Z",
    visit_reason:"test",
    visit_notes:"test",
  }
  ReactDOM.render(
    <BrowserRouter>
      <Visit  {... props}/>
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
