import React, { useState } from 'react';
import Horizen from '../../baseUI/horizen-item'
import { categoryTypes, alphaTypes } from '../../api/config'
import {NavContainer} from './style'
function Singer() {
    const [category, setCateGory] = useState('')
    const [alpha, setAlpha] = useState('')
    return (
      <NavContainer>
        <Horizen list={categoryTypes} title={'分类(默认热门)'} oldval={category} handleClick={(val) => setCateGory(val)}></Horizen>
        <Horizen list={alphaTypes} title={"首字母:"} oldval={alpha} handleClick={(val) => setAlpha(val)}></Horizen>
      </NavContainer>
    )
}

export default Singer