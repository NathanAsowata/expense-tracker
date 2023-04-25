import Head from "next/head"
import Link from "next/link"

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Dashboard - Expenses</title>
        <link rel="shortcut icon" href="icon.jpg" type="image/x-icon" />
      </Head>
      <Link href={'/expenses/new'}> 
        <button>Add New Expenses</button> 
      </Link>
      <h1>Your spending habits</h1>
    </>
  )
}

export default Dashboard