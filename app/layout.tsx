import type { Metadata } from "next"
import { Bebas_Neue, Barlow } from "next/font/google"
import "./globals.css"

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
})

const barlow = Barlow({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
})

export const metadata: Metadata = {
  title: "IMGN Concept — Spesialis Bodykit Motor CB Kustom",
  description:
    "IMGN Concept — Toko spesialis bodykit motor CB kustom. Fairing, tangki, body set, dan aksesoris berkualitas tinggi untuk Honda CB.",
  keywords: [
    "bodykit motor",
    "CB kustom",
    "fairing CB",
    "bodykit CB",
    "IMGN Concept",
    "custom motorcycle",
  ],
  openGraph: {
    title: "IMGN Concept — Spesialis Bodykit Motor CB Kustom",
    description:
      "Fairing, tangki, body set, dan aksesoris berkualitas tinggi untuk Honda CB kustom.",
    type: "website",
    locale: "id_ID",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      className={`${bebasNeue.variable} ${barlow.variable} h-full`}
    >
      <body className="grain-overlay min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  )
}
