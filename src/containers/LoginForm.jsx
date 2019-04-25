import React from 'react';
import { Button, Form, FormGroup, FormFeedback, Label, Input, Container, Col } from 'reactstrap';
import { loginAPICall } from '../actions/UserActions'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchTicketsAPICall } from '../actions/TicketActions'
import { Role } from '../masterdata/ApplicationMasterData';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userId: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.onSubmitLogin = this.onSubmitLogin.bind(this);

  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmitLogin(e) {
    e.preventDefault();
    this.props.onLogin(this.state);
  }


  render() {
    if (this.props.user.isLoggedIn) {
      switch (this.props.user.profile.role) {
        case Role.ROLE_ENGINEER:
          this.props.fetchTickets({
            status: 'all',
            sortBy: 'ticketId'
          });
          return <Redirect push to={{
            pathname: "/ticketmaint/tickets?status=all"
          }} />;

        case Role.ROLE_USER:
          this.props.fetchTickets({
            status: 'all',
            sortBy: 'ticketId'
          });
          return <Redirect push to={{
            pathname: "/tickets"
          }} />;

        case Role.ROLE_MANAGER:
          this.props.fetchTickets({
            status: 'all',
            sortBy: 'ticketId'
          });
          return <Redirect push to={{
            pathname: "/ticketmanage/tickets?status=all"
          }} />;

        default:
          return;
      }

    }
    return (
      <Container style={{ 'width': '60%', paddingBottom: '3%', paddingTop: '3%', marginTop: '2%', backgroundColor: '#E8EAED' }}>
        <h2>Sign In</h2>
        <Form className="form">
          {this.props.isLoginFailure && <Label className="text-danger">{this.props.loginFailureMessage}</Label>}
          <Col>
            <FormGroup>
              <Label>UserId</Label>
              <Input
                name="userId"
                id="userId"
                placeholder="myemail@email.com"
                onChange={this.handleChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="********"

                value={this.state.password}
                onChange={this.handleChange}
              />
            </FormGroup>
          </Col>
          <Button onClick={this.onSubmitLogin}>Submit</Button>
        </Form>
      </Container>
    );
  }
}

const mapActionsToProps = {
  onLogin: loginAPICall,
  fetchTickets: fetchTicketsAPICall
}

const mapStateToProps = function (state) {
  return {
    user: state.user,
    isLoginFailure: state.user.isLoginFailure,
    loginFailureMessage: state.user.loginFailureMessage
  }
}

export default connect(mapStateToProps, mapActionsToProps)(LoginForm);