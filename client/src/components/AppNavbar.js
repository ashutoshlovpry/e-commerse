import { Component, Fragment } from 'react';
import {
    Collapse, 
    Navbar, 
    NavbarToggler, 
    NavbarBrand, 
    Nav, 
    NavItem, 
    Container, 
    NavLink,
    Button,
    Input,
    Label

} from 'reactstrap';
import RegisterModal from './auth/registerModal';
import Logout from './auth/Logout';
import LoginModal from './auth/loginModal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import {searchItem,getItems} from '../actions/itemActions'
let temp=0



class AppNavbar extends Component {
    state = {
        isOpen: false,
        quantity:0,
        search:''

    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    search=()=>{
       // axios.post('/api/', this.state.search)
       this.props.searchItem(this.state.search)
console.log(this.state.search);


    }
    componentDidMount(){
        
    }

componentDidUpdate(prevprops,prevstate){
    console.log('pp',this.props)
    if(this.props.cart.cart){
if(prevprops.cart.cart.items!==this.props.cart.cart.items){
    
     this.props.cart.cart.items.forEach(element => {
        console.log({element})
                temp=temp+element.quantity
                console.log({temp})
                return temp

            })
          

    
    this.setState({...this.state,quantity:temp})
    temp=0
}
}

}
slectCategory=(val)=>{
if(val)this.props.getItems(val)
}
    render() {
        const { isAuthenticated, user } = this.props.auth;
       
        const authLinks = (
            <Fragment>
                <NavItem>
                <Input type="select" style={{'width':'200px','marginInline':'50px'}} onChange={(e)=>this.slectCategory(e.target.value)}>
                <option >Category</option>
                <option value='elctronics'>Electronics</option>
            <option value='grocery'>Grocery</option>
            <option value='clothes'>clothes</option>
                </Input>
                </NavItem>
                <NavItem>
                <input type='text' onChange={(e)=>this.setState({...this.state,search:e.target.value})}></input>
                <Button style={{'marginRight':'50px'}} onClick={this.search}>Search</Button>
                </NavItem>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{ user ? `Hello ${user.name}` : ''}</strong>
                    </span>
                </NavItem>

                <NavItem>
                    <NavLink href="/">Home</NavLink>
                </NavItem>
                
                <NavItem>
                <div style={{"color":this.state.quantity>0?'red':''}}>  <NavLink href="/cart">Cart  {this.state.quantity}</NavLink></div>
                   
                </NavItem>
               
                <NavItem>
                    <Logout/>
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                {/* <Label style={{"color":"blue",'left-margin':'30%'}}>Categories</Label><NavItem></NavItem> */}
                <Input type="select" style={{'width':'200px','marginInline':'50px'}} onChange={(e)=>this.slectCategory(e.target.value)}>
                <option >Category</option>
                <option value='elctronics'>Electronics</option>
            <option value='grocery'>Grocery</option>
            <option value='clothes'>clothes</option>
                </Input>
                </NavItem>
                <NavItem>
                <input type='text' style={{'width':'200px','rightMargin':'50px'}} onChange={(e)=>this.setState({...this.state,search:e.target.value})}></input>
                <Button onClick={this.search}>Search</Button>
                </NavItem>
                <NavItem>
                    <RegisterModal/>
                </NavItem>
                <NavItem>
                    <LoginModal/>
                </NavItem>
            </Fragment>
        );

        return(
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar> 
                                { isAuthenticated ? authLinks: guestLinks}                               
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    cart: state.cart,
    auth: state.auth
})

export default connect(mapStateToProps, {searchItem,getItems})(AppNavbar);