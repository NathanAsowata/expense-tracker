import Link from "next/link"
import styles from '../styles/NavBar.module.scss'

const NavBar = () => {
  return (
    <nav className={styles.nav}>
        <Link href={"/"}>
           <h1 className={styles.logo}>Expenses</h1> 
        </Link>
        <Link href={'/dashboard'}>
        <button className={styles.button}>Dashboard</button>
        </Link>
    </nav>
  )
}

export default NavBar