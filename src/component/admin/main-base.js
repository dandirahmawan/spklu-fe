import React, { Fragment } from 'react'
import KondisiEkonomiForm from './kondisi_ekonomi_form'
import ParamterBisnisForm from './parameter_bisnis_form'
import ParameterTeknisForm from './parameter_teknis_form'
import Dahsboard from './dahsboard'

const main_base = (props) => {
    return(
        <Fragment>
            {
                (props.section == "dashboard")
                ? <Dahsboard/> : ""
            }
            {
                (props.section == "ekonomi")
                ? <KondisiEkonomiForm/> : ""
            }
            {
                (props.section == "bisnis")
                ? <ParamterBisnisForm/> : ""
            }
            {
                (props.section == "teknis")
                ? <ParameterTeknisForm/> : ""
            }
        </Fragment>
    )
}

export default main_base