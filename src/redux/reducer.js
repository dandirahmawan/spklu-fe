import {setDefaultValueForm} from './action_type'

const initState = {
    defaultParameter : {
        pph:null,
        inflasi:null,
        discountRate: null,
        jumlahKendaraanInisial: null,
        biayaPekerjaanSipil: null,
        biayaPekerjaanKelistrikan: null,
        hargaEVSE:null,
        hargaJualPln: null,
        hargaJualKonsumen: null,
        pertumbuhanKbl: null,
        rasioSpklu: null,
        durasiPenggunaanEvse: null,
        biayaSewaLahan: null,
        jumlahKonektor: null,
        dayaMaksimumKonektor: null,
        kapasitasKbl:  null,
        rugiDayaPendukung: null
    }
} 

export function reducer(state = initState, action){
    if(action.type == setDefaultValueForm){
        let dataDefault = state.defaultParameter
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
            if(data[i].name ==  "kapasitas_kbl") dataDefault.kapasitasKbl = data[i].value
            if(data[i].name ==  "rasio_spklu") dataDefault.rasioSpklu = data[i].value
        }

        return{
            ...state,
            defaultParameter: dataDefault
        }
    }
    return state
}