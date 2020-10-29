import {setDefaultValueForm} from './action_type'

export function setDefaultValue(data){
    return{
        type: setDefaultValueForm,
        data: data
    }
}