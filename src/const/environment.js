export function geturl(){
    let url = window.location.href
    let url1 = url.split("/")
    let url2 = url1[2].split(":")[0]
    return "http://"+url2+":8085/"
}

export const environment = {
    // baseUrl : "http://172.16.8.13:8085/"
    // baseUrl: "https://tecs.b2tke.bppt.go.id:4446/be"
    baseUrl : geturl()
    // baseUrl: "/be"
}