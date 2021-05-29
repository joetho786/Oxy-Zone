
import React , {useEffect, useState} from 'react';

const Vaccinationlisting =() =>{
  
  const [states, setstates]=useState([])


  useEffect(()=>{
       axios
       .get("https://cdn-api.co-vin.in/api/v2/admin/location/states")
       .then(resp => {
         
         setstates(resp.data.states)
         console.log('resp: '+resp)
       
          })
    
    
  },[])

    
return(
  <>
  <NavigationBar/>
  <Layout>
  <h1>Search vaccination centers</h1>
  <Form>
    <Form.Group controlId="State">
      <Form.Label class="fhead">State Name</Form.Label>
      <Form.Control as ="select">
      
      if (!(states.length === 0)) {

        states.map((element) => {console.log(element)})
      
      } else {

        <p>loading</p>

      }
      
      </Form.Control>
    </Form.Group>

    <Form.Group controlId="District">
      <Form.Label class="fhead">District Name</Form.Label>
      <Form.Control as="select">
      
      if (!(states.length === 0)) {

        console.log(states)

      } else {

        <p>loading</p>

      }
      
      </Form.Control>
    </Form.Group>

    <Button variant="primary" type="submit">
      Search
    </Button>
  </Form>
</Layout>

  
 </>
)

}


export default Vaccinationlisting;
