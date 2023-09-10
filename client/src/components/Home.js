import { Component } from 'react';
import AppNavbar from './AppNavbar';
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Container, Alert} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import { addToCart , updateCart} from '../actions/cartActions';
import axios from 'axios';

class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            clothes:[],
            electronics:[],
            grocry:[]
        }
        this.getItemsByCategory=this.getItemsByCategory.bind(this)
    }
    getItemsByCategory= async(category)=>{
      let res=  await axios.post('/api/items',{category})
      console.log({res});
       return res.data 
    }
   async componentDidMount(){
        
        
     let clothes=  await this.getItemsByCategory('clothes')
     this.setState({...this.state,clothes:clothes})
     let electronics=  await this.getItemsByCategory('elctronics')
     this.setState({...this.state,electronics})
     let grocry=  await this.getItemsByCategory('grocery')
     this.setState({...this.state,grocry})
        
    }

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        addToCart: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
    }

    onAddToCart = async (id, productId) => {
         await this.props.addToCart(id, productId, 1);
        // alert ('Item added to Cart');
    }
    onUpdateQuantity = async (userId, productId, qty) => {
        await this.props.updateCart(userId, productId, qty);
      }
    render(){
        const { items } = this.props.item;
        const user = this.props.user;
        const {clothes,electronics,grocry}=this.state
        return (
            <div>
            <AppNavbar/>
            <Container>
                {console.log("serch",items)}
                {items?.length && items.map((item)=>{
                    return(<>
                     <Card className="">
                        <CardBody>
                            <CardTitle tag="h5">{item.title}</CardTitle>
                            <CardSubtitle tag="h6">Rs. {item.price}</CardSubtitle>
                            <CardText>{item.category}</CardText>
                            <img src={item.img} style={{'height':'50px','width':'50px'}}></img><br/>
                            {this.props.isAuthenticated ? 
                                <Button
                                    color="success"
                                    size="sm"
                                    onClick={this.onAddToCart.bind(this, user._id, item._id)}
                                    >Add To Cart</Button> :
                                    null}
                                     <Card>
                           
                        </Card>
                        </CardBody>
                    </Card>
                    </>)
                })}
                {this.props.searchList?.length &&  !items.length && this.props.searchList.map((item)=>{

                    return(<>
                    <Card className="">
                        <CardBody>
                            <CardTitle tag="h5">{item.title}</CardTitle>
                            <CardSubtitle tag="h6">Rs. {item.price}</CardSubtitle>
                            <CardText>{item.category}</CardText>
                            <img src={item.img} style={{'height':'50px','width':'50px'}}></img><br/>
                            {this.props.isAuthenticated ? 
                                <Button
                                    color="success"
                                    size="sm"
                                    onClick={this.onAddToCart.bind(this, user._id, item._id)}
                                    >Add To Cart</Button> :
                                    null}
                                     <Card>
                           
                        </Card>
                        </CardBody>
                    </Card>
                    </>)

                })}
               {!this.props.searchList?.length && <div className="">
                   {clothes.length && <>clothes</>}
                   <div className="row">
                {this.state.clothes.length && this.state.clothes.map((item)=>(
                    
                    <Card className="col-md-4">
                        <CardBody>
                            <CardTitle tag="h5">{item.title}</CardTitle>
                            <CardSubtitle tag="h6">Rs. {item.price}</CardSubtitle>
                            <CardText>{item.category}</CardText>
                            <img src={item.img} style={{'height':'50px','width':'50px'}}></img><br/>
                            {this.props.isAuthenticated ? 
                                <Button
                                    color="success"
                                    size="sm"
                                    onClick={this.onAddToCart.bind(this, user._id, item._id)}
                                    >Add To Cart</Button> :
                                    null}
                                     <Card>
                           
                        </Card>
                        </CardBody>
                    </Card>
                 
                ))}
                </div>
                {grocry.length && <>Grocery</>}
                <div className="row">

                {grocry.length && grocry.map((item)=>(
                    <div className="col-md-4">
                    <Card className="">
                        <CardBody>
                            <CardTitle tag="h5">{item.title}</CardTitle>
                            <CardSubtitle tag="h6">Rs. {item.price}</CardSubtitle>
                            <CardText>{item.category}</CardText>
                            <img src={item.img} style={{'height':'50px','width':'50px'}}></img><br/>
                            {this.props.isAuthenticated ? 
                                <Button
                                    color="success"
                                    size="sm"
                                    onClick={this.onAddToCart.bind(this, user._id, item._id)}
                                    >Add To Cart</Button> :
                                    null}
                                     <Card>
                           
                        </Card>
                        </CardBody>
                    </Card>
                    </div>
                   
                ))
                
                            }
                            </div>
                            {electronics.length && <>Electonics</>}
                            <div className="row">
                            {electronics.length && electronics.map((item)=>(
                    
                    <Card className="col-md-4">
                        <CardBody>
                            <CardTitle tag="h5">{item.title}</CardTitle>
                            <CardSubtitle tag="h6">Rs. {item.price}</CardSubtitle>
                            <CardText>{item.category}</CardText>
                            <img src={item.img} style={{'height':'50px','width':'50px'}}></img><br/>
                            {this.props.isAuthenticated ? 
                                <Button
                                    color="success"
                                    size="sm"
                                    onClick={this.onAddToCart.bind(this, user._id, item._id)}
                                    >Add To Cart</Button> :
                                    null}
                                     <Card>
                           
                        </Card>
                        </CardBody>
                    </Card>
                  
                ))
                            }
                            </div>
                            
                {!(this.state.clothes.length && this.state.electronics && this.state.grocry) && <div style={{width:"100%"}}><Alert className="text-center">No products found. </Alert></div>}
                 </div>
    }
            </Container>
            </div>
        )
    }
}const qtyBox = {display: "flex", justifyContent: "space-evenly", border: "1px solid #aaa", borderRadius: "5px", paddingTop: "5px", paddingBottom: "5px", marginBottom: "5px"};
const qtyBtn = {paddingLeft: "5px", paddingRight: "5px", borderRadius: "5px", marginBottom: "0px"};

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    searchList:state.item.searcedItems
})

export default connect(mapStateToProps, {getItems, addToCart ,updateCart})(Home);