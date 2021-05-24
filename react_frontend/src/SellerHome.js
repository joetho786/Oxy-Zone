import axios from 'axios'
import React, { useEffect } from 'react'
import styled from 'styled-components'

const SellerHome = () => {

    useEffect(() => {

        const val = localStorage.getItem("det").split(',')
        console.log(val)
        
        axios.post('/api/sellers/details/', {
            id: parseInt(val[0]),
            name: val[1],
            // email: val[2],
            // password: val[3]
        }).then((data) => console.log(data))

    }, [])

    return (
        <>
            <Title >
                <p style = {{ margin: 0, padding: 0 }} >Seller Page</p>
            </Title >
            < Hr />
            <Listview>

            </Listview>
        </>
    )
}


const Title = styled.div`

width: 100%;
height: 150px;
display: flex;
justify-content: center;
align-items: center;
font-size: 60px;

`

const Listview = styled.div`

scrollable: true;

`

const Hr = styled.hr`

margin: 0;
padding: 0;

`


export default SellerHome
