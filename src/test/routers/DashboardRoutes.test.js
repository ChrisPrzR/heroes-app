import React from 'react'
import { mount } from 'enzyme'
import { AuthContext } from '../../auth/AuthContext'

import { MemoryRouter } from 'react-router-dom';

import { DashboardRoutes } from "../../routers/DashboardRoutes";


describe('Pruebas en <DashboardRoutes/>', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Chris'
        }
    }
    
    test('should render correctly', () => {
        const wrapper = mount( 
            <MemoryRouter>
                <AuthContext.Provider value={contextValue}>
                    <DashboardRoutes />
                </AuthContext.Provider> 
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim()).toBe('Chris')
    })
    
})
