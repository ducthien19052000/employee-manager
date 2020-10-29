import {ActionType}  from '../actions/index.js'

const list ={
    lists: []
}

const employeeReducer=(state = list,action)=>{
    switch (action.type) {
        case ActionType.GET_DATA:{
            return {...state}
        }
      
        case  ActionType.GET_DATA_SUCCESS: {
        
            return {...state, lists: action.payload.map((el, index) => ({...el, key: index}))}
          }
        case ActionType.GET_DATA_ERROR:{
            return {...state}
        }
        case ActionType.DELETE_DATA:{
            return {...state}
        }
      
        case  ActionType.DELETE_DATA_SUCCESS: {
        
            return {...state, lists: state.lists.filter(item=>item.id!==action.payload.id)}
          }
        case ActionType.DELETE_DATA_ERROR:{
            return {...state}
        }
        case ActionType.ADD_DATA:{
            return {...state}
        }
        case ActionType.ADD_DATA_SUCCESS:{
            const newList = [...state.lists];
           
            newList.push(action.payload);
            
            return {...state, lists: newList}
        }
        case ActionType.ADD_DATA_ERROR:{
            return {...state}
        }
        case ActionType.EDIT_DATA:{
            return {...state}
        }
        case ActionType.EDIT_DATA_SUCCESS:{
            return {...state,lists: state.lists.map((item,index)=>{
                if(item.id === action.payload.id){
                    return {...action.payload,key: index}
                }
                return item;
            })}
        }
        case ActionType.EDIT_DATA_ERROR:{
            return {...state}
        }
        case ActionType.SEARCH_DATA:{
            console.log(action.payload)
            // return {...state,lists: state.lists.filter((item,index)=>item.id === action.payload)}
            return state
        }
        default:
      return state;
    }

}
export default  employeeReducer;