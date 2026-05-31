import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.grid}>
                {/* Section 1: Sponsors/Tools */}
                <div className={styles.section}>
                    <h4>Main Tools</h4>
                    <ul className={styles.list}>
                        <li className={styles.listItem}><a href="#">Adobe After Effects</a> <span>↗</span></li>
                        <li className={styles.listItem}><a href="#">Coming Soon</a> <span>↗</span></li>
                        <li className={styles.listItem}><a href="#">Coming Soon</a> <span>↗</span></li>
                    </ul>
                </div>

                {/* Section 2: Site Links */}
                <div className={styles.section}>
                    <h4>Site</h4>
                    <ul className={styles.list}>
                        <li className={styles.listItem}><Link href="/">Home</Link> <span>→</span></li>
                        <li className={styles.listItem}><Link href="/catalog">Catalog</Link> <span>→</span></li>
                        <li className={styles.listItem}><Link href="/tutorials">Tutorials</Link> <span>→</span></li>
                    </ul>
                </div>

                {/* Section 3: Socials */}
                <div className={styles.section}>
                    <h4>Socials</h4>
                    <ul className={styles.list}>
                        <li className={styles.listItem}><a href="https://www.youtube.com/@alfidzn22" target="_blank" rel="noopener noreferrer"><FaYoutube />YouTube<span>↗</span></a> </li>
                        <li className={styles.listItem}><a href="https://www.instagram.com/alfidzn._" target="_blank" rel="noopener noreferrer"><FaInstagram />Instagram<span>↗</span></a> </li>
                        <li className={styles.listItem}><a href="https://www.tiktok.com/@alfidzn" target="_blank" rel="noopener noreferrer"><FaTiktok />TikTok<span>↗</span></a> </li>
                    </ul>
                </div>

                {/* Section 4: Newsletter */}
                <div className={styles.newsletter}>
                    <h4>Stay in the loop</h4>
                    <div className={styles.inputGroup}>
                        <input type="email" placeholder="Enter your email" />
                        <button className={styles.subscribeBtn}>Subscribe</button>
                    </div>
                </div>
            </div>

            <hr className={styles.hr} />

            <div className={styles.bottomBar}>
                <div className={styles.brand}>
                    <Image src="/alfi-logo.svg" alt="alfiDzn logo" width={18} height={18} />
                    alfiDzn
                </div>
                <div className={styles.legalLinks}>
                    © 2026 alfiDzn -
                    <Link href="/license"> LICENSE AGREEMENT </Link>

                    <Link href="/privacy"> PRIVACY POLICY </Link>

                    <Link href="/refund"> REFUND POLICY </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;