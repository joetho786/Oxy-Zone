import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './sellerhome.css'

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
                newlist.push([data.data.Data[i].location, data.data.Data[i].phno, data.data.Data[i].oxygenpricepercontainer])
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

    return (
        <>
        <Logout >

        <button type="button" class="btn btn-warning c1 c" onClick = {handleclick} >Logout <ExitToAppIcon /> </button>

        </Logout>
            <Title >
                <p style={{ margin: 0, padding: 0 }} >Seller Page</p>
            </Title >
            < Hr />
            <Listview>
                <Plus >
                    <AddCircleIcon />
                </Plus>

                <Grid container spacing={3}>

                    {
                        lis.map((element) => {

                            console.log(element)

                            return (
                                <Grid item xs={12}>
                                    {/* <p>{element[0]} - {element[1]} - {element[2]}</p> */}
                                    <Card className={classes.root} id='makeme'>
                                        <CardContent>
                                            {/* <Typography className={classes.title} color="textSecondary" gutterBottom> */}
                                            {/* {element[0]} */}
                                            {/* </Typography> */}
                                            <Typography variant="h5" component="h2">
                                                {/* be{bull}nev{bull}o{bull}lent */}
                                                {element[0]}
                                            </Typography>
                                            {/* <Typography className={classes.pos} color="textSecondary"> */}
                                            {/* adjective */}
                                            {/* </Typography> */}
                                            <Typography variant="body2" component="p">
                                                {element[1]}
                                                <br />
                                                {element[2]}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small"> <EditIcon></EditIcon> </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )

                        })
                    }


                </Grid>

            </Listview>
        </>
    )
}

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
