import { compose } from "redux"

export function setHeightFixedPosition(element){
    let elmHeader = document.getElementById("header")
    let hh = elmHeader.offsetHeight
    let w = window.innerHeight
    let setHeight = w - hh
    element.style.height = setHeight+"px"
}

export function getCookieUsername(){
    console.log(document.cookie)
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

    if(u < 1) isOptimasiSolutif = false
    if(0.8 < q && q > 2) isOptimasiSolutif = false
    if(n > 1.5) isOptimasiSolutif = false
    if(0 > g) isOptimasiSolutif = false
    if(u*k > p*d) isOptimasiSolutif = false
    if(pp > halfPp) isOptimasiSolutif = false
    if(irr < discountRate) isOptimasiSolutif = false
    if(npv < 0) isOptimasiSolutif = false
    return isOptimasiSolutif;
}

export function optzRasioMinimumSPKLUBEV(k, p, d, u, q, n, g, npv, discountRate, irr, pp){
    let isOptimasiSolutif = true
    let halfPp = 3.5

    if(u < 1) isOptimasiSolutif = false
    if(0.8 < q && q > 2) isOptimasiSolutif = false
    if(n > 1.5) isOptimasiSolutif = false
    if(u*k > p*d) isOptimasiSolutif = false
    if(pp > halfPp) isOptimasiSolutif = false
    if(irr < discountRate) isOptimasiSolutif = false

    return isOptimasiSolutif;
}

export function optzRasiohargalistrikPLNmaksimum(k, p, d, u, q, n, g, npv, discountRate, irr, pp){
    let isOptimasiSolutif = true
    let halfPp = 3.5

    if(u < 1) isOptimasiSolutif = false
    if(n > 1.5) isOptimasiSolutif = false
    if(u*k > p*d) isOptimasiSolutif = false
    if(pp > halfPp) isOptimasiSolutif = false
    if(irr < discountRate) isOptimasiSolutif = false
    return isOptimasiSolutif;
}

export function optzRasioTarifJualSPKLUMinimum(k, p, d, u, q, n, g, npv, discountRate, irr, pp){
    let isOptimasiSolutif = true
    let halfPp = 3.5
    
    if(u < 1) isOptimasiSolutif = false
    if(0.8 < q && q > 2) isOptimasiSolutif = false
    if(u*k > p*d) isOptimasiSolutif = false
    if(pp > halfPp) isOptimasiSolutif = false
    if(irr < discountRate) isOptimasiSolutif = false
    if(npv < 0) isOptimasiSolutif = false
    return isOptimasiSolutif;
}

export function optzBiayaSewaLahanMaksimum(k, p, d, u, q, n, g, npv, discountRate, irr, pp){
    let isOptimasiSolutif = true
    let halfPp = 3.5
    
    if(u < 1) isOptimasiSolutif = false
    if(0.8 < q && q > 2) isOptimasiSolutif = false
    if(n > 1.5) isOptimasiSolutif = false
    if(u*k > p*d) isOptimasiSolutif = false
    if(pp > halfPp) isOptimasiSolutif = false
    if(irr < discountRate) isOptimasiSolutif = false
    if(npv < 0) isOptimasiSolutif = false

    return isOptimasiSolutif;
}

export function isOnline(){
    if (navigator.onLine) { 
        return true
    } else {
        return false
    }
}