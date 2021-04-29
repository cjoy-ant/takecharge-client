import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import ProviderPage from './ProviderPage'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <ProviderPage />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
