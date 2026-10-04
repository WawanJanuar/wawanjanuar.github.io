export interface Holding {
  symbol: string;
  category: "Equity" | "Digital Asset" | "Cash";
  name: string;
  desc: string;
  // Exact sparkline path `d` from capital-wawan.html (viewBox 0 0 200 44).
  sparkline: string;
}

export const holdings: Holding[] = [
  {
    symbol: "BTC",
    category: "Digital Asset",
    name: "Bitcoin",
    desc: "Aset dasar dari seluruh portofolio kripto kami — dipegang sebagai penyimpan nilai jangka panjang dan tolok ukur terhadap seluruh aset digital lain.",
    sparkline: "M0,30 L20,32 L40,20 L60,24 L80,12 L100,18 L120,8 L140,14 L160,4 L180,10 L200,2",
  },
  {
    symbol: "TRON",
    category: "Digital Asset",
    name: "Tron",
    desc: "Eksposur pada infrastruktur blockchain dengan volume transaksi stablecoin yang tinggi, dipegang sebagai diversifikasi jaringan di luar ekosistem Ethereum dan Bitcoin.",
    sparkline: "M0,32 L20,34 L40,26 L60,28 L80,18 L100,22 L120,12 L140,16 L160,8 L180,12 L200,4",
  },
  {
    symbol: "SGD",
    category: "Cash",
    name: "Singapore Dollar",
    desc: "Cadangan tunai lintas mata uang yang menjadi penyeimbang likuiditas portofolio di luar volatilitas pasar saham dan kripto.",
    sparkline: "M0,22 L20,20 L40,24 L60,20 L80,22 L100,18 L120,22 L140,20 L160,24 L180,20 L200,22",
  },
  {
    symbol: "USDT",
    category: "Cash",
    name: "Tether",
    desc: "Stablecoin yang dipegang sebagai instrumen likuiditas di ranah kripto — dry powder untuk masuk posisi baru saat momentum pasar mendukung.",
    sparkline: "M0,22 L20,24 L40,20 L60,22 L80,20 L100,24 L120,20 L140,22 L160,20 L180,24 L200,22",
  },
  {
    symbol: "ETH",
    category: "Digital Asset",
    name: "Ethereum",
    desc: "Aset digital dengan ekosistem smart contract terbesar, dipegang sebagai eksposur inti terhadap infrastruktur DeFi dan Layer 1 di luar Bitcoin.",
    sparkline: "M0,28 L20,30 L40,22 L60,26 L80,16 L100,20 L120,10 L140,16 L160,6 L180,12 L200,4",
  },
  {
    symbol: "HYPE",
    category: "Digital Asset",
    name: "Hyperliquid",
    desc: "Eksposur pada exchange perpetual on-chain dengan volume terbesar di sektornya, dipegang sebagai taruhan pada pertumbuhan derivatif terdesentralisasi.",
    sparkline: "M0,34 L20,26 L40,30 L60,18 L80,24 L100,10 L120,20 L140,8 L160,16 L180,6 L200,2",
  },
  {
    symbol: "ASTER",
    category: "Digital Asset",
    name: "Aster",
    desc: "Posisi pada platform trading terdesentralisasi yang sedang tumbuh cepat, dipegang sebagai diversifikasi pada narasi DeFi generasi baru.",
    sparkline: "M0,32 L20,30 L40,28 L60,24 L80,22 L100,18 L120,16 L140,12 L160,10 L180,6 L200,4",
  },
  {
    symbol: "VIRTUAL",
    category: "Digital Asset",
    name: "Virtuals Protocol",
    desc: "Eksposur pada platform peluncuran AI agent on-chain, dipegang sebagai taruhan pada narasi perpaduan AI dan kripto generasi berikutnya.",
    sparkline: "M0,30 L20,26 L40,28 L60,20 L80,24 L100,14 L120,18 L140,8 L160,14 L180,4 L200,2",
  },
  {
    symbol: "WLD",
    category: "Digital Asset",
    name: "Worldcoin",
    desc: "Posisi pada jaringan identitas digital berbasis verifikasi biometrik, dipegang sebagai eksposur pada infrastruktur identitas manusia di era AI.",
    sparkline: "M0,32 L20,28 L40,30 L60,22 L80,26 L100,16 L120,20 L140,10 L160,16 L180,6 L200,4",
  },
];
