import {setDafaultValueByNameAction, setDefaultValueForm, setParamterBisnisAction} from './action_type'

const initState = {
    pph:"",
    inflasi:"",
    discountRate: "",
    jumlahKendaraanInisial: "",
    biayaPekerjaanSipil: "",
    biayaPekerjaanKelistrikan: "",
    hargaEVSE:"",
    hargaJualPln: "",
    hargaJualKonsumen: "",
    pertumbuhanKbl: "",
    rasioSpklu: "",
    durasiPenggunaanEvse: "",
    biayaSewaLahan: "",
    jumlahKonektor: "",
    dayaMaksimumKonektor: "",
    kapasitasKbl:  "",
    rugiDayaPendukung: "",
    jumlahDispenser: "",
    subsidiEnergi: ""
} 

export function reducer(state = initState, action){
    if(action.type == setDefaultValueForm){
        let dataDefault = state
        let data = action.data
        for(let i = 0;i<data.length;i++){
            if(data[i].name == "pph") dataDefault.pph = data[i].value
            if(data[i].name == "inflasi") dataDefault.inflasi = data[i].value
            if(data[i].name == "discount_rate") dataDefault.discountRate = data[i].value
            if(data[i].name == "jumlah_kendaraan") dataDefault.jumlahKendaraanInisial = data[i].value
            if(data[i].name == "biaya_sipil") dataDefault.biayaPekerjaanSipil = data[i].value
            if(data[i].name == "biaya_kelistrikan") dataDefault.biayaPekerjaanKelistrikan = data[i].value
            if(data[i].name == "harga_evse") dataDefault.hargaEVSE = data[i].value
            if(data[i].name == "harga_jual_pln") dataDefault.hargaJualPln = data[i].value
            if(data[i].name == "harga_jual_konsumen") dataDefault.hargaJualKonsumen = data[i].value
            if(data[i].name == "pertumbuhan_kbl") dataDefault.pertumbuhanKbl = data[i].value
            if(data[i].name == "durasi_penggunaan_evse") dataDefault.durasiPenggunaanEvse = data[i].value
            if(data[i].name == "biaya_sewa_lahan") dataDefault.biayaSewaLahan = data[i].value
            if(data[i].name == "jumlah_konektor") dataDefault.jumlahKonektor = data[i].value
            if(data[i].name == "daya_maksimum_konektor") dataDefault.dayaMaksimumKonektor = data[i].value
            if(data[i].name == "rugi_dan_daya_pendukung") dataDefault.rugiDayaPendukung = data[i].value
            if(data[i].name == "kapasitas_kbl") dataDefault.kapasitasKbl = data[i].value
            if(data[i].name == "rasio_spklu") dataDefault.rasioSpklu = data[i].value
            if(data[i].name == "jumlah_evse") dataDefault.jumlahDispenser = data[i].value
            if(data[i].name == "subsidi_energi") dataDefault.subsidiEnergi = data[i].value
        }
    }

    if(action.type == setDafaultValueByNameAction){
        let v = action.value
        let n = action.name

        if(n == "harga evse"){
            return{
                ...state,
                hargaEVSE: v
            }
        }
        
        if(n == "rasio spklu"){
            return{
                ...state,
                rasioSpklu: v
            }
        }

        if(n == "harga jual pln"){
            return{
                ...state,
                hargaJualPln: v
            }
        }

        if(n == "harga jual konsumen"){
            return{
                ...state,
                hargaJualKonsumen: v
            }
        }

        if(n == "biaya sewa lahan"){
            return{
                ...state,
                biayaSewaLahan: v
            }
        }
    }

    if(action.type == setParamterBisnisAction){
        let data = action.data
        return{
            ...state,
            jumlahKonektor: JSON.stringify(data.dataKonektor)
        }
    }

    return state
}