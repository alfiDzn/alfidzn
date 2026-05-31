import styles from './AssetsCard.module.css'
import { TbBrandAdobeAfterEffect } from "react-icons/tb";
import Link from 'next/link'
import Image from 'next/image'

const AssetCard = ({ asset }: any) => {
    return (
        <div className={styles.card}>
            <Link href={`/catalog/${asset.slug}`} className={styles.fullCardLink} />

            <div className={styles.videoWrapper}>
                <div className={styles.platformBadge} title="Compatible with After Effects">
                    <TbBrandAdobeAfterEffect size={20} />
                </div>
                <img
                    src={asset.thumbnail}
                    alt={asset.title}
                    className={styles.video}
                />
            </div>

            <div className={styles.info}>
                <div className={styles.category}>{asset.category}</div>
                <div className={styles.title}>{asset.title}</div>
                <div className={styles.footer}>
                    <span className={styles.price}>{asset.price}</span>
                    <span style={{ fontSize: '0.8rem' }}>View Details &nbsp;→</span>
                </div>
            </div>
        </div>
    )
}

export default AssetCard