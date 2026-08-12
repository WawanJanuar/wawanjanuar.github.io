export interface Holding {
  symbol: string;
  category: "Equity" | "Digital Asset" | "Cash";
  name: string;
  desc: string;
  // Authored, not derived — matches capital-wawan.html's literal .ticker-trend content.
  trend: "up" | "flat";
  trendLabel: string;
  // Exact sparkline path `d` from capital-wawan.html (viewBox 0 0 200 44).
  sparkline: string;
}

export const holdings: Holding[] = [
  {
    symbol: "IDX: PANI",
    category: "Equity",
    name: "Pantai Indah Kapuk Dua",
    desc: "Posisi di sektor properti dan kawasan terintegrasi domestik, dipegang atas dasar valuasi jangka panjang dan prospek pengembangan kawasan.",
    trend: "up",
    trendLabel: "+6.5%",
    sparkline: "M0,34 L20,30 L40,32 L60,22 L80,26 L100,16 L120,20 L140,10 L160,14 L180,6 L200,8",
  },
  {
    symbol: "BTC",
    category: "Digital Asset",
    name: "Bitcoin",
    desc: "Aset dasar dari seluruh portofolio kripto kami — dipegang sebagai penyimpan nilai jangka panjang dan tolok ukur terhadap seluruh aset digital lain.",
    trend: "up",
    trendLabel: "+7.0%",
    sparkline: "M0,30 L20,32 L40,20 L60,24 L80,12 L100,18 L120,8 L140,14 L160,4 L180,10 L200,2",
  },
  {
    symbol: "AAVE",
    category: "Digital Asset",
    name: "Aave",
    desc: "Eksposur pada protokol lending terdesentralisasi terbesar di ranah DeFi, dipegang atas dasar adopsi on-chain yang matang dan mekanisme suku bunga pasar yang efisien.",
    trend: "up",
    trendLabel: "+8.0%",
    sparkline: "M0,36 L20,28 L40,30 L60,18 L80,22 L100,10 L120,16 L140,6 L160,12 L180,4 L200,6",
  },
  {
    symbol: "TRON",
    category: "Digital Asset",
    name: "Tron",
    desc: "Eksposur pada infrastruktur blockchain dengan volume transaksi stablecoin yang tinggi, dipegang sebagai diversifikasi jaringan di luar ekosistem Ethereum dan Bitcoin.",
    trend: "up",
    trendLabel: "+5.5%",
    sparkline: "M0,32 L20,34 L40,26 L60,28 L80,18 L100,22 L120,12 L140,16 L160,8 L180,12 L200,4",
  },
  {
    symbol: "SGD",
    category: "Cash",
    name: "Singapore Dollar",
    desc: "Cadangan tunai lintas mata uang yang menjadi penyeimbang likuiditas portofolio di luar volatilitas pasar saham dan kripto.",
    trend: "flat",
    trendLabel: "Stabil",
    sparkline: "M0,22 L20,20 L40,24 L60,20 L80,22 L100,18 L120,22 L140,20 L160,24 L180,20 L200,22",
  },
  {
    symbol: "USDT",
    category: "Cash",
    name: "Tether",
    desc: "Stablecoin yang dipegang sebagai instrumen likuiditas di ranah kripto — dry powder untuk masuk posisi baru saat momentum pasar mendukung.",
    trend: "flat",
    trendLabel: "Stabil",
    sparkline: "M0,22 L20,24 L40,20 L60,22 L80,20 L100,24 L120,20 L140,22 L160,20 L180,24 L200,22",
  },
];
