import React from 'react'
import { mount } from 'enzyme'
import { PrivateRoute } from '../../routers/PrivateRoute';
import { MemoryRouter } from 'react-router-dom';

describe('Pruebas en <PrivateRoute />', () => {
    
    const props = {
        location: {
            pathname: '/marvel'
        }
    }

    Storage.prototype.setItem = jest.fn()

    test('should render component if Authenticated and save to localStorage', () => {
        const wrapper = mount( 
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated={ true }
                    component={ () => <p>Objeto</p> }
                    {...props}
                />
            </MemoryRouter>
        );

        expect( wrapper.find('p').exists()).toBe(true);
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel')
    });

    test('should block component if it is not authenticated', () => {
        const wrapper = mount( 
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated={ false }
                    component={ () => <p>Objeto</p> }
                    {...props}
                />
            </MemoryRouter>
        );
        expect( wrapper.find('p').exists()).toBe(false);
    })
    
});
