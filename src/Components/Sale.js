import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {ListGroup,ListgroupItem,Table} from 'react'

class Sale extends Component{
    
    state={
        sale:{},
        loading:true
    }
    getData=async()=>{
        const{id, viewedSale}=this.props
        fetch(`https://peaceful-chamber-75210.herokuapp.com/api/sales?page=${page}&perPage=${perPage}`)
        .then(res=>res.json())
        .then((sale) => {
             // an "id" property exists on the returned data
                this.setState({
                    sale,
                    
                    loading: false // no longer loading
                });
            viewedSale(id)
        }).catch((err)=>console.error(err))

    }

    componentDidMount(){
      
       this.getData()
    }
       componentDidUpdate(){
           if(this.props.id !==prevProps.id){
               this.setState({loading:true})
               this.getData()
           }
       }
       itemTotal=(items)=>{
           let total=0
           for(let item of items){
               total+=item.price
           }
           return total.toFixed(2)
       }
       render() {
        if (this.state.loading) {
          return (
            <div className='loaderContainer'>
              <ReactLoading type='spin' color='red' className='loader' />
            </div>
          )
        } else if (this.state.sale._id) {
          const { sale } = this.state
          return (
            <div>
              <h1>Sale: {sale._id}</h1>
              <h2>Customer</h2>
              <ListGroup>
                <ListGroupItem>
                  <strong>email:</strong> {sale.customer.email}
                </ListGroupItem>
    
                <ListGroupItem>
                  <strong>age:</strong> {sale.customer.age}
                </ListGroupItem>
    
                <ListGroupItem>
                  <strong>satisfaction:</strong> {sale.customer.satisfaction}
                </ListGroupItem>
              </ListGroup>
    
              <h2>Items: ${this.itemTotal(sale.items)}</h2>
    
              <Table>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {sale.items.map(({ name, quantity, price }) => (
                    <tr key={uuid()}>
                      <td>{name}</td>
                      <td>{quantity}</td>
                      <td>{price}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )
        } else {
          return (
            <div>
              <h1>Unable to find Sale</h1>
              <p>id: {this.props.id}</p>
            </div>
          )
        }
      }
}

export default Product;