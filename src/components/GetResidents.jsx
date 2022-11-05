import React from 'react';
import axios from "axios"
import { motion } from 'framer-motion';
import { useEffect, useState } from "react"

const GetResidents = ({url}) => {

    const [resident, setResident] = useState([])

    useEffect(()=>{
        axios.get(url)
        .then(res => setResident(res.data))
    },[])

    return (
        <motion.article className='ResidentCard' 
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{ duration: 1, type: "tween" }}>
            <header className='ResidentCard-profile'>
                <img src={resident?.image} alt="" />
                <div className={`circle ${resident?.status}`}></div>
                <span>{resident?.status}</span>
            </header>
            <section className='ResidentCard-section'>
                <h3>"{resident?.name}"</h3>
                <ul>
                    <li><span>Specie:</span> {resident.species}</li>
                    <li><span>Origin:</span> {resident.origin?.name}</li>
                    <li><span>Episodes Appareance:</span>  {resident.episode?.length}</li>
                </ul>
            </section>
        </motion.article>
        
    );
};

export default GetResidents;