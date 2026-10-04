export interface Holding {
  symbol: string;
  category: "Equity" | "Digital Asset" | "Cash";
  name: string;
  // Longer, plain-language explanation shown in the asset detail modal on click —
  // written for a general audience, not a technical/professional one.
  desc: string;
  // Logo path under /public/assets/tickers.
  icon: string;
  // Exact sparkline path `d` from capital-wawan.html (viewBox 0 0 200 44), drawn
  // inside the detail modal rather than inline on the chip.
  sparkline: string;
}

export const holdings: Holding[] = [
  {
    symbol: "BTC",
    category: "Digital Asset",
    name: "Bitcoin",
    desc: "Bitcoin adalah aset digital pertama dan terbesar di dunia — sering disebut 'emas digital'. Dipegang sebagai fondasi utama portofolio karena track record-nya sebagai penyimpan nilai jangka panjang, independen dari kebijakan bank sentral mana pun. Posisi ini bukan untuk trading jangka pendek, tapi keyakinan bahwa Bitcoin akan terus relevan sebagai aset langka di tengah pencetakan uang yang terus bertambah.",
    icon: "/assets/tickers/bitcoin.png",
    sparkline: "M0,30 L20,32 L40,20 L60,24 L80,12 L100,18 L120,8 L140,14 L160,4 L180,10 L200,2",
  },
  {
    symbol: "TRON",
    category: "Digital Asset",
    name: "Tron",
    desc: "TRON adalah jaringan blockchain yang jadi 'jalan tol' utama buat transaksi stablecoin (terutama USDT) di seluruh dunia — biayanya murah dan cepat. TRX dipegang bukan karena hype, tapi karena jaringan ini beneran dipakai setiap hari oleh jutaan orang untuk kirim uang digital, jadi eksposurnya lebih ke infrastruktur nyata ketimbang spekulasi semata.",
    icon: "/assets/tickers/tron.png",
    sparkline: "M0,32 L20,34 L40,26 L60,28 L80,18 L100,22 L120,12 L140,16 L160,8 L180,12 L200,4",
  },
  {
    symbol: "SGD",
    category: "Cash",
    name: "Singapore Dollar",
    desc: "Dolar Singapura adalah salah satu mata uang paling stabil di Asia, didukung kebijakan moneter yang konservatif dan cadangan devisa yang kuat. Sebagian dana disimpan dalam SGD sebagai 'bantalan' likuiditas — uang tunai yang siap dipakai kapan saja tanpa risiko volatilitas pasar saham atau kripto.",
    icon: "/assets/tickers/sgd.png",
    sparkline: "M0,22 L20,20 L40,24 L60,20 L80,22 L100,18 L120,22 L140,20 L160,24 L180,20 L200,22",
  },
  {
    symbol: "USDT",
    category: "Cash",
    name: "Tether",
    desc: "Tether (USDT) adalah stablecoin paling banyak dipakai di dunia, nilainya dipatok 1:1 ke Dolar AS. Fungsinya di portofolio ini sederhana: dry powder — uang 'siaga' dalam bentuk kripto yang gampang dipindah-pindah, siap dipakai begitu ada peluang masuk posisi baru tanpa harus menunggu proses transfer bank yang lama.",
    icon: "/assets/tickers/usdt.png",
    sparkline: "M0,22 L20,24 L40,20 L60,22 L80,20 L100,24 L120,20 L140,22 L160,20 L180,24 L200,22",
  },
  {
    symbol: "ETH",
    category: "Digital Asset",
    name: "Ethereum",
    desc: "Ethereum adalah blockchain terbesar untuk smart contract — hampir semua aplikasi DeFi, NFT, sampai token baru dibangun di atasnya. ETH dipegang sebagai eksposur inti ke 'infrastruktur internet keuangan' generasi berikutnya, di luar Bitcoin yang lebih fokus sebagai penyimpan nilai.",
    icon: "/assets/tickers/eth.png",
    sparkline: "M0,28 L20,30 L40,22 L60,26 L80,16 L100,20 L120,10 L140,16 L160,6 L180,12 L200,4",
  },
  {
    symbol: "HYPE",
    category: "Digital Asset",
    name: "Hyperliquid",
    desc: "Hyperliquid adalah exchange perpetual (trading leverage) yang berjalan sepenuhnya on-chain, tapi kecepatannya setara exchange terpusat seperti Binance. HYPE adalah token dari platform ini, dan volumenya sudah jadi salah satu yang terbesar di sektor derivatif terdesentralisasi — posisi ini adalah taruhan bahwa trading on-chain akan terus menggeser dominasi exchange tradisional.",
    icon: "/assets/tickers/hype.jpg",
    sparkline: "M0,34 L20,26 L40,30 L60,18 L80,24 L100,10 L120,20 L140,8 L160,16 L180,6 L200,2",
  },
  {
    symbol: "ASTER",
    category: "Digital Asset",
    name: "Aster",
    desc: "Aster adalah platform trading terdesentralisasi yang pertumbuhannya sangat cepat belakangan ini, menyasar pengguna yang ingin trading leverage tanpa lewat exchange terpusat. Dimasukkan sebagai diversifikasi kecil ke narasi DeFi generasi baru — bukan posisi inti, tapi eksposur ke tren yang sedang naik daun.",
    icon: "/assets/tickers/aster.png",
    sparkline: "M0,32 L20,30 L40,28 L60,24 L80,22 L100,18 L120,16 L140,12 L160,10 L180,6 L200,4",
  },
  {
    symbol: "VIRTUAL",
    category: "Digital Asset",
    name: "Virtuals Protocol",
    desc: "Virtuals Protocol adalah platform untuk membuat dan 'meluncurkan' AI agent on-chain — bayangkan seperti App Store, tapi isinya agent AI yang bisa punya wallet dan beroperasi sendiri di blockchain. VIRTUAL dipegang sebagai taruhan di persimpangan dua tren paling panas sekarang: AI dan kripto.",
    icon: "/assets/tickers/virtual.png",
    sparkline: "M0,30 L20,26 L40,28 L60,20 L80,24 L100,14 L120,18 L140,8 L160,14 L180,4 L200,2",
  },
  {
    symbol: "WLD",
    category: "Digital Asset",
    name: "Worldcoin",
    desc: "Worldcoin adalah proyek identitas digital yang memakai verifikasi biometrik (scan iris mata lewat alat bernama Orb) untuk membuktikan seseorang itu manusia asli, bukan bot atau AI. Di tengah makin susahnya membedakan manusia dan AI di internet, WLD adalah taruhan bahwa infrastruktur identitas semacam ini akan makin dibutuhkan.",
    icon: "/assets/tickers/wld.jpeg",
    sparkline: "M0,32 L20,28 L40,30 L60,22 L80,26 L100,16 L120,20 L140,10 L160,16 L180,6 L200,4",
  },
];
