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
      <br />
      <Link href={'/expenses/all'}> 
        <button>View all expenses</button> 
      </Link>
    </>
  )
}

export default Dashboard