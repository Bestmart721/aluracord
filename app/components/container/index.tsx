import { ReactPropTypes } from 'react'
import { GlobalStyle } from '../../style'

export function Container({ children }) {
  const arr = []

  return (
    <div>
      <GlobalStyle />
      {children}
    </div>
  )
}
