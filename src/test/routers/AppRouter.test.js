import React from 'react'
import { mount } from 'enzyme'
import { AppRouter } from '../../routers/AppRouter'
import { AuthContext } from '../../auth/AuthContext'

describe('Pruebas en < AppRouter />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }

    test('should render login if it is not authenticated', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter/>
            </AuthContext.Provider>
            );

        expect(wrapper).toMatchSnapshot();
    });
   
})
