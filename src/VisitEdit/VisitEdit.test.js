import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import VisitEdit from './VisitEdit'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <VisitEdit />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
