import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import RecommendationEdit from './RecommendationEdit'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <RecommendationEdit />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
