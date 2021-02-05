import TableAction from './action';

const INITIAL_STATE = {
    rows : [
        {
            id: '1',
            name: 'hkjhdf',
            email: 'shfjhk@gmail.com',
            gender: 'male',
            dob: '2021-02-05',
            country: 'abcd',
            city: 'efgh',
            action: ' ',
        },
        {
            id: '2',
            name: 'hkjhdf',
            email: 'shfjhk@gmail.com',
            gender: 'male',
            dob: '2021-02-05',
            country: 'abcd',
            city: 'efgh',
            action: ' ',
        },
        {
            id: '3',
            name: 'hkjhdf',
            email: 'shfjhk@gmail.com',
            gender: 'male',
            dob: '2021-02-05',
            country: 'abcd',
            city: 'efgh',
            action: ' ',
        }
    ],


}

export default function (state= INITIAL_STATE, action) {
    if (action.error) {
        return state;
    }
    switch(action.type) {
        case TableAction.ADD_ROW:
            return { ...state , rows : [...action.payload]
                }

        default:
            return state
    }
}