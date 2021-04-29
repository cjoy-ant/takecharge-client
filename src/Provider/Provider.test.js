import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Provider from './Provider'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const props = {
    hcp_id: "2a95459a-a929-11eb-bcbc-0242ac130002",
    hcp_type: "test",
    hcp_name: "test",
    hcp_location: "test",
    hcp_phone: "test",
    hcp_address_street: "test",
    hcp_address_city: "test",
    hcp_address_state: "test",
    hcp_address_zip: "test",
    encodedAddress: "test",  
  }
  ReactDOM.render(
    <BrowserRouter>
      <Provider {... props}/>
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
