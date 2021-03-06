import React, { Component } from 'react'
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  FormGroup,
  FormControl,
  MenuItem,
  Grid,
  Row,
  Col
} from 'react-bootstrap'
import { Link, Switch, Redirect, Route,withRouter} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

import Sales from './components/Sales'
import Sale from './components/Sale'
import NotFound from './components/NotFound'
import './App.css'

class App extends Component {



  constructor(props) {

    super(props);

    this.state = {

      recentlyViewed: [],

      searchId: ""

    };

    

    // Bind the method inside the constructor

    this.viewedSale = this.viewedSale.bind(this);

    this.updateSearchId = this.updateSearchId.bind(this);



  }



  // Method implementation

  viewedSale(id) {

    if (this.state.recentlyViewed.indexOf(id) === -1) {

    this.setState({

        recentlyViewed: [...this.state.recentlyViewed, id]

      })

  }}



  // Method implementation

  updateSearchId(e) {

    this.setState({

      searchId: e.target.value

    });

  }





  render() {

    return (

      <div>

        <Navbar inverse collapseOnSelect staticTop>

          <Navbar.Header>

            <LinkContainer to="/">

              <Navbar.Brand>

                WEB422 - Sales

            </Navbar.Brand>

            </LinkContainer>

            <Navbar.Toggle />

          </Navbar.Header>

          <Navbar.Collapse>

            <Nav>

              <LinkContainer to="/Sales">

                <NavItem>

                  All Sales

                </NavItem>

              </LinkContainer>

              <NavDropdown title="Previously Viewed" id="basic-nav-dropdown">

                {this.state.recentlyViewed.length > 0 ?

                  this.state.recentlyViewed.map((id, index) => (

                    <LinkContainer to={`/Sale/${id}`} key={index}>

                      <MenuItem>

                        Sale: {id}

                      </MenuItem>

                    </LinkContainer>

                  )) :

                  <MenuItem>

                    ...

                  </MenuItem>

                }

              </NavDropdown>

            </Nav>

            <Navbar.Form pullRight>

              <FormGroup>

                <FormControl type="text" onChange={this.updateSearchId} placeholder="Sale ID" />

              </FormGroup>{''}

              <Link className="btn btn-default" to={"/Sale/" + this.state.searchId}>Search</Link>

            </Navbar.Form>

          </Navbar.Collapse>

        </Navbar>



        <Grid>

          <Row>

            <Col md={12}>



              {/* Routes */}

              <Switch>



                {/* Redirect Home to Sales */}

                <Route exact path="/" render={() => (

                  <Redirect push to={"/Sales"} />

                )} />



                {/* Route to Sales */}

                <Route exact path="/Sales" render={() => (

                  <Sales />

                )} />



                {/* Route to Sale/id */}

                <Route path="/Sale/:id" render={(props) => (

                  <Sale id={props.match.params.id} viewedSale={this.viewedSale} />

                )} />



                {/* Route to catch all non-existent route */}

                <Route render={() => (

                  <NotFound />

                )} />



              </Switch>

            </Col>

          </Row>

        </Grid>

      </div>

    );

  } 

}



export default withRouter(App);