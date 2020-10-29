import {ActionType, addDataSuccess, deleteDataSuccess, editDataSuccess} from '../actions/index'
import {fork, put, take, takeLatest} from 'redux-saga/effects'
import { getDataSuccess} from '../actions/index'


function* fetchListEmployee(){
    while(true){
      yield take(ActionType.GET_DATA)
        const requestGet = yield fetch(`https://5f7be4e000bd740016909f7b.mockapi.io/api/employee`,{
            method: 'GET',
            headers: new Headers({
                'Content-Type' : 'application/json',
                'Accept': '*/*'
            })
                
        })
        const resp = yield requestGet.json();
            yield put(getDataSuccess(resp));

    }
   
}

function* deleteEmployee({payload}){

    const resp = yield fetch(`https://5f7be4e000bd740016909f7b.mockapi.io/api/employee/${payload}`,{
        method: 'DELETE',
        headers: new Headers({
            'Content-Type' : 'application/json',
            'Accept': '*/*'
        })})
        const response =  yield resp.json();
        yield put(deleteDataSuccess(response))
}

function* addEmployee({payload}){
    console.log(payload)
    
    const resp = yield fetch(`https://5f7be4e000bd740016909f7b.mockapi.io/api/employee`,{
        method: 'POST',
        headers: new Headers({
            'Content-Type' : 'application/json',
            'Accept': '*/*'
        }),
        body: JSON.stringify(payload)
    })
    const response = yield resp.json();
    console.log(response)
    yield put(addDataSuccess(response))
}

function* editEmployee({payload}){
    const resp = yield fetch(`https://5f7be4e000bd740016909f7b.mockapi.io/api/employee/${payload.id}`,{
        method: 'PUT',
        headers: new Headers({
            'Content-Type' : 'application/json',
            'Accept': '*/*'
        }),
        body: JSON.stringify(payload.list)
    })
    const response = yield resp.json();
    yield put(editDataSuccess(response))
}

function* rootSaga (){
    yield fork(fetchListEmployee);
    yield takeLatest(ActionType.DELETE_DATA, deleteEmployee)
    yield takeLatest(ActionType.ADD_DATA ,addEmployee)
    yield takeLatest(ActionType.EDIT_DATA, editEmployee)

}
export default rootSaga;