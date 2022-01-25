import { GlobalStyle } from '../../style'

export function Container({ children }) {
  return (
    <div>
      <GlobalStyle />
      {children}
    </div>
  )
}
