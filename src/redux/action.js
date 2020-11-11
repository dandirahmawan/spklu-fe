import {setDafaultValueByNameAction, setDefaultValueForm, setParamterBisnisAction} from './action_type'

export function setDefaultValue(data){
    return{
        type: setDefaultValueForm,
        data: data
    }
}

export function setDefaultValueByName(n, v){
    return{
        type    : setDafaultValueByNameAction,
        name    : n,
        value   : v 
    }
}

export function setParameterBisnis(data){
    return{
        type: setParamterBisnisAction,
        data: data
    }
}