import supabase from '@/lib/supabase'
import AssetCard from './components/AssetsCard'
import styles from './Home.module.css'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'alfiDzn - Free After Effects Project Files & Presets',
  description: 'Free After Effects project files, presets, and tutorials for motion designers. Download PMV templates, velocity edits, and more.',
  alternates: { canonical: 'https://alfidzn.netlify.app' },
  icons: {
    icon: './alfi-logo.svg'
  }
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Where can I download free After Effects project files?',
      acceptedAnswer: { '@type': 'Answer', text: 'alfiDzn provides free After Effects project files, PMV templates, and motion presets created by Alfi, a motion designer from Indonesia. All assets are free to download and compatible with AE CC 2017+.' }
    },
    {
      '@type': 'Question',
      name: 'What plugins are needed for alfiDzn project files?',
      acceptedAnswer: { '@type': 'Answer', text: 'Most projects use plugins such as Deep Glow, Sapphire, and BCC. Each product page lists the exact plugins required before downloading.' }
    },
    {
      '@type': 'Question',
      name: 'Are alfiDzn assets free to use?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, all assets on alfiDzn are completely free to download and use for personal or commercial projects.' }
    },
    {
      '@type': 'Question',
      name: 'What type of After Effects templates does alfiDzn offer?',
      acceptedAnswer: { '@type': 'Answer', text: 'alfiDzn offers PMV templates, velocity edit project files, camera movement presets, and motion design assets for Adobe After Effects.' }
    }
  ]
}

export default async function Home() {
  const { data: assets } = await supabase
    .from('AssetsCard')
    .select('*')
    .limit(4)
    .order('created_at', { ascending: false })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className={styles.hero}>
        <h1 className={styles.title}>
          Crafting <span className={styles.accent}>Motion</span> <br />
          Beyond Limits.
        </h1>
        <p className={styles.subtitle}>
          Premium After Effects project files, presets, and tutorials tailored for motion designers.
        </p>
        <div className={styles.ctaGroup}>
          <Link href="/catalog" className={styles.primaryBtn}>Browse Catalog</Link>
          <Link href="/tutorials" className={styles.secondaryBtn}>Learn More</Link>
        </div>
      </section>

      <section className={styles.aboutSection}>
        <p>
          <strong>alfiDzn</strong> is a free resource hub for motion designers - offering After Effects project files,
          velocity edit templates, PMV presets, and tutorials. Created by Alfi, a motion designer from Indonesia.
          All assets are compatible with Adobe After Effects CC 2017+ and free to download.
        </p>
      </section>

      <div className={styles.assetGrid}>
        {(assets || []).map((asset) => (
          <AssetCard key={asset.id} asset={asset} />
        ))}
      </div>

      {assets && assets.length > 0 && (
        <div className={styles.futureBtn}>
          <Image src="/arrow-left.svg" alt="" width={20} height={20} />
          <Link href="/catalog" className={styles.thirdBtn}>View All Catalog</Link>
          <Image src="/arrow-right.svg" alt="" width={20} height={20} />
        </div>
      )}



      <section className={styles.faqSection}>
        <h2>Frequently Asked Questions</h2>
        <div className={styles.faqItem}>
          <h3>Where can I download free After Effects project files?</h3>
          <p>alfiDzn provides free After Effects project files, PMV templates, and motion presets created by Alfi, a motion designer from Indonesia. All assets are free to download and compatible with AE CC 2017+.</p>
        </div>
        <div className={styles.faqItem}>
          <h3>What plugins are needed for alfiDzn project files?</h3>
          <p>Most projects use plugins such as Deep Glow, Sapphire, and BCC. Each product page lists the exact plugins required before downloading.</p>
        </div>
        <div className={styles.faqItem}>
          <h3>Are alfiDzn assets free to use?</h3>
          <p>Yes, all assets on alfiDzn are completely free to download and use for personal or commercial projects.</p>
        </div>
        <div className={styles.faqItem}>
          <h3>What type of After Effects templates does alfiDzn offer?</h3>
          <p>alfiDzn offers PMV (Photo Music Video) templates, velocity edit project files, camera movement presets, and motion design assets for Adobe After Effects.</p>
        </div>
      </section>
    </>
  )
}