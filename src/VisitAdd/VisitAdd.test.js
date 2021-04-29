import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import VisitAdd from './VisitAdd'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <VisitAdd />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
