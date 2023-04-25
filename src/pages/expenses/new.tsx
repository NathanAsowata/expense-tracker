import Head from "next/head"
import styles from '../../styles/NewExpenses.module.scss'
import { FormEvent, useState } from "react"
import { db } from '../../firebase/Config'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const NewExpenses = () => {

    const [category, setCategory] = useState('');
    const [amount, setAmount]  = useState('');
    const [description, setDescription] = useState('');

   const addExpense = async (e:FormEvent) => {
    e.preventDefault()

    try {
        const docRef = await addDoc(collection(db, "expenses"), {
            amount: amount,
            category: category,
            date: serverTimestamp(),
            description: description
        });

        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
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
            <h1>Add a new expense</h1>
        
        <form className={styles.form} onSubmit={addExpense}>
            <label htmlFor="category">Select a category</label>
            <br />
            <select 
                name="category" 
                className={styles.formField} 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
                name="amount" 
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