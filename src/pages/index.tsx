import Head from "next/head"

const Home = () => {
  return (
   <>
    <Head>
      <title>Expense Tracker</title>
      <link rel="shortcut icon" href="icon.jpg" type="image/x-icon" />
      <meta 
        name="description" 
        content="A web app to track your personal expenses and improve your finance!" 
      />
    </Head>
    <main>
      <h1>Expense Tracker</h1>
      <p>Track your expenses easily!!!</p>
    </main>
   </>
  )
}

export default Home