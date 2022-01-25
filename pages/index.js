function GlobalStyle() {
  return (
    <style jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font: sans-serif;
      }
    `}</style>
  )
}

function HomePage() {
  return (
    <div>
      <GlobalStyle />
      Welcome to Nextjs!
      <style jsx>{`
        div {
          background-color: red;
        }
      `}</style>
    </div>
  )
}

export default HomePage
