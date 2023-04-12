import React , { useState, useEffect } from 'react'
import { bringUsers } from '../services/apiCalls';

export const Home = () => {
    return (
        <div className='bg index' style={{backgroundImage: `url('./src/assets/clinica_main.jpg')`}}></div>
    )
}