import React from 'react';
import axios from "axios"
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';

const GetResidents = ({url}) => {

    const [resident, setResident] = useState([])
    
    useEffect(()=>{
        axios.get(url)
        .then(res => setResident(res.data)
        )},[])

    return (
        <motion.article className='ResidentCard'
        whileHover={{scale:1.2}}
        transition={{ type: "tween"}}
        >   
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
                <li><span>Appeareance:</span>  {resident.episode?.length}</li>
            </ul>
        </section>
        </motion.article>
    );
};

export default GetResidents;