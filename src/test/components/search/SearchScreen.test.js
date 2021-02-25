import React from 'react'
import {mount} from 'enzyme'
import { MemoryRouter, Route } from 'react-router-dom';
import { SearchScreen } from '../../../components/search/SearchScreen';

describe('Pruebas en <SearchScreen/>', () => {
    
    test('should render correctly with default values', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route path="/search" component={SearchScreen}/>
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('should render Batman and input should === queryString', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path="/search" component={SearchScreen}/>
            </MemoryRouter>
        );

        expect(wrapper.find('input').prop('value')).toBe('batman')
    })

    test('should show an error if Hero not found', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <Route path="/search" component={SearchScreen}/>
            </MemoryRouter>
        );

        expect(wrapper.find('.alert-danger').text().trim()).toBe(`The hero batman123 does not exist`)
    })
    
    test('should call history.push', () => {
        
        const history = {
            push: jest.fn(),
        }
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route 
                path="/search" 
                component={() => <SearchScreen history={history}/>}/>
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'batman'
            }
        });

        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });

        expect(history.push).toHaveBeenCalledWith(`?q=batman`)

    })
    
    


})
