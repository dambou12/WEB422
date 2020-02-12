import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Pagination } from 'react-bootstrap';
//import ReactLoading from 'react-loading';

class Sales extends Component {

  constructor(props) {

      super(props);

      this.state = {

          sales: [],

          currentPage: 1

      };

      this.previousPage = this.previousPage.bind(this);

      this.nextPage = this.nextPage.bind(this);

  }



  // Utility method implementation

  getData(page) {

      fetch(`https://peaceful-chamber-75210.herokuapp.com/api/sales?page=${page}&perPage=10`)

      .then((response) => {
          
          return response.json();
    
      })

      .then((myJson) => {

          this.setState({sales: myJson});

      });

  }

  

  

  // Component DidMount

  componentDidMount() {

      this.setState(this.getData(this.state.currentPage));

  }

  

  // Previous Page

  previousPage() {

      if (this.state.currentPage > 1) {

          this.getData(this.state.currentPage - 1);

          this.setState({currentPage: this.state.currentPage - 1});

      }

  }

  

  // Next Page

  nextPage() {

      this.getData(this.state.currentPage + 1);

      this.setState({currentPage: this.state.currentPage + 1});

  }

  render() {
    if (this.state.sales.length > 0) {
      return (
        <div>
          <Table hover>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Store Location</th>
                <th>Number of Items</th>
                <th>Sale Date</th>
              </tr>
            </thead>
            <tbody>
              {this.state.sales.map((sale) => (
                <tr
                  key={sale._id}
                  onClick={() => this.props.history.push(`/Sale/${sale._id}`)}
                >
                  <td>{sale.customer.email}</td>
                  <td>{sale.storeLocation}</td>
                  <td>{sale.items.length}</td>
                  <td>{new Date(sale.saleDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination>
            <Pagination.Prev onClick={this.previousPage} />
            <Pagination.Item>{this.state.currentPage}</Pagination.Item>
            <Pagination.Next onClick={this.nextPage} />
          </Pagination>
        </div>
      )
    } else
      return null;
  }
}

export default withRouter(Sales)