import { Metadata } from "next"
import Image from "next/image"

interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

// ข้อมูลสินค้า (จำลอง) - ตรวจสอบนามสกุลไฟล์ให้ถูกต้อง
const products = [
  { id: 1, name: 'โทรศัพท์มือถือ Samsung Galaxy S24', price: 25900, description: 'สมาร์ทโฟนรุ่นล่าสุดพร้อมกล้อง AI และหน้าจอ Dynamic AMOLED 2X', image: '/products/galaxy-s24.jpg' },
  { id: 2, name: 'แล็ปท็อป MacBook Air M3', price: 42900, description: 'แล็ปท็อปบางเบาพร้อมชิป M3 ประสิทธิภาพสูงและแบตเตอรี่ใช้งานได้ยาวนาน', image: '/products/macbook-air.jpg'},
  { id: 3, name: 'หูฟังไร้สาย AirPods Pro', price: 8990, description: 'หูฟังระดับพรีเมียมพร้อม Active Noise Cancellation และ Spatial Audio', image: '/products/airpods-pro.jpg' },
  { id: 4, name: 'แท็บเล็ต iPad Air', price: 21900, description: 'แท็บเล็ตอเนกประสงค์พร้อมชิป M2 และจอ Liquid Retina ขนาด 11 นิ้ว', image: '/products/ipad-air.jpg' },
{ id: 5, name: 'โทรศัพท์มือถือ iPhone 15 Pro', price: 41900, category: 'wearable', image: '/products/iphone15-pro.jpg' },
  { id: 6, name: 'หูฟัง Sony WH-1000XM3', price: 7990, category: 'audio', image: '/products/sony-wh1000xm3.jpg' },
]



function getProductById(id: string) {
  return products.find(p => p.id === parseInt(id))
}

// ฟังก์ชันสร้าง Dynamic Metadata
export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const product = getProductById(id)
  
  if (!product) return { title: 'ไม่พบสินค้า' }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image], // แสดงรูปสินค้าเมื่อแชร์ลิงก์
    },
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    return (
      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">ไม่พบสินค้า</h1>
        <p className="text-slate-500">ขออภัย ไม่พบสินค้าที่คุณกำลังมองหา</p>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      {/* ส่วนแสดงรูปภาพสินค้า */}
      <div className="relative w-full h-80 md:h-[500px] mb-8 bg-slate-100 rounded-2xl overflow-hidden border">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority // สำคัญ: โหลดรูปภาพนี้ทันทีเพราะเป็นส่วนประกอบหลักของหน้า (LCP)
          sizes="(max-width: 1024px) 100vw, 800px"
          className="object-contain p-4" // object-contain เหมาะกับรูปสินค้าที่มีพื้นหลังขาว
        />
      </div>

      {/* ส่วนข้อมูลสินค้า */}
      <div className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
          {product.name}
        </h1>

        <div className="bg-blue-50 p-6 rounded-2xl">
          <p className="text-3xl font-bold text-blue-600">
            ฿{product.price.toLocaleString()}
          </p>
        </div>

        <div className="prose prose-slate max-w-none">
          <h2 className="text-xl font-semibold mb-2">รายละเอียดสินค้า</h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            {product.description}
          </p>
        </div>
      </div>
    </main>
  )
}