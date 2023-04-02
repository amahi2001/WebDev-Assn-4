/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

//react bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super();
    this.state = {
      accountBalance: 0,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  //update account balance based on credits and debits
  updateBalance() {
    let creditSum = 0;
    let debitSum = 0;
    for (let i of this.state.creditList) {
      creditSum += i.amount;
    }
    for (let i of this.state.debitList) {
      debitSum += i.amount;
    }
    this.setState(
      {
        accountBalance: creditSum - debitSum
      }
    );
  }


  componentDidMount() {  // Fetch data from API
    fetch('https://johnnylaicode.github.io/api/credits.json')
      .then(response => response.json())
      .then(data => this.setState({ creditList: data }, () => this.updateBalance()))
      .catch(error => console.log('Error fetching and parsing data', error));
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser })
  }

  // Create Routes and React elements to be rendered using React components
  render() {
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} addCredit={(obj) => {
      const newCreditList = [...this.state.creditList, obj];
      this.setState({ creditList: newCreditList },  () => this.updateBalance());
    }} accountBalance={this.state.accountBalance} />)
    const DebitsComponent = () => (<Debits debits={this.state.debitList} />)

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/WebDev-Assn-4">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">Bank of React</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/credits">Credits</Nav.Link>
              <Nav.Link as={Link} to="/debits">Debits</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Container>
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/credits" render={CreditsComponent} />
          <Route exact path="/debits" render={DebitsComponent} />
        </Container>
      </Router>
    );
  }
}

export default App;