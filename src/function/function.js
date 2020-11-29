export function setHeightFixedPosition(element){
    let elmHeader = document.getElementById("header")
    let hh = elmHeader.offsetHeight
    let w = window.innerHeight
    let setHeight = w - hh
    element.style.height = setHeight+"px"
}

export function getCookieUsername(){
    var c = document.cookie.split(";")
    var userId = "";
    for(var a = 0;a<c.length;a++){
        var d = c[a].split("=")
        if(d[0].replace(" ", "") === 'username_tecs'){
            userId = d[1]
        }
    }
    return userId
}

export function getCookieUserType(){
    var c = document.cookie.split(";")
    var rtn = "";
    for(var a = 0;a<c.length;a++){
        var d = c[a].split("=")
        if(d[0].replace(" ", "") === 'usertype_tecs'){
            rtn = d[1]
        }
    }
    return rtn
}

export function getCookieUserTypeName(){
    var c = document.cookie.split(";")
    var rtn = "";
    for(var a = 0;a<c.length;a++){
        var d = c[a].split("=")
        if(d[0].replace(" ", "") === 'usertypename_tecs'){
            let v = d[1].split("%20").join(" ")
            rtn = v.split("%2F").join("/")
        }
    }
    return rtn
}

export function getCookieToken(){
    var c = document.cookie.split(";")
    var token = "";
    for(var a = 0;a<c.length;a++){
        var d = c[a].split("=")
        if(d[0].replace(" ", "") === 'token_tecs'){
            token = d[1]
        }
    }
    return token
}

export function numberOnlyInput(event){
    if (event.shiftKey == true) {
        event.preventDefault();
    }
    if ((event.keyCode >= 48 && event.keyCode <= 57) || 
        (event.keyCode >= 96 && event.keyCode <= 105) || 
        event.keyCode == 8 || 
        event.keyCode == 9 || 
        event.keyCode == 37 || 
        event.keyCode == 39 ||
        event.keyCode == 190 || 
        event.keyCode == 46) {
    }else{
        event.preventDefault();
    }
}

export function currencyInput(event){
    if(event.target.getAttribute("class") != null){
        let classNm = event.target.getAttribute("class").split(" ")
        let isCurrency = false
        for(let i = 0;i<classNm.length;i++){
            if(classNm[i] == "currency"){
                isCurrency = true
            }
        }
        
        if(isCurrency){
            let val = event.target.value.replace(",", "")
            console.log(val)
            if(val.length > 3){
                let c =  Math.floor(val.length / 3)
                let posStart = val.length - (c * 3)
                let posStart2 = (val.length >=6 && posStart == 0) ? 3 : posStart
                
                let valStart = val.substr(0, posStart2)
                let substrStart = valStart.length
                for(let x=0;x<c;x++){
                    let a = (parseInt(x) + 1) * 3

                    let v = val.substr(substrStart, parseInt(substrStart)+ 3)
                    substrStart = parseInt(substrStart + 3)
                    valStart += ","+v
                    console.log(valStart)
                }
                
                event.target.value = valStart
            }
        }
    }
}

export function optzNpvMaksimum(k, p, d, u, q, n, g, npv, discountRate, irr, pp){
    let isOptimasiSolutif = true
    let halfPp = 3.5
    let arrMsg = []

    if(u < 1) isOptimasiSolutif = false
    // if(0.8 < q && q > 2) isOptimasiSolutif = false
    // if(n > 1.5) isOptimasiSolutif = false
    if(0 > g) isOptimasiSolutif = false
        
    if(u*k > p*d) {
        arrMsg.push("hasil rasio spklu : bev * Kapasitas pengisian 1 kendaraan listrik tidak boleh lebih dari hasil Total daya luaran EVSE * Durasi penggunaan EVSE / hari")
        isOptimasiSolutif = false
    }
    
    if(pp > halfPp) isOptimasiSolutif = false
    if(irr < discountRate) isOptimasiSolutif = false
    if(npv < 0) isOptimasiSolutif = false

    let obj = {}
    obj.message = arrMsg
    obj.result = isOptimasiSolutif
    return obj;
}

