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

import { v4 as uuidv4 } from 'uuid';

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
            for (let i = 0; i < data.data.Data.length; i++) {
                console.log(data.data.Data[i].foreign_seller)
                newlist.push(['noedit', data.data.Data[i].location, data.data.Data[i].addr, data.data.Data[i].phno, data.data.Data[i].oxyprice, data.data.Data[i].foreign_seller.id])
            }
            console.log('newlist: ' + newlist)

            setlis(newlist)

        } else {

            console.log('NO DATA')

        }

    }

    useEffect(() => {

        const val = localStorage.getItem("gid").split(',')
        console.log(val)

        axios.post('/api/sellers/details/', {
            id: parseInt(val[0]),
            // name: val[1],
            // email: val[2],
            // password: val[3]
        }).then((data) => process(data))

    }, [])

    const handleplusclick = () => {

        let listt = ['newedit', '', '', '', '', uuidv4(), '', '', '', '']

        setlis([listt, ...lis])

    }

    const deleteclick = (id, cond) => {
        if (type === 'edit') {
            console.log('dont send to there lol')
            for (let i = 0; i < lis.length; i++){

                if (lis[i][5] === id) {
                    
                    console.log(lis[i])

                    // let listt = ['noedit', lis[i][1], lis[i][2], lis[i][3], lis[i][4], id]
                    let listt = [...(lis.slice(0 , i)), ...lis(lis.slice((i+1) , (lis.length - 1)))]

                    console.log(listt)

                    setlis(listt)
                    
                    break;
                }

            }


        } else if (type === 'noedit') {
            console.log('posting now')
            axios.post('/api/sellers/delete', {
                location: location,
                addr: addr, 
                phno: phno,
                oxyprice: oxyprice,
                id: id,
            })
            .then((res) => console.log(res))
            .catch((err) => {console.log(err)})
        }
    }

    const saveclick = (location, addr, phno, oxyprice, id, type, newlocation, newaddr, newphno, newoxyprice) => {

        if (type === 'oldedit'){

            console.log('oldedit')

            axios.post('/api/sellers/save/old', {
                location: location,
                addr: addr, 
                phno: phno,
                oxyprice: oxyprice,
                id : id,
                location: newlocation,
                addr: newaddr, 
                phno: newphno,
                oxyprice: newoxyprice,
            })
            .then((res) => {console.log(res)})
            .catch((err) => {console.log(err)})    
        } else {
            console.log('newedit')
            axios.post('/api/sellers/save/new', {
                location: location,
                addr: addr, 
                phno: phno,
                oxyprice: oxyprice,
                id : id,
            })
            .then((res) => {console.log(res)})
            .catch((err) => {console.log(err)})    
        }

    }

    // lis => [ 'edit or noedit', 'location', 'addr', 'phno', 'oxyprice', 'id' ]

    const editclick = (id) => {
        for (let i = 0; i < lis.length; i++) {
            if (id === lis[i][5]){

                console.log('inside')

                let listt = [ 'oldedit', lis[i][1], lis[i][2], lis[i][3], lis[i][4], id, lis[i][1], lis[i][2], lis[i][3], lis[i][4]]

                console.log(listt)

                let newlist = [...lis.slice(0, i), listt, ...lis.slice((i+1), (lis.length-1))]

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
            <Listview>
                <Plus onClick={handleplusclick}>
                    <AddCircleIcon />
                </Plus>

                <Grid container spacing={3}>

                    {
                        lis.map((element) => {

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
                                                    <Button size="small" id='butstart' onClick = {() => {editclick(element[4])}} > <EditIcon /> </Button>
                                                    <Button size="small" id='butend' onClick = {() => {deleteclick(element[4], 'noedit')}}> <DeleteIcon /> </Button>
                                                </Bottom>
                                            </CardActions>
                                        </Card>
                                    </Grid>

                                )

                            } else if (element[0] == 'edit') {

                                return (

                                    <Grid item xs={12}>

                                        <Card className={classes.root} id='makeme'>
                                            <CardContent>
                                                <Typography variant="h5" component="h2">
                                                    Location : <input onChange = {(e) => element[1] = e.target.value} > {element[1]} </input>
                                                </Typography>
                                                <Typography variant="body2" component="p">
                                                    Num: <input onChange = {(e) => element[2] = e.target.value}> {element[2]} </input>
                                                    <br />
                                                    Addr : <input onChange = {(e) => element[3] = e.target.value}> {element[3]} </input>
                                                    <br />
                                                    OxyPrice : <input onChange = {(e) => element[4] = e.target.value}> {element[4]} </input>
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Bottom>
                                                    <Button size="small" id='butstart' onClick = {() => saveclick(element[1], element[2], element[3], element[4], element[5], element[0], element[6],element[7], element[8],element[9])} > <SaveIcon /> </Button>
                                                    <Button size="small" id='butend' onClick = {() => deleteclick(element[4], 'edit')}> {element[6] === '' ? <DeleteIcon /> : <CancelIcon /> }</Button>
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
