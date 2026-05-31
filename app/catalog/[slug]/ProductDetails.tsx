'use client'

import { useState } from 'react'
import Link from 'next/link'
import supabase from '@/lib/supabase'
import styles from './ProductDetails.module.css'
import { LiaDownloadSolid } from 'react-icons/lia'
import { PiShoppingCartSimple } from 'react-icons/pi'
import { IoResizeOutline, IoCalendarOutline, IoCloseOutline } from 'react-icons/io5'
import { FaPlay, FaCheck } from 'react-icons/fa'
import { TbBrandAdobeAfterEffect } from "react-icons/tb";
import { FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa'

export default function ProductDetailClient({ asset }: { asset: any }) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [timer, setTimer] = useState(10)
    const [canDownload, setCanDownload] = useState(false)

    const handleActionClick = (e: React.MouseEvent) => {
        if (asset.price === 'Free') {
            e.preventDefault()
            setShowModal(true)
            setTimer(10)
            setCanDownload(false)

            const interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval)
                        setCanDownload(true)
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
        }
    }

    const getYouTubeID = (url: string) => {
        if (!url) return null
        const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/)
        return match && match[2].length === 11 ? match[2] : null
    }

    const currentMedia = asset.gallery?.[activeIndex]
    const isYouTube = currentMedia?.type === 'video' && (currentMedia.url.includes('youtube.com') || currentMedia.url.includes('youtu.be'))

    return (
        <div className={styles.container}>
            <Link href="/catalog" className={styles.backBtn}>← Back to Catalog</Link>

            <div className={styles.grid}>
                <div className={styles.previewSection}>
                    <div className={styles.mainDisplay}>
                        {!currentMedia ? (
                            <img src={asset.thumbnail} className={styles.mainMedia} alt={asset.title} />
                        ) : currentMedia.type === 'video' ? (
                            isYouTube ? (
                                <iframe
                                    src={`https://www.youtube.com/embed/${getYouTubeID(currentMedia.url)}?autoplay=1&mute=1&rel=0`}
                                    title={asset.title}
                                    className={styles.mainMedia}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <video src={currentMedia.url} autoPlay muted controls className={styles.mainMedia} />
                            )
                        ) : (
                            <img src={currentMedia.url} alt={asset.title} className={styles.mainMedia} />
                        )}
                    </div>

                    <div className={styles.galleryNav}>
                        {asset.gallery?.map((item: any, index: number) => (
                            <div
                                key={index}
                                className={`${styles.navItem} ${activeIndex === index ? styles.activeNav : ''}`}
                                onClick={() => setActiveIndex(index)}
                            >
                                {item.type === 'video' ? (
                                    <div className={styles.videoPlaceholder}>
                                        <FaPlay className={styles.playIconSmall} />
                                        <span>Preview</span>
                                    </div>
                                ) : (
                                    <img src={item.url} alt={`Thumbnail ${index}`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.info}>
                    <span className={styles.accent}>{asset.category}</span>
                    <h1 className={styles.title}>{asset.title}</h1>
                    <p className={styles.price}>{asset.price}</p>

                    <div className={styles.description}>
                        <h3>Description</h3>
                        <p>{asset.description}</p>
                        <br />
                        <div className={styles.attributes}>
                            <p className={styles.fileSize}><IoResizeOutline /> File size: {asset.fileSize} MB</p>
                            <p className={styles.fileSize}><IoCalendarOutline /> Release Date: {asset.releaseDate}</p>
                            <p className={styles.fileSize}><TbBrandAdobeAfterEffect className={styles.aeIcon} /> {asset.aeSupport}</p>
                        </div>
                    </div>

                    <a className={styles.actionBtn} onClick={handleActionClick}>
                        {asset.price === 'Free' ? (
                            <><LiaDownloadSolid className={styles.downloadIcon} /> Download for Free</>
                        ) : (
                            <><PiShoppingCartSimple className={styles.downloadIcon} /> Buy Now - {asset.price}</>
                        )}
                    </a>
                </div>
            </div>

            {showModal && (
                <div className={styles.overlay}>
                    <div className={styles.modalCard}>
                        <div className={styles.leftSection}>
                            <span className={styles.badge}>THANK YOU</span>
                            <h2 className={styles.modalTitle}>Support the <span className={styles.accent}>Journey.</span></h2>
                            <p className={styles.modalSubtitle}>
                                If this asset helps your project, please consider following or supporting me so I can continue sharing free assets.
                            </p>
                            <div className={styles.socialGrid}>
                                <a href="https://youtube.com/alfidzn22" className={styles.socialLink} target="_blank"><FaYoutube className={styles.socialIcon} /> YouTube</a>
                                <a href="https://instagram.com/alfidzn._" className={styles.socialLink} target="_blank"><FaInstagram className={styles.socialIcon} /> Instagram</a>
                                <a href="https://tiktok.com/@alfidzn" className={styles.socialLink} target="_blank"><FaTiktok className={styles.socialIcon} /> TikTok</a>
                            </div>
                            <button className={styles.supportBtn} onClick={() => window.open('/donation', '_blank')}>Buy me a Coffee</button>
                        </div>

                        <div className={styles.rightSection}>
                            <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                                <IoCloseOutline />
                            </button>
                            <h2 className={styles.rightTitle}>Preparing your file...</h2>
                            <p className={styles.modalSubtitle}>Please wait a moment while we process your high-speed link.</p>

                            <div className={styles.timerCircle}>
                                {timer > 0 ? (
                                    <svg className={styles.timerSvg} viewBox="0 0 100 100">
                                        <circle className={styles.timerBar} cx="50" cy="50" r="45" fill="none" stroke="var(--accent-color)" strokeWidth="6" strokeLinecap="round" />
                                    </svg>
                                ) : (
                                    <svg className={styles.timerStatic} viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" fill="none" stroke="#333" strokeWidth="6" />
                                    </svg>
                                )}
                                <span className={styles.timerText}>
                                    {timer > 0 ? timer : <FaCheck className={styles.checkIcon} />}
                                </span>
                            </div>

                            <div className={styles.adPlaceholder}>
                                <span>Advertisement</span>
                            </div>

                            <button
                                className={styles.finalDownloadBtn}
                                disabled={!canDownload}
                                onClick={async () => {
                                    try {
                                        const { data, error } = await supabase
                                            .from('AssetsCard')
                                            .select('actionUrl')
                                            .eq('slug', asset.slug)
                                            .single()

                                        if (error) { alert('Gagal mengambil link.'); return }
                                        if (data?.actionUrl) { window.open(data.actionUrl, '_blank'); setShowModal(false) }
                                        else alert('Link tidak ditemukan.')
                                    } catch (err) {
                                        console.error('Error:', err)
                                    }
                                }}
                            >
                                <LiaDownloadSolid className={styles.downloadIcon} />
                                {canDownload ? 'Download Now' : `Wait ${timer}s...`}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}