export function optzRasioMinimumSPKLUBEV(k, p, d, u, q, n, g, npv, discountRate, irr, pp){
    let isOptimasiSolutif = true
    let halfPp = 3.5
    let arrMsg = []

    if(u < 1) isOptimasiSolutif = false
    // if(0.8 < q && q > 2) isOptimasiSolutif = false
    // if(n > 1.5) isOptimasiSolutif = false
    if(u*k > p*d) {
        arrMsg.push("hasil rasio spklu : bev * Kapasitas pengisian 1 kendaraan listrik tidak boleh lebih dari hasil Total daya luaran EVSE * Durasi penggunaan EVSE / hari")
        isOptimasiSolutif = false
    }

    if(pp > halfPp) isOptimasiSolutif = false
    if(irr < discountRate) isOptimasiSolutif = false

    
    let obj = {}
    obj.message = arrMsg
    obj.result = isOptimasiSolutif
    return obj;
}

export function optzRasiohargalistrikPLNmaksimum(k, p, d, u, q, n, g, npv, discountRate, irr, pp){
    let isOptimasiSolutif = true
    let halfPp = 3.5
    let arrMsg = []

    if(u < 1) isOptimasiSolutif = false
    // if(n > 1.5) isOptimasiSolutif = false
    if(u*k > p*d) isOptimasiSolutif = false
    if(pp > halfPp) isOptimasiSolutif = false
    if(irr < discountRate) isOptimasiSolutif = false

    let obj = {}
    obj.message = arrMsg
    obj.result = isOptimasiSolutif
    return obj;
}

export function optzRasioTarifJualSPKLUMinimum(k, p, d, u, q, n, g, npv, discountRate, irr, pp){
    let isOptimasiSolutif = true
    let halfPp = 3.5
    let arrMsg = []
    
    if(u < 1) isOptimasiSolutif = false
    // if(0.8 < q && q > 2) isOptimasiSolutif = false
    if(u*k > p*d) isOptimasiSolutif = false
    if(pp > halfPp) isOptimasiSolutif = false
    if(irr < discountRate) isOptimasiSolutif = false
    if(npv < 0) isOptimasiSolutif = false
    
    let obj = {}
    obj.message = arrMsg
    obj.result = isOptimasiSolutif
    return obj;
}

export function optzBiayaSewaLahanMaksimum(k, p, d, u, q, n, g, npv, discountRate, irr, pp){
    let isOptimasiSolutif = true
    let halfPp = 3.5
    let arrMsg = []
    
    if(u < 1) isOptimasiSolutif = false
    // console.log(isOptimasiSolutif+ "1")
    // if(0.8 < q && q > 2) isOptimasiSolutif = false
    // console.log(isOptimasiSolutif+ "2")
    // if(n > 1.5) isOptimasiSolutif = false
    // console.log(isOptimasiSolutif+ "3")
    if(u*k > p*d) isOptimasiSolutif = false
    // console.log(isOptimasiSolutif+ "4")
    if(pp > halfPp) isOptimasiSolutif = false
    // console.log(isOptimasiSolutif+ "5")
    if(irr < discountRate) isOptimasiSolutif = false
    // console.log(isOptimasiSolutif+ "6")
    if(npv < 0) isOptimasiSolutif = false
    // console.log(isOptimasiSolutif+ "7")
    
    let obj = {}
    obj.message = arrMsg
    obj.result = isOptimasiSolutif
    return obj;
}

export function isOnline(){
    if (navigator.onLine) { 
        return true
    } else {
        return false
    }
}

export function convertDate_dd_MMM_yyy(date){
    var dated = new Date(date)
    if(dated != "Invalid Date"){
        var month = parseInt(dated.getMonth()) + 1
        var monthName = ""
        var date = (dated.getDate() < 10) ? "0"+dated.getDate() : dated.getDate()
        
        if(month == 1) monthName = "January"
        if(month == 2) monthName = "February"
        if(month == 3) monthName = "March"
        if(month == 4) monthName = "April"
        if(month == 5) monthName = "May"
        if(month == 6) monthName = "June"
        if(month == 7) monthName = "July"
        if(month == 8) monthName = "August"
        if(month == 9) monthName = "September"
        if(month == 10) monthName = "October"
        if(month == 11) monthName = "November"
        if(month == 12) monthName = "December"
        return date+" "+monthName+" "+dated.getFullYear()
    }
}