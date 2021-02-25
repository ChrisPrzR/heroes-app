import React from 'react'
import {mount} from 'enzyme'
import '@testing-library/jest-dom'
import { AuthContext } from '../../../auth/AuthContext'
import { Navbar } from '../../../components/ui/Navbar'
import { Router } from 'react-router-dom'
import { types } from '../../../types/types'


describe('Pruebas en <Navbar/>', () => {
    
    const historyMock = {
        push: jest.fn(),
        replace: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn()
    }

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Chris'
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <Router history={historyMock}>
                <Navbar/>            
            </Router>
        </AuthContext.Provider>
        );

        afterEach(() => {
            jest.clearAllMocks();
        })

    test('should render correctly', () => {
        
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim() ).toBe('Chris')

    });

    test('should call logout and use history', () => {
        
        wrapper.find('button').prop('onClick')();

        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.logout
        });
        expect( historyMock.replace).toHaveBeenCalledWith('/login')
    })
    
    
})
