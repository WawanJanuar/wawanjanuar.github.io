export interface Holding {
  symbol: string;
  category: "Equity" | "Digital Asset" | "Cash";
  name: string;
  desc: string;
  // Path under public/assets/tickers/. Absent for Cash holdings (no profile image by design).
  logo?: string;
  // Exact sparkline path `d` from capital-wawan.html (viewBox 0 0 200 44).
  sparkline: string;
}

export const holdings: Holding[] = [
  {
    symbol: "IDX: PANI",
    category: "Equity",
    name: "Pantai Indah Kapuk Dua",
    desc: "Posisi di sektor properti dan kawasan terintegrasi domestik, dipegang atas dasar valuasi jangka panjang dan prospek pengembangan kawasan.",
    logo: "/assets/tickers/pani.png",
    sparkline: "M0,34 L20,30 L40,32 L60,22 L80,26 L100,16 L120,20 L140,10 L160,14 L180,6 L200,8",
  },
  {
    symbol: "BTC",
    category: "Digital Asset",
    name: "Bitcoin",
    desc: "Aset dasar dari seluruh portofolio kripto kami — dipegang sebagai penyimpan nilai jangka panjang dan tolok ukur terhadap seluruh aset digital lain.",
    logo: "/assets/tickers/bitcoin.png",
    sparkline: "M0,30 L20,32 L40,20 L60,24 L80,12 L100,18 L120,8 L140,14 L160,4 L180,10 L200,2",
  },
  {
    symbol: "AAVE",
    category: "Digital Asset",
    name: "Aave",
    desc: "Eksposur pada protokol lending terdesentralisasi terbesar di ranah DeFi, dipegang atas dasar adopsi on-chain yang matang dan mekanisme suku bunga pasar yang efisien.",
    logo: "/assets/tickers/aave.png",
    sparkline: "M0,34 L20,26 L40,28 L60,24 L80,16 L100,20 L120,10 L140,14 L160,6 L180,10 L200,2",
  },
  {
    symbol: "TRON",
    category: "Digital Asset",
    name: "Tron",
    desc: "Eksposur pada infrastruktur blockchain dengan volume transaksi stablecoin yang tinggi, dipilih atas dasar adopsi jaringan yang luas dan biaya transaksi yang kompetitif.",
    logo: "/assets/tickers/tron.png",
    sparkline: "M0,30 L20,34 L40,24 L60,28 L80,18 L100,22 L120,12 L140,16 L160,8 L180,12 L200,4",
  },
  {
    symbol: "SGD",
    category: "Cash",
    name: "Singapore Dollar",
    desc: "Cadangan tunai lintas mata uang yang menjaga fleksibilitas portofolio dan bertindak sebagai penyangga terhadap volatilitas pasar domestik maupun global.",
    sparkline: "M0,22 L20,20 L40,23 L60,19 L80,22 L100,18 L120,21 L140,17 L160,20 L180,16 L200,18",
  },
  {
    symbol: "USDT",
    category: "Cash",
    name: "Tether",
    desc: "Stablecoin yang dipegang sebagai instrumen likuiditas di ranah kripto — dry powder untuk memanfaatkan peluang pasar tanpa harus keluar-masuk mata uang fiat.",
    sparkline: "M0,20 L20,21 L40,19 L60,22 L80,20 L100,21 L120,19 L140,20 L160,21 L180,19 L200,20",
  },
];
