import { Component } from 'react';
import AppNavbar from './AppNavbar';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Container, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import { addToCart, updateCart } from '../actions/cartActions';
import axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notFound:false,
            categries: [{ name: 'clothes', data: [] }, { name: 'electronics', data: [] }, { name: 'grocery', data: [] }],
        }
        this.getItemsByCategory = this.getItemsByCategory.bind(this)
    }
    getItemsByCategory = async (category) => {
        let res = await axios.post('/api/items', { category })
      
        return res.data
    }

    async componentDidMount() {

        this.getAllItems()


    }
    getAllItems = async () => {
        let res = await axios.get('/api/all_items')
        let clothes = []
        let electronics = []
        let grocery = []
        if(!res.data.length) this.setState({...this.state,notFound:true})
        res.data.forEach(element => {
            if (element.category === "clothes") {
                clothes = [...clothes, element]
            }
            if (element.category === "elctronics") {
                electronics = [...electronics, element]
            }
            if (element.category === "grocery") {
                grocery = [...grocery, element]
            }

        });
        this.setState((prev) => {
            prev.categries.forEach((i) => {
                if (i.name === "clothes") i.data = clothes
                if (i.name === "electronics") i.data = electronics
                if (i.name === "grocery") i.data = grocery
            })
        })
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
    render() {
        const { items } = this.props.item;
        const user = this.props.user;
        return (
            <div>
                <AppNavbar />
                <Container>
                    {items?.length && items.map((item) => {
                        return (<>
                            <Card className="">
                                <CardBody>
                                    <CardTitle tag="h5">{item.title}</CardTitle>
                                    <CardSubtitle tag="h6">Rs. {item.price}</CardSubtitle>
                                    <CardText>{item.category}</CardText>
                                    <img src={item.img} style={{ 'height': '50px', 'width': '50px' }}></img><br />
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
                    {this.props.searchList?.length && !items.length && this.props.searchList.map((item) => {

                        return (<>
                            <Card className="">
                                <CardBody>
                                    <CardTitle tag="h5">{item.title}</CardTitle>
                                    <CardSubtitle tag="h6">Rs. {item.price}</CardSubtitle>
                                    <CardText>{item.category}</CardText>
                                    <img src={item.img} style={{ 'height': '50px', 'width': '50px' }}></img><br />
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
                        <div className="row">
                            {this.state.categries.length && this.state.categries.map((ele) => {

                                return (
                                    <> {ele.name}
                                        {

                                            ele.data.length && ele.data.map((item) => (
                                                <div className="row" >
                                                    <Card className="col-md-4">
                                                        <CardBody>
                                                            {console.log({ item })}
                                                            <CardTitle tag="h5">{item.title}</CardTitle>
                                                            <CardSubtitle tag="h6">Rs. {item.price}</CardSubtitle>
                                                            <CardText>{item.category}</CardText>
                                                            <img src={item.img} style={{ 'height': '50px', 'width': '50px' }}></img><br />
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


                                        }</>)
                            })}

                        </div>


                        {this.state.notFound && <div style={{ width: "100%" }}><Alert className="text-center">No products found. </Alert></div>}
                    </div>
                    }
                </Container>
            </div>
        )
    }
} const qtyBox = { display: "flex", justifyContent: "space-evenly", border: "1px solid #aaa", borderRadius: "5px", paddingTop: "5px", paddingBottom: "5px", marginBottom: "5px" };
const qtyBtn = { paddingLeft: "5px", paddingRight: "5px", borderRadius: "5px", marginBottom: "0px" };

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    searchList: state.item.searcedItems
})

export default connect(mapStateToProps, { getItems, addToCart, updateCart })(Home);