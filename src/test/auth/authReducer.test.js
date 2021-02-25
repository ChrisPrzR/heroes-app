import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types"


describe('Pruebas en authReducer', () => {

    test('should return default state', () => {
        const state = authReducer({logged: false}, {})

        expect(state).toEqual({
            logged: false
        })
    });

    

    test('should authenticate and display user name', () => {
        const action = {
            type : types.login,
            payload: {
                name: 'Chris'
            }
        }

        const state = authReducer({logged:false}, action)
        expect(state).toEqual({logged: true, name: 'Chris'})
    })

    test('should delete username and logged on false', () => {
        const state = authReducer({}, {
            type : types.logout,
        })
        expect(state.logged).toBe(false)
    })
    
    
    
})
