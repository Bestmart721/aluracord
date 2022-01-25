import { Container } from '../app/components'
import { STRINGS } from '../app/res'

const { HOME_PAGE } = STRINGS

function HomePage() {
  return (
    <Container>
      <h1>{HOME_PAGE.TITLE}</h1>
    </Container>
  )
}

export default HomePage
