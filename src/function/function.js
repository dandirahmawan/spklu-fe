export function setHeightFixedPosition(element){
    let elmHeader = document.getElementById("header")
    let hh = elmHeader.offsetHeight
    let w = window.innerHeight
    let setHeight = w - hh
    element.style.height = setHeight+"px"
}

export function docClickElement(e){
    console.log(e)
}