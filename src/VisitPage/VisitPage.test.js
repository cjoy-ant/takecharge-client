import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import VisitPage from './VisitPage'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <VisitPage />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
