import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import VisitsList from './VisitsList'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <VisitsList  />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
