import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { motion } from 'framer-motion';
import ReactPaginate from 'react-paginate';
import GetLocation from './components/GetLocation'
import GetResidents from './components/GetResidents'
import FilterList from './components/FilterList'
import Error from './components/Error'

function App() {

  const [data, setData] = useState({})
  const [residentsLength, setResidentsLength] = useState(0)
  const [searchInput, setSearchInput] = useState("")
  const [suggestList, setSuggestList]= useState([])
  const [hasError, setHasError] = useState(false)

  useEffect(()=>{
      let id = Math.floor(Math.random() * 126) + 1;
      if(searchInput)id=searchInput
        
      axios.get(`https://rickandmortyapi.com/api/location/${id}`)
      .then(res => {
        setData(res.data)
        setResidentsLength(res.data.residents.length)
        setHasError(false)
      })
      .catch(err => setHasError(true))

  },[searchInput])

  const handleSubmit = e => {
    e.preventDefault()
    setSearchInput(e.target.idLocation.value) 
  }

  const handleChange = e =>{
    if(e.target.value === "") return setSuggestList()
    axios.get(`https://rickandmortyapi.com/api/location?name=${e.target.value}`)
    .then(res => setSuggestList(res.data.results))
  }

    const [pageNumber, setPageNumber] = useState(0)

    const residentsPerPage = 6
    const pagesVisited = pageNumber * residentsPerPage

    const pageCount = Math.ceil(residentsLength / residentsPerPage)

    const changePage = ({selected}) => {
        setPageNumber(selected)
    }

  return (
    <div className="App">
      <div className='Header'>
        <form onSubmit={handleSubmit}>
            <input placeholder='Enter a location name or an ID...' type="text" id='idLocation' autoComplete="off"
            onChange={handleChange}
            onBlur={()=>{
              setTimeout(() => {
                setSuggestList()
              }, 100);
            }}
            />
            <motion.button whileTap={{ scale: 0.9 }}><i className="fa-solid fa-magnifying-glass"></i></motion.button>
            <FilterList suggestList={suggestList} setSearchInput={setSearchInput}/>
        </form>
      </div>

      <div className='Location-container'>
        <GetLocation data={data}/>
      </div>
      
      <div className='ResidentsContainer'>
          {
            hasError ?
            <Error/>
            :
            data.residents?.slice(pagesVisited, pagesVisited + residentsPerPage).map(url=>(
                <GetResidents
                  key={url}
                  url={url}
                />
            ))
          }
       </div>

        <ReactPaginate
                containerClassName={"pagination"}
                pageRangeDisplayed={3}
                activeLinkClassName={"active"}
                pageLinkClassName={"page-num"}

                previousLabel={"<<"}
                previousClassName={"page-num"}

                pageCount={pageCount}
                onPageChange={changePage}

                nextLabel={">>"}
                nextLinkClassName={"page-num"}

                renderOnZeroPageCount={null}
            />
    </div>
  )
}

export default App
