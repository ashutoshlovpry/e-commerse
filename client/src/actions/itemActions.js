import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, ITEMS_LOADING ,SEARCHITEMS} from './types';
import { returnErrors } from './errorActions';

export const getItems = (category) => dispatch => {
    dispatch(setItemsLoading());
    axios.post('/api/items',{category})
        .then(res =>{ dispatch({
            type: GET_ITEMS,
            payload: res.data
        })
        console.log({res});
    })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const addItem = (item) => (dispatch) => {
    console.log({item});
    axios.post('/api/items', item)
        .then(res =>{ dispatch({
            type: ADD_ITEM,
            payload: res.data
        })
        console.log({res})
    })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const deleteItem = (id) => (dispatch) => {
    axios.delete(`/api/items/${id}`)
        .then(res => dispatch({
            type: DELETE_ITEM,
            payload: id
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const updateItem = (id, item) => (dispatch) => {
    axios.put(`/api/items/${id}`, item)
        .then(res => dispatch({
            type: UPDATE_ITEM,
            payload: Promise.all([id, res.data])
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const setItemsLoading = () => {
    return{
        type: ITEMS_LOADING
    }
}

export const searchItem = ( item) => (dispatch) => {
    axios.post(`/api/search`, {key:item})
        .then(res => dispatch({
            type: SEARCHITEMS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}