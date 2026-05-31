import { Metadata } from 'next'
import supabase from '@/lib/supabase'
import ProductDetailClient from './ProductDetails'

// ISR — revalidate tiap 1 jam
export const revalidate = 3600

// Generate static params untuk semua produk
export async function generateStaticParams() {
    const { data } = await supabase.from('AssetsCard').select('slug')
    return (data || []).map((item) => ({ slug: item.slug }))
}

// Metadata dinamis per produk — ini yang dibaca Google & AI crawler
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const { data } = await supabase.from('AssetsCard').select('title, description, aeSupport, thumbnail').eq('slug', slug).single()

    if (!data) return { title: 'Not Found' }

    return {
        title: `${data.title} — Free After Effects Project | alfiDzn`,
        description: `Download ${data.title} for free. Compatible with AE ${data.aeSupport}.`,
        openGraph: {
            title: data.title,
            description: data.description,
            images: [data.thumbnail],
        }
    }
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const { data: asset } = await supabase
        .from('AssetsCard')
        .select('aeSupport, category, description, fileSize, gallery, id, price, priceValue, releaseDate, thumbnail, title, slug')
        .eq('slug', slug)
        .single()

    if (!asset) return <div>Asset not found.</div>

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: asset.title,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Windows, macOS',
        offers: { '@type': 'Offer', price: asset.priceValue ?? '0', priceCurrency: 'USD' },
        description: asset.description,
        fileSize: `${asset.fileSize} MB`,
        datePublished: asset.releaseDate,
        author: { '@type': 'Person', name: 'Alfi', url: 'https://alfidzn.netlify.app' },
        url: `https://alfidzn.netlify.app/catalog/${asset.slug}`
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <ProductDetailClient asset={asset} />
        </>
    )
}