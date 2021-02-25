import React from 'react';
import { mount } from 'enzyme'
import { HeroScreen } from '../../../components/heroes/HeroScreen';
import { MemoryRouter, Route } from 'react-router-dom';


describe('Testing <HeroScreen/>', () => {
    
    const history = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()
    }

    
    test('should render redirect component if not arguments in URL exist', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={history} />
            </MemoryRouter>
        );
        expect(wrapper).toMatchSnapshot()
    })

    test('should render a hero if param exists and valid', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-thor']}>
                <Route path="/hero/:heroeId" component={HeroScreen}/>                    
            </MemoryRouter>
        );

        expect(wrapper.find('.row').exists()).toBe(true)
    })
    
    test('should return to previous screen PUSH', () => {
        
        const history = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-thor']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={(props) => <HeroScreen history={history} />}
                />                    
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect(history.push).toHaveBeenCalledWith('/')
        expect(history.goBack).not.toHaveBeenCalled()
    })

    test('should return to previous screen GOBACK', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-thor']}>
                <Route
                    path="/hero/:heroeId"
                    component={() => <HeroScreen history={history}/>}
                />
            </MemoryRouter>

        );

        wrapper.find('button').simulate('click');
        
        expect(history.push).not.toHaveBeenCalled()
        expect(history.goBack).toHaveBeenCalled()
    })
    
    
    
})
