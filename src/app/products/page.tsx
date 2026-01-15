import Link from 'next/link'

interface ProductsPageProps {
    searchParams: Promise<{
        search?: string;
    }>;
}

const products = [
    { id: 1, name: 'โทรศัพท์มือถือ Samsung Galaxy S24', price: 25900, category: 'phone' },
    { id: 2, name: 'โน้ตบุ๊ก MacBook Air M3', price: 42900, category: 'laptop' },
    { id: 3, name: 'หูฟังไร้สาย AirPods Pro', price: 8990, category: 'audio' },
    { id: 4, name: 'แท็บเล็ต iPad Air', price: 21900, category: 'tablet' },
    { id: 5, name: 'โทรศัพท์มือถือ iPhone 15 Pro', price: 39900, category: 'phone' },
    { id: 6, name: 'หูฟัง Sony WH-1000XM3', price: 12900, category: 'audio' },
];

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const { search } = await searchParams;

    const filteredProducts = search
        ? products.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
        )
        : products;

    return (
        <main style={{ padding: '2rem' }}>
            <h1 style={{ marginBottom: '1.5rem' }}>รายการสินค้า</h1>

            text
            <form style={{ marginBottom: '2rem' }}>
                <input
                    type="text"
                    name="search"
                    defaultValue={search || ''}
                    placeholder="พิมพ์คำค้นหา..."
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        fontSize: '1rem',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                    }}
                />
            </form>

            {filteredProducts.length === 0 ? (
                <p style={{ color: '#666' }}>ไม่พบสินค้าที่ค้นหา</p>
            ) : (
                <>
                    <p style={{ marginBottom: '1rem', color: '#666' }}>
                        พบ {filteredProducts.length} รายการ
                        {search && ` สำหรับ "${search}"`}
                    </p>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {filteredProducts.map((product) => (
                            <Link
                                key={product.id}
                                href={`/products/${product.id}`}
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    display: 'block',
                                }}
                            >
                                <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                                    {product.name}
                                </h2>
                                <p style={{ color: '#0070f3', fontWeight: 'bold' }}>
                                    ฿{product.price.toLocaleString()}
                                </p>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </main>
    );
}