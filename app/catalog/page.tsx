'use client'

import { useState, useEffect } from 'react'
import supabase from '@/lib/supabase'
import AssetCard from '../components/AssetsCard'
import styles from './Catalog.module.css'
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export default function Catalog() {
    const [assets, setAssets] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterFree, setFilterFree] = useState(false)
    const [sortOrder, setSortOrder] = useState('none')
    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 6

    useEffect(() => {
        const getAssets = async () => {
            setLoading(true)
            const { data, error } = await supabase
                .from('AssetsCard')
                .select('*')
                .order('created_at', { ascending: false })

            if (!error) setAssets(data || [])
            setLoading(false)
        }
        getAssets()
    }, [])

    let processedAssets = [...assets]

    processedAssets = processedAssets.filter(asset =>
        asset.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (filterFree) processedAssets = processedAssets.filter(asset => asset.price === 'Free')

    if (sortOrder === 'low-high') processedAssets.sort((a, b) => a.priceValue - b.priceValue)
    else if (sortOrder === 'high-low') processedAssets.sort((a, b) => b.priceValue - a.priceValue)

    const totalPages = Math.ceil(processedAssets.length / itemsPerPage)
    const currentItems = processedAssets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    const handleFilterChange = (type: string, value: any) => {
        setCurrentPage(1)
        if (type === 'search') setSearchTerm(value)
        if (type === 'free') setFilterFree(value)
        if (type === 'sort') setSortOrder(value)
    }

    return (
        <div className={styles.storeContainer}>
            <header className={styles.header}>
                <h1 className={styles.pageTitle}>alfi's Catalog</h1>
                <p className={styles.pageSubtitle}>Premium presets and project files for After Effects.</p>

                <div className={styles.controls}>
                    <div className={styles.searchWrapper}>
                        <FaSearch className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search assets (e.g. PMV, Text...)"
                            className={styles.searchInput}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                        />
                    </div>
                    <div className={styles.filterGroup}>
                        <button
                            className={filterFree ? styles.activeFilterBtn : styles.filterBtn}
                            onClick={() => handleFilterChange('free', !filterFree)}
                        >Free</button>
                        <select className={styles.sortSelect} onChange={(e) => handleFilterChange('sort', e.target.value)}>
                            <option value="none">Default Sorting</option>
                            <option value="low-high">Price: Low to High</option>
                            <option value="high-low">Price: High to Low</option>
                        </select>
                    </div>
                </div>
            </header>

            <div className={styles.assetGrid}>
                {loading ? (
                    <p className={styles.loadingText}>Loading Assets...</p>
                ) : currentItems.length > 0 ? (
                    currentItems.map((asset) => <AssetCard key={asset.id} asset={asset} />)
                ) : (
                    <p className={styles.noResult}>No assets found for "{searchTerm}"</p>
                )}
            </div>

            {!loading && totalPages > 1 && (
                <div className={styles.pagination}>
                    <button className={styles.navBtn} disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                        <FaChevronLeft />
                    </button>
                    <div className={styles.pageNumbers}>
                        {[...Array(totalPages)].map((_, i) => (
                            <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? styles.activePage : styles.pageBtn}>
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    <button className={styles.navBtn} disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
                        <FaChevronRight />
                    </button>
                </div>
            )}
        </div>
    )
}