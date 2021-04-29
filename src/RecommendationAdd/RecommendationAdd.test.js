import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import RecommendationAdd from './RecommendationAdd'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <RecommendationAdd />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
