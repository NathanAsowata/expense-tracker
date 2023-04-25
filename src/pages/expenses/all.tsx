import { db } from "@/firebase/Config"
import { userExpenses } from "@/utils/Interface"
import { collection, getDocs } from "firebase/firestore"
import Head from "next/head"
import { useEffect, useState } from "react"
import styles from "../../styles/AllExpenses.module.scss"

const AllExpenses = () => {

    const [expenses, setExpenses] = useState<userExpenses[]>([])

    useEffect(() => {
        const getAllExpenses = async () => {
        const getData = await getDocs(collection(db, 'expenses'))
        const items = getData.docs.map(doc => {
            return { id: doc.id, ...doc.data() } as userExpenses;
            })
        setExpenses(items)
        }
        // call the function
        getAllExpenses();
    }, [])
            

  return (
    <>
    <Head>
        <title>All expenses</title>
        <link rel="shortcut icon" href="icon.jpg" type="image/x-icon" />
    </Head>
    <h1 className={styles.heading}>All expenses</h1>
    <main className={styles.table}>
    <div className={styles.row}>
        <span>Amount</span>
        <span>Category</span>
        <span>Decription</span>
    </div>
    {expenses.map(item => {
        return(
            <div key={item.id} className={styles.row}>
                <span>{item.amount.toLocaleString()}</span>
                <span className={styles.category}>{item.category.replace(/-/g, " ")}</span>
                <span>{item.description}</span>
            </div>
        )
    })}
    </main>
    </>
  )
}

export default AllExpenses