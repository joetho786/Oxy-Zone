import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './sellerhome.css'

import { parse, v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const SellerHome = () => {

    const refresh = () => {

        const val = localStorage.getItem("gid").split(',')

        axios.post('/api/sellers/details/', {
            id: parseInt(val[0]),
            name: val[1],
            email: val[2],
            password: val[3]
        }).then((data) => process(data))

    }

    const handleclick = () => {

        localStorage.removeItem('gid')
        window.location.reload()

    }

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    const [lis, setlis] = useState([])

    const process = (data) => {

        console.log(data)

        if (!(data.status == 226)) {

            console.log('data : ' + data.data.Data)
            let newlist = []
<<<<<<< HEAD

=======
            
>>>>>>> 7b7050530243453cebdde8579c52ba196a4eb98d
            for (let i = 0; i < data.data.Data.length; i++) {
                console.log('comeon', data.data.Data[i].foreign_seller)
                console.log(data.data.Data[i].oxyprice)
                console.log(parseFloat(data.data.Data[i].oxyprice))
                newlist.push(['noedit', data.data.Data[i].location, data.data.Data[i].addr, data.data.Data[i].phno, data.data.Data[i].oxyprice, data.data.Data[i].foreign_seller])
            }
<<<<<<< HEAD

=======
            
>>>>>>> 7b7050530243453cebdde8579c52ba196a4eb98d
            console.log('newlist: ' + newlist)

            setlis(newlist)

        } else {

            console.log('NO DATA')

        }

    }

    useEffect(() => {

        const val = localStorage.getItem("gid").split(',')
        console.log('val:', val)

        console.log(val[0])

        axios.post('/api/sellers/details/', {
            id: parseInt(val[0]),
            name: val[1],
            email: val[2],
            password: val[3]
        }).then((data) => process(data))

    }, [])

    const handleplusclick = () => {

        let listt = ['newedit', '', '', '', '', parseInt(localStorage.getItem("gid").split(',')[0]), '', '', '', '']

        setlis([listt, ...lis])

    }

<<<<<<< HEAD
    const cancelnewclick = (location, addr, phno, oxyprice, id) => {

            console.log('dont send to there lol')

            for (let i = 0; i < lis.length; i++) {


                console.log(lis[i])

                if (lis[i][1] === location && lis[i][2] ===  addr && lis[i][3] ===  phno && lis[i][4] ===  oxyprice && lis[i][5] ===  id ) {


                    let listt = [

                        ...lis.slice(0, i),
                        ...lis.slice((i + 1), (lis.length))
                    
                    ]
=======
    const deleteclick = (location, addr, phno, oxyprice ,id, cond) => {
        if (cond === 'edit') {
            console.log('dont send to there lol')
            for (let i = 0; i < lis.length; i++){

                if (lis[i][5] === id) {
                    
                    console.log(lis[i])

                    // let listt = ['noedit', lis[i][1], lis[i][2], lis[i][3], lis[i][4], id]
                    let listt = [...(lis.slice(0 , i)), ...lis(lis.slice((i+1) , (lis.length)))]
>>>>>>> 7b7050530243453cebdde8579c52ba196a4eb98d

                    console.log(listt)

                    setlis(listt)

<<<<<<< HEAD
                    // refresh()

=======
                    refresh()
                    
>>>>>>> 7b7050530243453cebdde8579c52ba196a4eb98d
                    break;
                }

            }
<<<<<<< HEAD
    } 

    const canceloldclick = (location, addr, phno, oxyprice, id, newlocation, newaddr, newphno, newoxyprice ) => {

        console.log('dont send to there lol')

        for (let i = 0; i < lis.length; i++) {


            console.log(lis[i])

            if (lis[i][1] === location && lis[i][2] ===  addr && lis[i][3] ===  phno && lis[i][4] ===  oxyprice && lis[i][5] ===  id, lis[i][6] === newlocation && lis[i][7] ===  newaddr && lis[i][8] ===  newphno && lis[i][9] ===  newoxyprice ) {


                let listt = [

                    ...lis.slice(0, i),
                    ['noedit', newlocation, newaddr, newphno, newoxyprice, id],
                    ...lis.slice((i + 1), (lis.length))
                
                ]

                console.log(listt)

                setlis(listt)

                // refresh()

                break;
            }

        }


    } 

    const deleteclick = (location, addr, phno, oxyprice, id, cond) => {
        
            console.log('posting now')
            axios.post('/api/sellers/delete/', {
                location: location,
                addr: addr,
                phno: phno,
                oxyprice: parseFloat(oxyprice),
                id: id,
            })
                .then((res) =>  { 

                    console.log(res)

                        console.log(res.status)

                        if (res.status === 200) {
                            
                            for (let i = 0; i < lis.length ; i++ ){

                                console.log(lis[i])

                                console.log(i)

                                if (lis[i][1] === location && lis[i][2] ===  addr && lis[i][3] ===  phno && lis[i][4] ===  oxyprice && lis[i][5] ===  id ) {

                                    console.log('lis :', lis)
                                    console.log(['noedit', location, addr, phno, oxyprice, id])

                                    setlis([
                                        ...lis.slice(0, i),
                                        ...lis.slice((i+1), lis.length)
                                    ])

                                }

                            }

                        } else {
                            console.log(res.data.Data)
                        }

                 })
        
=======


        } else if (cond === 'noedit') {
            console.log('posting now')
            axios.post('/api/sellers/delete/', {
                location: location,
                addr: addr, 
                phno: phno,
                oxyprice: oxyprice,
                id: id,
            })
            .then((res) => console.log(res))
            .catch((err) => {console.log(err)})
            .then(() => {refresh()})
        }
>>>>>>> 7b7050530243453cebdde8579c52ba196a4eb98d
    }

    const saveclick = (location, addr, phno, oxyprice, id, type, newlocation, newaddr, newphno, newoxyprice) => {

        console.log('type: ', type)

<<<<<<< HEAD
        console.log(phno)

        if (phno.toString().length === 10) {

            if (type === 'oldedit') {

                console.log('oldedit')

                console.log(location, addr, phno, oxyprice, id, type, newlocation, newaddr, newphno, newoxyprice)

                axios.post('/api/sellers/save/old/', {
                    location: location,
                    addr: addr,
                    phno: phno,
                    oxyprice: parseFloat(oxyprice),
                    id: id,
                    oldlocation: newlocation,
                    oldaddr: newaddr,
                    oldphno: newphno,
                    oldoxyprice: parseFloat(newoxyprice),
                })
                    .then((res) => { 
                        console.log(res)

                        console.log(res.status)

                        if (res.status === 200) {
                            
                            for (let i = 0; i < lis.length ; i++ ){

                                console.log(lis[i])

                                console.log(i)

                                if (lis[i][0] === 'oldedit'  && lis[i][1] === location && lis[i][2] ===  addr && lis[i][3] ===  phno && lis[i][4] ===  oxyprice && lis[i][5] ===  id && lis[i][6] ===  newlocation && lis[i][7] ===  newaddr && lis[i][8] ===  newphno &&  lis[i][9] ===  newoxyprice) {

                                    console.log('lis :', lis)
                                    console.log(['noedit', location, addr, phno, oxyprice, id])

                                    setlis([
                                        ...lis.slice(0, i),
                                        ['noedit', location, addr, phno, oxyprice, id],
                                        ...lis.slice((i+1), lis.length)
                                    ])

                                }

                            }

                        } else {
                            console.log(res.data.Data)
                        }

                     })
                    .catch((err) => { console.log(err) })

            } else {

                console.log('newedit')
                axios.post('/api/sellers/save/new/', {
                    location: location,
                    addr: addr,
                    phno: phno,
                    oxyprice: oxyprice,
                    id: id,
                })
                .then((res) => { 
                    console.log(res)

                    console.log(res.status)

                    if (res.status === 200) {
                        
                        for (let i = 0; i < lis.length ; i++ ){

                            console.log(lis[i])

                            console.log(i)

                            if (lis[i][0] === 'newedit'  && lis[i][1] === location && lis[i][2] ===  addr && lis[i][3] ===  phno && lis[i][4] ===  oxyprice && lis[i][5] ===  id ) {

                                console.log('lis :', lis)
                                console.log(['noedit', location, addr, phno, oxyprice, id])

                                setlis([
                                    ...lis.slice(0, i),
                                    ['noedit', location, addr, phno, oxyprice, id],
                                    ...lis.slice((i+1), lis.length)
                                ])

                            }

                        }

                    } else {
                        console.log(res.data.Data)
                    }

                 })
                .catch((err) => { console.log(err) })

            }

        } else {

            console.log('10 nums')

        }



=======
        if (type === 'oldedit'){

            console.log('oldedit')

            console.log(location, addr, phno, oxyprice, id, type, newlocation, newaddr, newphno, newoxyprice)

            axios.post('/api/sellers/save/old/', {
                location: location,
                addr: addr, 
                phno: phno,
                oxyprice: oxyprice,
                id : id,
                oldlocation: newlocation,
                oldaddr: newaddr, 
                oldphno: newphno,
                oldoxyprice: newoxyprice,
            })
            .then((res) => {console.log(res)})
            .catch((err) => {console.log(err)})
            .then(() => {refresh()})    
        } else {
            console.log('newedit')
            axios.post('/api/sellers/save/new/', {
                location: location,
                addr: addr, 
                phno: phno,
                oxyprice: oxyprice,
                id : id,
            })
            .then((res) => {console.log(res)})
            .catch((err) => {console.log(err)})    
            .then(() => {refresh()})   
        }

>>>>>>> 7b7050530243453cebdde8579c52ba196a4eb98d
    }

    // lis => [ 'edit or noedit', 'location', 'addr', 'phno', 'oxyprice', 'id' ]

    const editclick = (location, addr, phno, oxyprice, id) => {

        console.log('edit : ', id)

        for (let i = 0; i < lis.length; i++) {
<<<<<<< HEAD
            if (id === lis[i][5] && location === lis[i][1] && addr === lis[i][2] && phno === lis[i][3] && oxyprice === lis[i][4]) {

                console.log('inside')

                let listt = ['oldedit', lis[i][1], lis[i][2], lis[i][3], lis[i][4], id, lis[i][1], lis[i][2], lis[i][3], lis[i][4]]
=======
            if (id === lis[i][5] && location === lis[i][1] && addr === lis[i][2] && phno === lis[i][3] && oxyprice === lis[i][4]){

                console.log('inside')

                let listt = [ 'oldedit', lis[i][1], lis[i][2], lis[i][3], lis[i][4], id, lis[i][1], lis[i][2], lis[i][3], lis[i][4]]
>>>>>>> 7b7050530243453cebdde8579c52ba196a4eb98d

                console.log(listt)

                console.log(lis, i)

<<<<<<< HEAD
                let newlist = [...lis.slice(0, i), listt, ...lis.slice((i + 1), (lis.length))]
=======
                let newlist = [...lis.slice(0, i), listt, ...lis.slice((i+1), (lis.length))]
>>>>>>> 7b7050530243453cebdde8579c52ba196a4eb98d

                console.log(newlist)

                setlis(newlist)

            }
        }
    }

    return (
        <>
            <Logout >

                <button type="button" class="btn btn-warning c1 c" onClick={handleclick} >Logout <ExitToAppIcon /> </button>

            </Logout>
            <Title >
                <p style={{ margin: 0, padding: 0 }} >Seller Page</p>
            </Title >
            < Hr />
<<<<<<< HEAD
            
            {
                lis.length >= 1 ? 

                <Listview>
=======
            <Listview>
>>>>>>> 7b7050530243453cebdde8579c52ba196a4eb98d
                <Plus onClick={handleplusclick}>
                    <AddCircleIcon />
                </Plus>

                <Grid container spacing={3}>

                    {
                        lis.map((element, index) => {

                            console.log(element)

                            if (element[0] == 'noedit') {

                                return (
                                    <Grid item xs={12}>
                                        <Card className={classes.root} id='makeme'>
                                            {/* <p>{element[0]} - {element[1]} - {element[2]}</p> */}
                                            <CardContent>
                                                {/* <Typography className={classes.title} color="textSecondary" gutterBottom> */}
                                                {/* {element[0]} */}
                                                {/* </Typography> */}
                                                <Typography variant="h5" component="h2">
                                                    {/* be{bull}nev{bull}o{bull}lent */}
                                                    {element[1]}
                                                </Typography>
                                                {/* <Typography className={classes.pos} color="textSecondary"> */}
                                                {/* adjective */}
                                                {/* </Typography> */}
                                                <Typography variant="body2" component="p">
                                                    {element[2]}
                                                    <br />
                                                    {element[3]}
                                                    <br />
                                                    {element[4]}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Bottom>
<<<<<<< HEAD
                                                    <Button size="small" id='butstart' onClick={() => { 
                                                        
                                                        editclick(

                                                            element[1],
                                                            element[2], 
                                                            element[3], 
                                                            element[4], 
                                                            element[5]                                                
                                                        
                                                            )

                                                            }} 
                                                            > 
                                                            
                                                            <EditIcon /> 
                                                            
                                                            </Button>
                                                    
                                                    <Button size="small" id='butend' onClick={() => { 
                                                    
                                                    deleteclick(
                                                        
                                                        element[1],
                                                        element[2],
                                                        element[3],
                                                        element[4], 
                                                        element[5], 
                                                        
                                                        ) 
                                                    
                                                }}
                                                        > 
                                                        
                                                        <DeleteIcon /> 
                                                        
                                                        </Button>
                                                
=======
                                                    <Button size="small" id='butstart' onClick = {() => {editclick(element[1], element[2], element[3], element[4], element[5])}} > <EditIcon /> </Button>
                                                    <Button size="small" id='butend' onClick = {() => {deleteclick(element[1], element[2], element[3], element[4], element[5], 'noedit')}}> <DeleteIcon /> </Button>
>>>>>>> 7b7050530243453cebdde8579c52ba196a4eb98d
                                                </Bottom>
                                            </CardActions>
                                        </Card>
                                    </Grid>

                                )

                            } else if (element[0] === 'newedit' || element[0] === 'oldedit') {

                                console.log(element)

                                return (

                                    <Grid item xs={12}>

                                        <Card className={classes.root} id='makeme'>
                                            <CardContent>
                                                {/* <Typography variant="h5" component="h2"> */}

<<<<<<< HEAD
                                                    Location : <input
                                                    type='text'
                                                    onChange={(e) => setlis([...lis.slice(0, index), [element[0], e.target.value, element[2], element[3], element[4], element[5], element[6], element[7], element[8], element[9]], ...lis.slice((index + 1), lis.length)])}
                                                    value={element[1]}
                                                />
=======
                                                    Location : <input 
                                                    type = 'text' 
                                                    onChange = {(e) => setlis([...lis.slice(0, index), [element[0], e.target.value, element[2], element[3], element[4], element[5], element[6], element[7], element[8], element[9] ], ...lis.slice((index+1), lis.length) ] ) }  
                                                    value = {element[1]}
                                                     />  
>>>>>>> 7b7050530243453cebdde8579c52ba196a4eb98d

                                                {/* </Typography> */}
                                                {/* <Typography variant="body2" component="p"> */}

<<<<<<< HEAD
                                                    Addr: <input
                                                    type='text'
                                                    value={element[2]}
                                                    onChange={(e) =>
                                                        setlis([...lis.slice(0, index), [element[0], element[1], e.target.value, element[3], element[4], element[5], element[6], element[7], element[8], element[9]], ...lis.slice((index + 1), lis.length)])
                                                    }
                                                />

                                                <br />

                                                    Num : <input
                                                    type='number'
                                                    value={element[3]}
                                                    onChange={(e) =>
                                                        e.target.value.length <= 10 ?
                                                            setlis([...lis.slice(0, index), [element[0], element[1], element[2], parseInt(e.target.value), element[4], element[5], element[6], element[7], element[8], element[9]], ...lis.slice((index + 1), lis.length)])
                                                            :
                                                            console.log('not allowed')
                                                    }
                                                />

                                                <br />

                                                {/* {console.log(element[4])} */}
                                                {/* {console.log(parseFloat(element[4]))} */}

                                                    OxyPrice : <input
                                                    type='text'
                                                    value={(element[4])}
                                                    onChange={(e) => {

                                                        console.log('me: ', e.target.value)

                                                        if (e.target.value === '') {

                                                            setlis([...lis.slice(0, index), [element[0], element[1], element[2], element[3], (e.target.value), element[5], element[6], element[7], element[8], element[9]], ...lis.slice((index + 1), lis.length)])

                                                        } 
                                                        else if ((['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'].includes(e.target.value[(e.target.value.length - 1)]))) {

                                                            if (e.target.value.includes('.')) {

                                                                if (e.target.value.split('.').length === 2) {

                                                                    setlis([...lis.slice(0, index), [element[0], element[1], element[2], element[3], (e.target.value), element[5], element[6], element[7], element[8], element[9]], ...lis.slice((index + 1), lis.length)])

                                                                }


                                                            } else {

                                                                setlis([...lis.slice(0, index), [element[0], element[1], element[2], element[3], (e.target.value), element[5], element[6], element[7], element[8], element[9]], ...lis.slice((index + 1), lis.length)])

                                                            }

                                                        }
                                                    }

                                                    }

                                                />

                                                {/* </Typography> */}
                                            </CardContent>
                                            <CardActions>
                                                <Bottom>

                                                    <Button size="small" id='butstart' onClick={() => {
                                                    
                                                    if(!(element[1] === '' || element[2] === '' || element[3] === '' || element[4] === '')){

                                                        {
                                                            saveclick(
                                                                element[1], 
                                                                element[2], 
                                                                element[3],
                                                                element[4], 
                                                                element[5], 
                                                                element[0], 
                                                                element[6], 
                                                                element[7], 
                                                                element[8], 
                                                                element[9]
                                                                )
                                                            
                                                            }

                                                    } else {

                                                        console.log('fill the values')

                                                    }

                                                    } } >
                                                         <SaveIcon /> 
                                                    </Button>
                                                    
                                                    <Button 
                                                    size="small" 
                                                    id='butend' 
                                                    onClick={() => 
                                                    
                                                        element[0] === 'newedit' ?

                                                        cancelnewclick(

                                                        element[1], 
                                                        element[2], 
                                                        element[3], 
                                                        element[4], 
                                                        element[5], 

                                                        ) :

                                                    canceloldclick(
                                                    
                                                        element[1], 
                                                        element[2], 
                                                        element[3], 
                                                        element[4], 
                                                        element[5], 
                                                        element[6], 
                                                        element[7], 
                                                        element[8], 
                                                        element[9], 
                                                    
                                                    )}> 
                                                    
                                                    
                                                    <CancelIcon />
                                                    
                                                    
                                                    </Button>


=======
                                                    Addr: <input 
                                                    type = 'text'  
                                                    value = {element[2]} 
                                                    onChange = {(e) => setlis([...lis.slice(0, index), [element[0], element[1], e.target.value, element[3], element[4], element[5], element[6], element[7], element[8], element[9] ], ...lis.slice((index+1), lis.length)])} 
                                                    /> 
                                                    
                                                    <br />
                                                    
                                                    Num : <input 
                                                    type = 'number'  
                                                    value = {element[3]}  
                                                    onChange = {(e) => setlis([...lis.slice(0, index), [element[0], element[1], element[2], e.target.value, element[4], element[5], element[6], element[7], element[8], element[9] ], ...lis.slice((index+1), lis.length)])} 
                                                    /> 
                                                    
                                                    <br />
                                                    
                                                    {/* {console.log(element[4])} */}
                                                    {/* {console.log(parseFloat(element[4]))} */}
                                                    
                                                    OxyPrice : <input 
                                                    onKeyPress="return (event.charCode !=8 && event.charCode ==0 || ( event.charCode == 46 || (event.charCode >= 48 && event.charCode <= 57)))" 
                                                    type = 'text'  
                                                    value = {parseFloat(element[4])} 
                                                    onChange = {(e) => setlis([...lis.slice(0, index), [element[0], element[1], element[2], element[3], e.target.value, element[5], element[6], element[7], element[8], element[9] ], ...lis.slice((index+1), lis.length)])} 
                                                    />  
                                                
                                                {/* </Typography> */}
                                            </CardContent>
                                            <CardActions>
                                                <Bottom>

                                                    <Button size="small" id='butstart' onClick = {() => saveclick(element[1], element[2], element[3], element[4], element[5], element[0], element[6],element[7], element[8],element[9])} > <SaveIcon /> </Button>
                                                    <Button size="small" id='butend' onClick = {() => deleteclick(element[1], element[2], element[3], element[4], element[5], 'edit')}> {element[6] === '' ? <DeleteIcon /> : <CancelIcon /> }</Button>
                                                
>>>>>>> 7b7050530243453cebdde8579c52ba196a4eb98d
                                                </Bottom>
                                            </CardActions>
                                        </Card>

                                    </Grid>

                                )

                            }

                        })
                    }


                </Grid>

            </Listview>
<<<<<<< HEAD

            :

                    <p>Loading....</p>

            }
            
            
=======
>>>>>>> 7b7050530243453cebdde8579c52ba196a4eb98d
        </>
    )
}

const Bottom = styled.div`

display: flex;
width: 100%;
flex-direction: row;
justify-content: space-between;

`

const Logout = styled.div`

position: absolute;
top: 10px;
right: 10px;

`



const Plus = styled.div`

width: 10px;
margin-left: 20px;
margin-top: 20px;
margin-bottom: 20px;

$hover: {
    cursor: pointer;
}

`


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
