import type { Metadata } from 'next'
import { Prompt } from 'next/font/google' //
import Link from 'next/link'
import './globals.css'
import { Separator } from "@/components/ui/separator"

// *** ส่วนที่ 1: การจัดการ Fonts (Google Fonts Optimization) ***
//
export const prompt = Prompt({
  weight: ['300', '400', '500', '600', '700'], // เลือกน้ำหนักฟอนต์ที่จำเป็น
  subsets: ['thai', 'latin'], // รองรับทั้งภาษาไทยและอังกฤษ
  display: 'swap', // แสดง fallback font ระหว่างรอโหลด ช่วยให้ผู้ใช้เห็นข้อความทันที
  variable: '--font-prompt', // สร้าง CSS variable สำหรับใช้งาน
})

// *** ส่วนที่ 2: การจัดการ Metadata (SEO & Social Media) ***
//
export const metadata: Metadata = {
  title: {
    default: 'My Next.js App', // ชื่อหน้าเริ่มต้น
    template: '%s | My Next.js App' // รูปแบบชื่อหน้าที่จะไปปรากฏในหน้าอื่นๆ
  },
  description: 'เว็บแอปพลิเคชันที่สร้างด้วย Next.js 16 พร้อมฟีเจอร์ Cache Component', //
  keywords: ['Next.js', 'React', 'Web Development', 'TypeScript'], //
  authors: [{ name: 'Your Name' }],
  metadataBase: new URL('https://yourdomain.com'), // จำเป็นสำหรับการสร้าง URL ของรูปภาพแชร์
  
  // Metadata สำหรับการแชร์บน Facebook/Line
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    url: 'https://yourdomain.com',
    siteName: 'My Next.js App',
    images: [
      {
        url: '/og-image.jpg', // รูปภาพขนาด 1200x630 pixels
        width: 1200,
        height: 630,
        alt: 'My Next.js App'
      }
    ]
  },
  
  // Metadata สำหรับการแชร์บน X (Twitter)
  twitter: {
    card: 'summary_large_image', // แสดงรูปภาพขนาดใหญ่
    images: ['/x-image.jpg'],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // การนำฟอนต์ไปใช้ในระดับ html และ body
    <html lang="th" className={prompt.variable}>
      <body className={`${prompt.className} antialiased min-h-screen bg-white`}>
        {/* Navigation Bar พร้อมดีไซน์ Sticky และ Blur */}
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="container mx-auto flex h-16 items-center px-4">
            <Link href="/" className="flex items-center space-x-2 mr-8">
              <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                NextApp
              </span>
            </Link>
            
            <nav className="flex flex-1 items-center space-x-4 text-sm font-medium text-slate-600">
              <Link href="/" className="hover:text-slate-900 transition-colors">
                หน้าหลัก
              </Link>
              <Separator orientation="vertical" className="h-4" /> {/* เส้นคั่นแนวตั้ง */}
              <Link href="/about" className="hover:text-slate-900 transition-colors">
                เกี่ยวกับเรา
              </Link>
              <Separator orientation="vertical" className="h-4" />
              <Link href="/products" className="hover:text-slate-900 transition-colors">
                สินค้า
              </Link>
            </nav>
          </div>
        </header>
        
        {/* ส่วนเนื้อหาหลัก จัดกึ่งกลางด้วย container */}
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}