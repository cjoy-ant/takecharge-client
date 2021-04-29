import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import ProviderEdit from './ProviderEdit'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <ProviderEdit />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
