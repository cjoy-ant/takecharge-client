import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import RecommendationsList from './RecommendationsList'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <RecommendationsList />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
