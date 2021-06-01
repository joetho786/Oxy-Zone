import React, { useState, useEffect } from 'react'

const Update = () => {

    const [det, setdet] = useState([])

    useEffect(() => {
        
        const val = localStorage.getItem("gid").split(',')
        console.log(val)

        setdet([val[0], val[1], val[2], val[3], val[4]])

    }, [])

    return (
        <div>
            {
                
                det ? 
                <>
                    <p>{ det[0] }</p>
                    <p>{ det[1] }</p>
                    <p>{ det[2] }</p>
                    <p>{ det[3] }</p>
                    <img src = { det[4] } ></img>
                </>
                :
                <p>Please wait till we get the data</p>

            }
        </div>
    )
}

export default Update
