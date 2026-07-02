export interface Holding {
  symbol: string;
  category: "Equity" | "Digital Asset";
  name: string;
  desc: string;
  // Exact sparkline path `d` from capital-wawan.html (viewBox 0 0 200 44).
  sparkline: string;
}

export const holdings: Holding[] = [
  {
    symbol: "IDX: PANI",
    category: "Equity",
    name: "Pantai Indah Kapuk Dua",
    desc: "Posisi di sektor properti dan kawasan terintegrasi domestik, dipegang atas dasar valuasi jangka panjang dan prospek pengembangan kawasan.",
    sparkline: "M0,34 L20,30 L40,32 L60,22 L80,26 L100,16 L120,20 L140,10 L160,14 L180,6 L200,8",
  },
  {
    symbol: "BTC",
    category: "Digital Asset",
    name: "Bitcoin",
    desc: "Aset dasar dari seluruh portofolio kripto kami — dipegang sebagai penyimpan nilai jangka panjang dan tolok ukur terhadap seluruh aset digital lain.",
    sparkline: "M0,30 L20,32 L40,20 L60,24 L80,12 L100,18 L120,8 L140,14 L160,4 L180,10 L200,2",
  },
  {
    symbol: "HYPE",
    category: "Digital Asset",
    name: "Hyperliquid",
    desc: "Eksposur pada infrastruktur perdagangan terdesentralisasi generasi baru, dipilih atas dasar adopsi on-chain dan model ekonomi token yang berkelanjutan.",
    sparkline: "M0,36 L20,28 L40,30 L60,18 L80,22 L100,10 L120,16 L140,6 L160,12 L180,4 L200,6",
  },
];
