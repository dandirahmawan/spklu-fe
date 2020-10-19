export function setHeightFixedPosition(element){
    let elmHeader = document.getElementById("header")
    let hh = elmHeader.offsetHeight
    let w = window.innerHeight
    let setHeight = w - hh
    element.style.height = setHeight+"px"
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
        // Allow normal operation
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
                
                // console.log(valStart)
                event.target.value = valStart
                // for(let x = 0;x<1;x++){
                //     let posStart = 3 * x
                //     console.log(pos)    
                // }
            }
            // event.target.value = parseFloat(val).toLocaleString('en-US', {
            //     style: 'decimal',
            //     maximumFractionDigits: 2,
            //     minimumFractionDigits: 2
            // })
            // let l = val.length
            // event.target.value = 100
        }
    }
}

export function optzNpvMaksimum(k, p, d, u, q, n, g, gapYear, npv, discountRate, irr, pp){
    let isOptimasiSolutif = true
    let halfPp = gapYear / 2

    if(u < 1) isOptimasiSolutif = false
    console.log(u+" < "+ 1)
    if(0.8 < q && q > 2) isOptimasiSolutif = false
    console.log("0.8 <=2 "+q+" <= 2")
    if(n > 1.5) isOptimasiSolutif = false
    console.log(n+" > 1.5")
    if(0 > g) isOptimasiSolutif = false
    console.log("0 > "+g)
    if(u*k > p*d) isOptimasiSolutif = false
    console.log(u*k+" > "+p*d)
    if(pp > halfPp) isOptimasiSolutif = false
    console.log(pp+" > "+halfPp)
    if(irr < discountRate) isOptimasiSolutif = false
    if(npv < 0) isOptimasiSolutif = false
    // console.log(npv+" < 0")
    // console.log("optimasi solutif = "+isOptimasiSolutif)
    return isOptimasiSolutif;
}

export function optzRasioMinimumSPKLUBEV(k, p, d, u, q, n, g, gapYear, npv, discountRate, irr, pp){
    let isOptimasiSolutif = true
    let halfPp = gapYear / 2

    if(u < 1) isOptimasiSolutif = false
    console.log(u+" < "+ 1)
    if(0.8 < q && q > 2) isOptimasiSolutif = false
    console.log("0.8 <=2 "+q+" <= 2")
    if(n > 1.5) isOptimasiSolutif = false
    console.log(n+" > 1.5")
    // if(0 > g) isOptimasiSolutif = false
    // console.log("0 > "+g)
    if(u*k > p*d) isOptimasiSolutif = false
    console.log(u*k+" > "+p*d)
    if(pp > halfPp) isOptimasiSolutif = false
    console.log(pp+" > "+halfPp)
    if(irr < discountRate) isOptimasiSolutif = false
    if(npv < 0) isOptimasiSolutif = false
    // console.log(npv+" < 0")
    // console.log("optimasi solutif = "+isOptimasiSolutif)
    return isOptimasiSolutif;
}

export function optzRasiohargalistrikPLNmaksimum(k, p, d, u, q, n, g, gapYear, npv, discountRate, irr, pp){
    let isOptimasiSolutif = true
    let halfPp = gapYear / 2

    if(u < 1) isOptimasiSolutif = false
    console.log(u+" < "+ 1)
    // if(0.8 < q && q > 2) isOptimasiSolutif = false
    // console.log("0.8 <=2 "+q+" <= 2")
    if(n > 1.5) isOptimasiSolutif = false
    console.log(n+" > 1.5")
    // if(0 > g) isOptimasiSolutif = false
    // console.log("0 > "+g)
    if(u*k > p*d) isOptimasiSolutif = false
    console.log(u*k+" > "+p*d)
    if(pp > halfPp) isOptimasiSolutif = false
    console.log(pp+" > "+halfPp)
    if(irr < discountRate) isOptimasiSolutif = false
    if(npv < 0) isOptimasiSolutif = false
    // console.log(npv+" < 0")
    // console.log("optimasi solutif = "+isOptimasiSolutif)
    return isOptimasiSolutif;
}

export function optzRasioTarifJualSPKLUMinimum(k, p, d, u, q, n, g, gapYear, npv, discountRate, irr, pp){
    let isOptimasiSolutif = true
    let halfPp = gapYear / 2
    
    if(u < 1) isOptimasiSolutif = false
    console.log(u+" < "+ 1)
    if(0.8 < q && q > 2) isOptimasiSolutif = false
    console.log("0.8 <=2 "+q+" <= 2")
    // if(n > 1.5) isOptimasiSolutif = false
    // console.log(n+" > 1.5")
    // if(0 > g) isOptimasiSolutif = false
    // console.log("0 > "+g)
    if(u*k > p*d) isOptimasiSolutif = false
    console.log(u*k+" > "+p*d)
    if(pp > halfPp) isOptimasiSolutif = false
    console.log(pp+" > "+halfPp)
    if(irr < discountRate) isOptimasiSolutif = false
    if(npv < 0) isOptimasiSolutif = false
    // console.log(npv+" < 0")
    // console.log("optimasi solutif = "+isOptimasiSolutif)
    return isOptimasiSolutif;
}

export function optzBiayaSewaLahanMaksimum(k, p, d, u, q, n, g, gapYear, npv, discountRate, irr, pp){
    let isOptimasiSolutif = true
    let halfPp = gapYear / 2
    
    if(u < 1) isOptimasiSolutif = false
    console.log(u+" < "+ 1)
    if(0.8 < q && q > 2) isOptimasiSolutif = false
    console.log("0.8 <=2 "+q+" <= 2")
    if(n > 1.5) isOptimasiSolutif = false
    console.log(n+" > 1.5")
    // if(0 > g) isOptimasiSolutif = false
    // console.log("0 > "+g)
    if(u*k > p*d) isOptimasiSolutif = false
    console.log(u*k+" > "+p*d)
    if(pp > halfPp) isOptimasiSolutif = false
    console.log(pp+" > "+halfPp)
    if(irr < discountRate) isOptimasiSolutif = false
    if(npv < 0) isOptimasiSolutif = false
    // console.log(npv+" < 0")
    // console.log("optimasi solutif = "+isOptimasiSolutif)
    return isOptimasiSolutif;
}