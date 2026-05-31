'use client'

import styles from './Navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { LuHandHeart } from 'react-icons/lu'

const Navbar = () => {
    const [isActive, setIsActive] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const navRef = useRef<HTMLDivElement>(null)

    const toggleMenu = () => setIsActive(!isActive)

    const handleClickOutside = (e: MouseEvent) => {
        if (navRef.current && !navRef.current.contains(e.target as Node)) {
            setIsActive(false)
        }
    }

    useEffect(() => {
        if (isActive) document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isActive])

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.navContent}>

                <div className={styles.menuBar}>
                    <div className={styles.menuIcon} onClick={toggleMenu}>
                        <span className={`${styles.list} ${isActive ? styles.active : ''}`}></span>
                        <span className={`${styles.list} ${isActive ? styles.active : ''}`}></span>
                        <span className={`${styles.list} ${isActive ? styles.active : ''}`}></span>
                    </div>
                </div>

                <div className={`${styles.mobileNav} ${isActive ? styles.active : ''}`} ref={navRef}>
                    <div className={styles.navLinks2}>
                        <Link href="/" className={styles.navLink2}>Home</Link>
                        <Link href="/catalog" className={styles.navLink2}>Catalog</Link>
                        <Link href="/tutorials" className={styles.navLink2}>Tutorials</Link>
                    </div>
                    <div className={styles.navContact2}>
                        <Link href="/donation" className={styles.navContactLink2}>
                            Donate<LuHandHeart />
                        </Link>
                    </div>
                </div>

                <div className={styles.navLogo}>
                    <Image src="/alfi-logo.svg" alt="logo" width={20} height={20} />
                    <h2 className={styles.navTitle}>alfiDzn</h2>
                </div>

                <div className={styles.navLinks}>
                    <Link href="/" className={styles.navLink}>Home</Link>
                    <Link href="/catalog" className={styles.navLink}>Catalog</Link>
                    <Link href="/tutorials" className={styles.navLink}>Tutorials</Link>
                </div>

                <div className={styles.navContact}>
                    <Link href="/donation" className={styles.navContactLink}>
                        Donate<LuHandHeart />
                    </Link>
                </div>

            </div>
        </nav>
    )
}

export default Navbar