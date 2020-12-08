/*param = 1*/export const infoBiayaSpkluPerSite  = "Merupakan Biaya investasi untuk sebuah situs charging (SPKLU) tunggal."
/*param = 2*/export const infoHargaJualPln       = "Berbasis tarif curah sebesar Rp 707 x Q, dengan 0,8 ≤ Q ≤ 2.";
/*param = 3*/export const infoJumlahSpklu        = "Jumlah SPKLU yang pada tahun pertama akan dibangun diasumsikan sebanyak  rasio jumlah BEV yang ada tahun tsb/1 SPKLU."
/*param = 4*/export const infoJumlahKendaraanListrik = "Merupakan asumsi jumlah kendaraan listrik yang berada dijalanan. Default value = 600 BEV Pada tahun pertama, dari data kemperin"
/*param = 5*/export const infoHargaJualKonsumen  = "Menggunakan tarif layanan khusus sebesar Rp 1.650 x N, dengan N ≤ 1,5";
/*param = 6*/export const infoKapasitas1Kbl      = "Kapasitas baterai BEV yang melakukan pengisian pada SPKLU"
/*param = 7*/export const infoJumlahKonektor     = "Jumlah konektor yang disediakan pada sebuah EVSE"
/*param = 8*/export const infoRugiDayaPendukung  = "Rugi-rugi sebuah EVSE dan daya pendukung (auxillary power) pada sebuah SPKLU (untuk lampu dll)";

export const infoInput = [
    {"name":"pph", "desc": "Persentase pajak yang perlu dibayarkan dari penghasilan bisnis"},
    {"name":"inflasi", "desc": "Asumsi inflasi tahunan selama periode simulasi"},
    {"name":"discount rate", "desc": "Nilai penurunan value dalam perhitungan NPV"},
    {"name":"jumlah kbl", "desc": "Asumsi jumlah kendaraan yang ada saat awal simulasi"},
    {"name":"biaya spklu", "desc": "Biaya yang dikeluarkan untuk membangun satu site SPKLU"},
    {"name":"harga jual pln", "desc": "Faktor pengali harga jual listrik PLN kepada pengelola bisnis SPKLU. Berbasis tarif curah sebesar Rp 707 x Q, dengan 0,8 ≤ Q ≤ 2."},
    {"name":"harga jual konsumen", "desc": "Faktor pengali harga julan listrik kepada consumer. Menggunakan tarif layanan khusus sebesar Rp 1.650 x N, dengan N ≤ 1,5"},
    {"name":"pertumbuhan kbl", "desc": "Asumsi laju petumbuhan jumlah KBL pertahun"},
    {"name":"rasio spklu", "desc": "Rasio berapa jumlah KBL yang ditargetkan untuk dilayani sebuah SPKLU tunggal"},
    {"name":"jumlah konektor", "desc": "Jumlah konektor pada spklu"},
    {"name":"kapasitas kbl", "desc": "Kapasitas pengisian 1 kendaraan listrik"},
    {"name":"rugi-rugi dan kebutuhan", "desc": "Rugi-rugi dan kebutuhan daya pendukung"},
    {"name":"jumlah-ppkl", "desc": "Jumlah PPKL pada satu spklu"},
    {"name":"penggunaan-ppkl", "desc": "Durasi penggunaan PPKL dalam sehari"},
    {"name":"sewa-lahan", "desc": "Biya sewa lahan setiap tahun"},
    {"name":"konektor-info", "desc": "Daya konektor akan berpengaruh pada perhitungan Optimize NPV Maksimum"},
    {"name":"biaya-operasional", "desc": "Persentase dari Capex per tahun"},
    {"name":"biaya-kelistrikan", "desc": "Biaya untuk pekerjaan kelistrikan"},
    {"name":"biaya-sipil", "desc": "Biaya untuk pekerjaan sipil"},
    {"name":"harga-ppkl", "desc": "Harga satu PPKL (Perangkat Pengisian Kendaraan Listrik)"},
]

export const constInfoInput = [
    infoBiayaSpkluPerSite,
    infoHargaJualPln,
    infoJumlahSpklu,
    infoJumlahKendaraanListrik,
    infoHargaJualKonsumen,
    infoKapasitas1Kbl,
    infoJumlahKonektor,
    infoRugiDayaPendukung
]

export const choicesOptimize = [
    {"id":"a", "desc": "NPV maksimum", "text" : "NPV", "name": "npv-maksimum"},
    {"id":"b", "desc": "Harga PPKL maksimum", "text" : "Harga PPKL", "name":"harga-evse"},
    {"id":"c", "desc": "Persen subsidi energi minimum","text" : "Subsidi energi", "name":"subsidi-energi"},
    {"id":"d", "desc": "KLBB : Rasio SPKLU minimum", "text" : "KLBB : Rasio Spklu", "name":"rasio-spklu"},
    {"id":"e", "desc": "Harga listrik PLN maksimum", "text" : "Harga listrik PLN", "name":"rasio-harga-listrik-pln"},
    {"id":"f", "desc": "Tarif jual SPKLU minimum", "text" : "Tarif jual SPKLU", "name":"rasio-tarif-jual-spklu"},
    {"id":"g", "desc": "Biaya sewa lahan maksimum", "text" : "Biaya sewa lahan", "name":"biaya-sewa-lahan"}
]