import Link from "next/link";
import styles from '../styles/Footer.module.scss'

const Footer = () => {

    let date = new Date();

  return (
    <footer className={styles.footer}>
        <p>
            &copy; {date.getFullYear()} Designed and built by &nbsp;
            <Link href={'http://www.nathanasowata.com/'} target={'_blank'}>
                Nathan Asowata
            </Link>. &nbsp; 
            All rights reserved.
        </p>
    </footer>
  )
}

export default Footer