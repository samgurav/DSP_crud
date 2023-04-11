import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import './DetailPage.css'
import { DeleteDetails, UpdateDetails, addDetails, getDetails } from '../Service/config';
const DetailPage = () => {
  const [data,setData]=useState({
    "name":'',
    "email":'',
    "mobile":'',
    "state":'',
    "city":''
  })
  const [table,setTable]=useState([{
    name:'sam',
    email:'sam@gmail.com',
    mobile:'8999999999',
    state:'maharashtra',
    city:'mumbai'
  }])
  const [temp,setTemp]=useState(false)
  const [flag,setFlag]=useState(false)
    const handler=(e)=>{
       const {name,value}=e.target;
       setData({...data,[name]:value})
    }

    const Submit=(e)=>{
      e.preventDefault();
      addDetails(data).then(res=>{
        if(res.status!==200) {
            alert(res.data.message)
            console.log('no')
          }
          alert('data added successfully')
          setTemp((prev)=>!prev)
        setData({
          "name":'',
          "email":'',
        "mobile":'',
        "state":'',
        "city":''})
        console.log(res.status)
    })
    }

    const Update=(e)=>{
      e.preventDefault()
      UpdateDetails(data).then(res=>{
        if(res.status!==200) {
            alert(res.data.message)
            console.log('no')
          }
          alert('data updated successfully')
          setFlag(false)
          setTemp((prev)=>!prev)
        setData({
          "name":'',
          "email":'',
        "mobile":'',
        "state":'',
        "city":''})
        console.log(res.status)
    })
    }
    
    const Delete=(email)=>{
         DeleteDetails({email}).then(res=>{
          if(res.status!==200) {
              alert(res.data.message)
              console.log('no')
            }
            alert('data deleted successfully')
            setTemp((prev)=>!prev)
          console.log(res.status)
      })
    }

    useEffect(() => {
  
          getDetails()
          .then(res=>{
              if(res.status!==200){
                  alert(res.data.message) 
              }
              else if(res.status===200){
                setTable(res.data)
                console.log(res.data)
              }
            })    
  }, [temp])

  console.log(data)
  return (
    <div className='container'> 
    <Card className='card'>
      <h1>Form Details</h1>
    <Form className='p-2' onSubmit={Submit} >
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Name
        </Form.Label>
        <Col sm="10">
          <Form.Control name='name' type='text' onChange={handler} placeholder='enter name' defaultValue={data.name}  />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Email
        </Form.Label>
      
        <Col sm="10">
        {
          flag?
          <Form.Control type="text" name="email" onChange={handler} placeholder="Enter email" defaultValue={data.email} disabled/>:
          <>
           <Form.Control type="text" name="email" onChange={handler} placeholder="Enter email" defaultValue={data.email} />
          </>
        }
         
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Mobile
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" name="mobile" onChange={handler} placeholder="Enter mobile" defaultValue={data.mobile} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          State
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" name="state" onChange={handler} placeholder="Enter State" defaultValue={data.state} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          City
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" name="city" onChange={handler} placeholder="Enter city" defaultValue={data.city}/>
        </Col>
      </Form.Group>
      <div>
      {
              flag? 
              <Button variant="warning" onClick={Update} >Update</Button>
            :
              <>
      <Button variant="success" type='submit'>Submit</Button>{' '}
      </>
}
      <Button variant="danger"type='reset' onClick={()=>{setFlag(false)}}>Cancel</Button>{' '}

      </div>
    </Form></Card>
<div className='p-5'>
     <Table striped bordered hover>
      <thead>
            <tr>
            {/* <th>id</th> */}
            <th> Name</th>
            <th>Email</th>
            <th>Mobile</th>
              
            <th>State</th>
            <th>City</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
        { table && table.map((ele,index)=>
          <tr>
            {/* <td>{ele.id}</td> */}
            <td>{ele.name}</td>
            <td>{ele.email}</td>
            <td>{ele.mobile}</td>
            <td>{ele.state}</td>
            <td>{ele.city}</td>
            <td>  <Button variant="danger" onClick={()=>Delete(ele.email)}>Delete</Button>{' '}
          
                <Button variant="warning"  onClick={()=>{setData({name:ele.name,mobile:ele.mobile,state:ele.state,city:ele.city,email:ele.email});setFlag(true)}} >updateDetails</Button>
            
</td>
          </tr>
        
        )
      }
        </tbody>
       
    </Table>  
    </div>
       
      </div>
  )
}

export default DetailPage

