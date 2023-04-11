import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Workout Tracker</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <nav className={styles.nav}>
          <p className={styles.navText}>hai, im a header</p>
        </nav>
      </header>
      <main className={styles.main}>
        <div className={styles.addButton}>
          <Link href="/add-exercise">+ Add exercise</Link>
        </div>
      </main>
      <footer>
      </footer>
    </>
  )
}