import {queryAllTypes, addType, deleteTypeByTypeId} from '@/services/types';

const types = {
    namespace : 'types',
    state : {
        TypesState : '',
    },
    effects : {
        *queryAllTypes({ payload } : any, { call } : any) {
            const response = yield call(queryAllTypes, payload);
            return response;
        },
        *addType({ payload } : any, { call } : any) {
            const response = yield call(addType, payload);
            return response;
        },
        *deleteTypeByTypeId({ payload } : any, { call } : any) {
            debugger
            const response = yield call(deleteTypeByTypeId, payload);
            return response;
        },


    }

}

export default types;