import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { FlashAutoOutlined } from '@material-ui/icons';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { useHistory } from "react-router-dom";

import Update from './Update'
import NavigationBar from './components/Navigation'
import './sellerhome.css'

// import { parse, v4 as uuidv4 } from 'uuid';

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

    const reftext = useRef('');

    const history = useHistory();

    const handleclick = () => {

        localStorage.removeItem('gid')
        window.location.reload()

    }

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    const [lis, setlis] = useState([])
    const [loading, setloading] = useState(true)

    const [update, setupdate] = useState(false)

    const process = (data) => {

        console.log(data)

        if (!(data.status == 226)) {

            console.log('data : ' + data.data.Data)
            let newlist = []
            for (let i = 0; i < data.data.Data.length; i++) {
                console.log('this')
                console.log(data.data.Data[i])
                newlist.push(['noedit', data.data.Data[i].location, data.data.Data[i].addr, data.data.Data[i].phno, data.data.Data[i].oxyprice, data.data.Data[i].foreign_seller])
            }
            console.log('newlist: ' + newlist)

            setlis(newlist)

            // setloading(false)

        } else {

            if (data.data.Data === 'No data') {
                console.log('NO DATA')
                setloading(false)
            } else {
                if (data.data.Data === 'Id itself is wrong') {
                    localStorage.removeItem('gid')
                    window.location.reload()
                } else {
                    alert('Some error occured.. try again!')
                }
            }

        }

    }

    const [det, setdet] = useState([])
    const [prof, setprof] = useState([])
    const [img, setimg] = useState('')
    const [textbox, settextbox] = useState('')
    const [urlav, seturlav] = useState(false)
    const [url, seturl] = useState('')


    useEffect(() => {

        const val = localStorage.getItem("gid").split(',')
        console.log(val)

        axios.post('/api/sellers/details/', {
            id: parseInt(val[0]),
            name: val[1],
            email: val[2],
            password: val[3]
        }).then((data) => process(data))

        //id, name, email, pwd, imgloc, desc
        setdet([val[0], val[1], val[2], val[3], val[4], val[5]])

        //id, name, email, pwd, imgloc, desc, name, email, pwd, imgloc
        setprof([val[0], val[1], val[2], val[3], val[4], val[5], val[1], val[2], val[3], val[4]]) //here, img and desc is not updated

        console.log('val:', val[1], val[2])

        setimg(val[4]) //this is img

        // seturl(URL.createObjectURL(val[4]))
        // seturlav(true)

        //reftext.current = val[5] //this is desc

        settextbox(val[5])

        // console.log(reftext.current)

    }, [])

    const handleplusclick = () => {

        setloading(true)

        let listt = ['newedit', '', '', '', '', parseInt(localStorage.getItem("gid").split(',')[0]), '', '', '', '']

        setlis([listt, ...lis])

    }

    const cancelnewclick = (location, addr, phno, oxyprice, id) => {

        console.log('dont send to there lol')

        for (let i = 0; i < lis.length; i++) {


            console.log(lis[i])

            if (lis[i][1] === location && lis[i][2] === addr && lis[i][3] === phno && lis[i][4] === oxyprice && lis[i][5] === id) {


                let listt = [

                    ...lis.slice(0, i),
                    ...lis.slice((i + 1), (lis.length))

                ]

                console.log(listt)


                if (listt === []) {

                    setloading(false)

                }

                setlis(listt)

                // refresh()

                break;
            }

        }
    }

    const canceloldclick = (location, addr, phno, oxyprice, id, newlocation, newaddr, newphno, newoxyprice) => {

        console.log('dont send to there lol')

        for (let i = 0; i < lis.length; i++) {


            console.log(lis[i])

            if (lis[i][1] === location && lis[i][2] === addr && lis[i][3] === phno && lis[i][4] === oxyprice && lis[i][5] === id, lis[i][6] === newlocation && lis[i][7] === newaddr && lis[i][8] === newphno && lis[i][9] === newoxyprice) {


                let listt = [

                    ...lis.slice(0, i),
                    ['noedit', newlocation, newaddr, newphno, newoxyprice, id],
                    ...lis.slice((i + 1), (lis.length))

                ]

                console.log(listt)

                if (listt === []) {

                    setloading(false)

                }

                setlis(listt)

                // refresh()

                break;
            }

        }


    }

    const deleteclick = (location, addr, phno, oxyprice, id, cond) => {

        console.log('posting now')

        console.log(id, cond)

        axios.post('/api/sellers/delete/', {
            location: location,
            addr: addr,
            phno: phno,
            oxyprice: parseFloat(oxyprice),
            id: id,
        })
            .then((res) => {

                console.log(res)

                console.log(res.status)

                if (res.status === 200) {

                    for (let i = 0; i < lis.length; i++) {

                        console.log(lis[i])

                        console.log(i)

                        if (lis[i][1] === location && lis[i][2] === addr && lis[i][3] === phno && lis[i][4] === oxyprice && lis[i][5] === id) {

                            console.log('lis :', lis)
                            console.log(['noedit', location, addr, phno, oxyprice, id])

                            setlis([
                                ...lis.slice(0, i),
                                ...lis.slice((i + 1), lis.length)
                            ])

                        }

                    }

                } else {
                    console.log(res.data.Data)
                }

            })

    }

    const saveclick = (location, addr, phno, oxyprice, id, type, newlocation, newaddr, newphno, newoxyprice) => {

        console.log('type: ', type)

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

                            for (let i = 0; i < lis.length; i++) {

                                console.log(lis[i])

                                console.log(i)

                                if (lis[i][0] === 'oldedit' && lis[i][1] === location && lis[i][2] === addr && lis[i][3] === phno && lis[i][4] === oxyprice && lis[i][5] === id && lis[i][6] === newlocation && lis[i][7] === newaddr && lis[i][8] === newphno && lis[i][9] === newoxyprice) {

                                    console.log('lis :', lis)
                                    console.log(['noedit', location, addr, phno, oxyprice, id])

                                    setlis([
                                        ...lis.slice(0, i),
                                        ['noedit', location, addr, phno, oxyprice, id],
                                        ...lis.slice((i + 1), lis.length)
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

                            for (let i = 0; i < lis.length; i++) {

                                console.log(lis[i])

                                console.log(i)

                                if (lis[i][0] === 'newedit' && lis[i][1] === location && lis[i][2] === addr && lis[i][3] === phno && lis[i][4] === oxyprice && lis[i][5] === id) {

                                    console.log('lis :', lis)
                                    console.log(['noedit', location, addr, phno, oxyprice, id])

                                    setlis([
                                        ...lis.slice(0, i),
                                        ['noedit', location, addr, phno, oxyprice, id],
                                        ...lis.slice((i + 1), lis.length)
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



    }

    // lis => [ 'edit or noedit', 'location', 'addr', 'phno', 'oxyprice', 'id' ]

    const editclick = (location, addr, phno, oxyprice, id) => {

        // setloading(true)

        console.log('edit : ', id)

        for (let i = 0; i < lis.length; i++) {
            if (id === lis[i][5] && location === lis[i][1] && addr === lis[i][2] && phno === lis[i][3] && oxyprice === lis[i][4]) {

                console.log('inside')

                let listt = ['oldedit', lis[i][1], lis[i][2], lis[i][3], lis[i][4], id, lis[i][1], lis[i][2], lis[i][3], lis[i][4]]

                console.log(listt)

                console.log(lis, i)

                let newlist = [...lis.slice(0, i), listt, ...lis.slice((i + 1), (lis.length))]

                console.log(newlist)

                setlis(newlist)

            }
        }
    }

    const handleprofile = () => {

        // hist.push("/update");

        setupdate(true)

    }

    // const processwithpwd = () => {

    //     localStorage.removeItem('gid')
    //     console.log([prof[0], prof[1], prof[2], newp, profilephoto, textbox])
    //     localStorage.setItem("gid", [prof[0], prof[1], prof[2], newp, profilephoto, textbox]);
    //     window.location.reload()

    // }

    // const processwithoutpwd = () => {

    //     localStorage.removeItem('gid')
    //     console.log([prof[0], prof[1], prof[2], prof[3], profilephoto, textbox])
    //     localStorage.setItem("gid", [prof[0], prof[1], prof[2], prof[3], profilephoto, textbox]);
    //     window.location.reload()

    // }

    const handlesubmit = (e) => {

        e.preventDefault()

        console.log('in')

        let nam = e.target[0].value
        let emai = e.target[1].value
        let oldp = e.target[2].value
        let newp = e.target[3].value
        let retp = e.target[4].value

        console.log(prof)

        console.log(prof[0], '||', nam, '||', emai, '||', prof[6], '||', prof[7], '||', oldp, '||', newp, '||', retp, '||', img, '||', textbox)


        //id, name, email, pwd, imgloc, desc
        //setdet([val[0], val[1], val[2], val[3], val[4], val[5]])

        //id, name, email, pwd, imgloc, desc, name, email, pwd, imgloc
        //setprof([val[0], val[1], val[2], val[3], val[4], val[5], val[1], val[2], val[3], val[4]])

        if (nam === '' || emai === '') {

            alert('Dont Leave the name or email empty!')

        } else if (newp === '' && oldp === '' && retp === '') {

            if (!(nam === prof[6] && emai === prof[7])) {

                const uploadData = new FormData();

                if (urlav) {

                    uploadData.append('id', prof[0])
                    uploadData.append('name', nam)
                    uploadData.append('email', emai)
                    uploadData.append('oldname', prof[6])
                    uploadData.append('oldemail', prof[7])
                    uploadData.append('cond', 'no')
                    uploadData.append('cond2', 'yes')
                    uploadData.append('oldpassword', '')
                    uploadData.append('newpassword', '')
                    uploadData.append('profilephoto', img, img.name)
                    uploadData.append('desc', textbox)

                } else {

                    uploadData.append('id', prof[0])
                    uploadData.append('name', nam)
                    uploadData.append('email', emai)
                    uploadData.append('oldname', prof[6])
                    uploadData.append('oldemail', prof[7])
                    uploadData.append('cond', 'no')
                    uploadData.append('cond2', 'no')
                    uploadData.append('oldpassword', '')
                    uploadData.append('newpassword', '')
                    uploadData.append('profilephoto', '')
                    uploadData.append('desc', textbox)

                }

                // axios.post('/api/update/', {

                //     id: prof[0],
                //     name: nam,
                //     email: emai,
                //     oldname: prof[6],
                //     oldemail: prof[7],
                //     cond: 'no',
                //     oldpassword: '',
                //     newpassword: '',
                //     profilephoto: img,
                //     desc: textbox,

                // })
                //     .then((res) => console.log(res))

                fetch('/api/sellers/update/', {
                    method: 'POST',
                    body: uploadData
                })
                    .then(res => {
                        if (res.status === 200) {
                            localStorage.removeItem('gid')
                            console.log([prof[0], prof[1], prof[2], prof[3], profilephoto, textbox])
                            localStorage.setItem("gid", [prof[0], prof[1], prof[2], prof[3], profilephoto, textbox]);
                            window.location.reload()
                        } else {
                            alert('something wrong! try again')
                        }
                    })
                    .catch(error => console.log(error))


            } else {

                alert('You didnt change any details')

            }

        } else if (newp === retp) {

            const uploadData = new FormData();

            if (urlav) {

                uploadData.append('id', prof[0])
                uploadData.append('name', nam)
                uploadData.append('email', emai)
                uploadData.append('oldname', prof[6])
                uploadData.append('oldemail', prof[7])
                uploadData.append('cond', 'yes')
                uploadData.append('cond2', 'yes')
                uploadData.append('oldpassword', oldp)
                uploadData.append('newpassword', newp)
                uploadData.append('profilephoto', img, img.name)
                uploadData.append('desc', textbox)

            } else {

                uploadData.append('id', prof[0])
                uploadData.append('name', nam)
                uploadData.append('email', emai)
                uploadData.append('oldname', prof[6])
                uploadData.append('oldemail', prof[7])
                uploadData.append('cond', 'yes')
                uploadData.append('cond2', 'no')
                uploadData.append('oldpassword', oldp)
                uploadData.append('newpassword', newp)
                uploadData.append('profilephoto', '')
                uploadData.append('desc', textbox)
            }

            // axios.post('/api/update/', {

            //     id: prof[0],
            //     name: nam,
            //     email: emai,
            //     oldname: prof[6],
            //     oldemail: prof[7],
            //     cond: 'yes',
            //     oldpassword: oldp,
            //     newpassword: newp,
            //     profilephoto: img,
            //     desc: textbox,

            // })
            //     .then((res) => console.log(res))

            fetch('/api/sellers/update/', {
                method: 'POST',
                body: uploadData
            })
                .then(res => {
                    if (res.status === 200) {
                        localStorage.removeItem('gid')
                        console.log([prof[0], prof[1], prof[2], newp, profilephoto, textbox])
                        localStorage.setItem("gid", [prof[0], prof[1], prof[2], newp, profilephoto, textbox]);
                        window.location.reload()
                    } else {
                        alert('Something wrong.. try again!')
                    }
                })
                .catch(error => console.log(error))

        } else {

            alert("Passwords doesn't match!")

        }

    }

    return (
        <Full>

            {
                update ?

                    det ?

                        <>

                            <Styles>
                                <Navbar expand="lg">
                                    <Navbar.Brand href="/">Ozone</Navbar.Brand>
                                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Navbar.Collapse id="basic-navbar-nav">
                                        <Nav className="ml-auto">

                                            <Nav.Item>
                                                <Nav.Link>
                                                    <Link to="/vaccinationlist">Vaccination List</Link>
                                                </Nav.Link>
                                            </Nav.Item>

                                            <Nav.Item>
                                                <Nav.Link>
                                                    <div onClick={handleclick} >Log Out</div>
                                                </Nav.Link>
                                            </Nav.Item>

                                            <Nav.Item>
                                                <Nav.Link>
                                                    <div onClick={() => { setupdate(false) }} >Go Back</div>
                                                </Nav.Link>
                                            </Nav.Item>

                                        </Nav>
                                    </Navbar.Collapse>
                                </Navbar>
                            </Styles >

                            {/* <p>{det[0]}</p> */}

                            <FirstHalf>

                                <LeftHalf>

                                    <Round>

                                        <input type='file' id='imageupload' style={{ display: 'none' }} accept="image/*"
                                            onChange={(e) => {

                                                console.log('inside change')

                                                console.log(e.target.files[0])

                                                setimg(e.target.files[0])

                                                const file = e.target.files[0]

                                                seturlav(true)
                                                seturl(URL.createObjectURL(file))
                                                console.log(URL.createObjectURL(file))


                                            }}
                                        />

                                        {
                                            console.log(img)
                                        }

                                        {

                                            urlav ? <Roundimg src={url} onClick={() => {

                                                document.getElementById('imageupload').click()

                                            }} /> :

                                                <Roundimg src={img} onClick={() => {

                                                    document.getElementById('imageupload').click()

                                                }} />

                                        }

                                        {/* <Roundimg src={ img } onClick={() => {

                                            document.getElementById('imageupload').click()

                                        }} /> */}

                                    </Round>

                                </LeftHalf>

                                <RightHalf>

                                    <h5 style={{ textAlign: 'center', marginBottom: '20px' }}>
                                        Leave the password boxes empty if you dont want to change the password
                                        </h5>

                                    <form onSubmit={(e) => { handlesubmit(e) }} >

                                        <div class="input-group mb-3">
                                            <span style={{ width: '65px' }} class="input-group-text" id="inputGroup-sizing-default">Name</span>
                                            <input value={prof[1]}
                                                onChange={(e) => {
                                                    console.log(e.target.value)
                                                    setprof([prof[0], e.target.value, prof[2], prof[3], prof[4], prof[5], prof[6], prof[7], prof[8]])
                                                }} type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                                        </div>

                                        <div class="input-group mb-3">
                                            <span style={{ width: '65px' }} class="input-group-text" id="inputGroup-sizing-default">Email</span>
                                            <input value={prof[2]}
                                                onChange={(e) => {
                                                    console.log(e.target.value)
                                                    setprof([prof[0], prof[1], e.target.value, prof[3], prof[4], prof[5], prof[6], prof[7], prof[8]])
                                                }}
                                                type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                                        </div>

                                        <div class="input-group mb-3">
                                            <span style={{ width: '145px' }} class="input-group-text" id="inputGroup-sizing-default">Old  Password</span>
                                            <input type="password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                                        </div>

                                        <div class="input-group mb-3">
                                            <span style={{ width: '145px' }} class="input-group-text" id="inputGroup-sizing-default">New Password</span>
                                            <input type="password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                                        </div>

                                        <div class="input-group mb-3">
                                            <span style={{ width: '145px' }} class="input-group-text" id="inputGroup-sizing-default">Retype Password</span>
                                            <input type="password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                                        </div>

                                        <input id='hid' type='submit' style={{ display: 'none' }} />

                                        <Save onClick={() => { document.getElementById('hid').click() }} >
                                            <SaveIcon fontSize="large" style={{ color: 'white' }} />
                                        </Save>

                                    </form>

                                </RightHalf>

                            </FirstHalf>

                            <SecondHalf>

                                <h2> About You: </h2>
                                <Textarea value={textbox} onChange={(e) => { settextbox(e.target.value) }} />

                            </SecondHalf>


                            {/* <p>{det[3]}</p> */}

                        </>

                        :

                        <p>Please wait till we get the data</p>

                    :

                    <>

                        <Styles>
                            <Navbar expand="lg">
                                <Navbar.Brand href="/">Ozone</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="ml-auto">

                                        <Nav.Item>
                                            <Nav.Link>
                                                <Link to="/vaccinationlist">Vaccination List</Link>
                                            </Nav.Link>
                                        </Nav.Item>

                                        <Nav.Item>
                                            <Nav.Link>
                                                <div onClick={handleprofile} >Update Profile</div>
                                            </Nav.Link>
                                        </Nav.Item>

                                        <Nav.Item>
                                            <Nav.Link>
                                                <div onClick={handleclick} >Log Out</div>
                                            </Nav.Link>
                                        </Nav.Item>

                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                        </Styles >

                        <Logout >

                            {/* <button type="button" class="btn btn-warning c1 c" onClick={handleclick} >Logout <ExitToAppIcon /> </button> */}
                            {/* <button type="button" class="btn btn-warning c1 c" onClick={handleprofile} >Update Profile <EditIcon /> </button> */}

                        </Logout>
                        {/* <Title >
                            <p style={{ margin: 0, padding: 0 }} >Seller Page</p>
                        </Title >
                        < Hr /> */}
                        <Listview>
                            <Plus onClick={handleplusclick}>
                                <AddIcon style={{ color: 'white' }} />
                            </Plus>

                            {
                                console.log(loading, lis.length >= 1, loading && lis.length >= 1)
                            }

                            {
                                ((lis.length >= 1) && (loading)) ?


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

                                                    Location : <input
                                                                        type='text'
                                                                        onChange={(e) => setlis([...lis.slice(0, index), [element[0], e.target.value, element[2], element[3], element[4], element[5], element[6], element[7], element[8], element[9]], ...lis.slice((index + 1), lis.length)])}
                                                                        value={element[1]}
                                                                    />

                                                                    {/* </Typography> */}
                                                                    {/* <Typography variant="body2" component="p"> */}

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

                                                                            if (!(element[1] === '' || element[2] === '' || element[3] === '' || element[4] === '')) {

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

                                                                        }} >
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


                                                                    </Bottom>
                                                                </CardActions>
                                                            </Card>

                                                        </Grid>

                                                    )

                                                }

                                            })
                                        }


                                    </Grid>


                                    : loading ?

                                        <p>Loading....</p> :

                                        <p>No data. Click plus symbol to create one</p>

                            }
                        </Listview>

                    </>

            }
        </Full>
    )
}

const Full = styled.div`

height: 100%;

`

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

position: sticky;
background-color: #1685F1;
width: 40px;
height: 40px;
border-radius: 50%;
top: 100px;
// right: 50px;
left: 95%;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;

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

const Styles = styled.div`

position: sticky;
top: 0;

.navbar {

    background-color: #222;

}

a, .navbar-brand, .navbar-nav .nav-link {

    color: #bbb !important;

    &:hover {

        color: white !important;
        text-decoration: none !important;
    
    }
}

`

const FirstHalf = styled.div`

height: 50%;
width: 100%;
display: flex;
flex-direction: row;

`

const LeftHalf = styled.div`

height: 100%;
width: 50%;
display: flex;
justify-content: center;
align-items: center;

`

const RightHalf = styled.div`

height: 100%;
width: 400px;
display: flex;
flex-direction: column;
justify-content: center

`

const Round = styled.div`

height: 200px;
width: 200px;
border-radius: 50%;

&: hover {
    cursor: pointer;
}

`

const Roundimg = styled.img`

width: 100%;
height: 100%;
border-radius: 50%;
border: 1px solid black;

`

const Save = styled.div`

width: 60px;
height: 60px;
border-radius: 50%;
background-color: #1685F1;
display: flex;
justify-content: center;
align-items: center;
position: absolute;
bottom: 10px;
right: 10px;

&: hover {
    cursor: pointer;
}

`

const SecondHalf = styled.div`

width: 100%;
padding: 15px;
height: ${window.innerHeight / 2 - 56}px;
display: flex;
justify-content: center;
flex-direction: column;

`

const Textarea = styled.textarea`

height: 90%;
width: 90%;

`

export default SellerHome
