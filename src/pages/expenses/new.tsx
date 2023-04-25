import Head from "next/head"
import styles from '../../styles/NewExpenses.module.scss'
import { FormEvent, useState } from "react"
import { db } from '../../firebase/Config'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useRouter } from "next/router"

const NewExpenses = () => {

    const router = useRouter()
    const [category, setCategory] = useState('');
    const [amount, setAmount]  = useState('');
    const [description, setDescription] = useState('');

    // this function adds the new expense to the database
   const addExpense = async (e:FormEvent) => {
    // prevent the page from reloading
    e.preventDefault()

    try {
        // add the user input to the database
        const docRef = await addDoc(collection(db, "expenses"), {
            amount: amount,
            category: category,
            date: serverTimestamp(),
            description: description
        });
        // if successful, redirect user to the dashboard
        router.push('/dashboard');
      } 
    //   if there is an error, log the error to the console
      catch (e) {
        console.error("Error adding document: ", e);
      }
   }

  return (
    <>
        <Head>
            <title>Add New Expense</title>
            <link rel="shortcut icon" href="icon.jpg" type="image/x-icon" />
        </Head>
        <div className={styles.container}>
        <form className={styles.form} onSubmit={addExpense}>

            <h2>Add a New Expense</h2>
            <label htmlFor="category">Select a category</label>
            <br />
            <select 
                id="category" 
                className={styles.formField} 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                data-testid="category"
                required
            >
                <option value="miscellaneous">Miscellaneous</option>
                <option value="housing-and-utilities">Housing and Utilities</option>
                <option value="transportation">Transportation</option>
                <option value="food-and-groceries">Foood and Groceries</option>
                <option value="entertainment">Entertainment</option>
                <option value="personal-care">Personal Care</option>
                <option value="travel">Travel</option>
                <option value="gifts-and-donations">Gifts and Donations</option>
                <option value="education">Education</option>
            </select>
            <br />
            <label htmlFor="amount"> Amount </label>
            <br />
            <input 
                id="amount" 
                type="number" 
                className={styles.formField} 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required 
            />
            <br />
            <label htmlFor="description">Description</label>
            <br />
            <textarea 
                name="description"
                id="description" 
                cols={30} 
                rows={10} 
                className={styles.formField} 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            ></textarea>
            <br />
            <button type="submit">Submit</button>
        </form>
        </div>
    </>
  )
}

export default NewExpenses