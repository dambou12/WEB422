
import React, { Component } from 'react';

import { ListGroup, ListGroupItem, Table } from 'react-bootstrap';

// import ReactLoading from 'react-loading';
// import uuid from 'uuid/v4';

class Sale extends Component {

    constructor(props) {

        super(props);

        this.state = {

            sale: {},

            loading: true

        };

    }



    // Component DidMount

    componentDidMount() {

        fetch(`https://peaceful-chamber-75210.herokuapp.com/api/sales/${this.props.id}`)

        .then((response) => {

            return response.json();

        })

        .then((myJson) => {

            this.setState({sale: myJson});

            this.props.viewedSale(myJson._id)

        });

    }

    

    // Render function

    render() {
      if (this.state.loading) {
        return null;
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
  
  export default Sale