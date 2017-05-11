import React from 'react';
import {shallow, mount, render} from 'enzyme';
import getMultiSelect from '../../src/component/multi-select/multi.select';

const MultiSelect = getMultiSelect();

describe('Multi Select', function () {
    
    beforeEach(function () {
        this.container = document.createElement('div');
        this.container.setAttribute('data-region', 'main');
        document.body.appendChild(this.container);
    });
    
    afterEach(function () {
        document.body.removeChild(this.container);
    });
    
    describe('when no options or configuration are provided', function () {

        beforeEach(function () {

            this.SUT = mount(
                <MultiSelect />
                , {attachTo: this.container}
            );

        });

        afterEach(function () {
            this.SUT.unmount();
        });
        
        it('should display default label \'All Items\'', function(){
            expect(this.SUT.find('SelectLabel').text()).toEqual('All Items');
        });

        it('should not have any options in list', function(){
            expect(this.SUT.find('SelectOption').length).toBe(0);
        });
        
    });

    describe('when options are provided', function () {

        beforeEach(function () {

            this.onChangeSpy = jasmine.createSpy('onChange');
            this.SUT = mount(
                <MultiSelect options={[
                                {label: 'Label 1', value: 'value1'},
                                {label: 'Label 2', value: 'value2'},
                                {label: 'Label 3', value: 'value3'}
                            ]}
                              onChange={this.onChangeSpy}

                />
                , {attachTo: this.container}
            );
            this.select = this.container.querySelector('[data-component="select"]');

        });

        afterEach(function () {
            this.SUT.unmount();
        });

        it('should display default label \'All Items\' since nothings selected', function(){
            expect(this.SUT.find('SelectLabel').text()).toEqual('All Items');
        });

        it('should have options available in list', function(){
            expect(this.SUT.find('SelectOption').length).toBe(3);
        });

        it('should not show options', function(){
            expect(this.select.getAttribute('data-state')).toEqual('closed');
        });

        describe('when toggle is clicked', function(){
            beforeEach(function () {
                this.SUT.find('[data-action="toggle"]').simulate('click');

            });

            it('should show options', function(){
                expect(this.select.getAttribute('data-state')).toEqual('open');
            });

            describe('when an option is clicked', function(){
                beforeEach(function () {
                    this.SUT.find('[data-select-value="value1"]').simulate('click');

                });

                it('should not close options', function(){
                    expect(this.select.getAttribute('data-state')).toEqual('open');
                });

                it('should display selected option as label', function(){
                    expect(this.SUT.find('SelectLabel').text()).toEqual('Label 1');
                });

                it('should not invoke onchange handler with selected value', function(){
                    expect(this.onChangeSpy).not.toHaveBeenCalled();
                });

                describe('when another option is clicked', function(){
                    beforeEach(function () {
                        this.SUT.find('[data-select-value="value3"]').first().simulate('click');

                    });

                    it('should not close options', function(){
                        expect(this.select.getAttribute('data-state')).toEqual('open');
                    });

                    it('should update the label to display \'2 Items\'', function(){
                        expect(this.SUT.find('SelectLabel').text()).toEqual('2 Items');
                    });

                    it('should not invoke onchange handler with selected value', function(){
                        expect(this.onChangeSpy).not.toHaveBeenCalled();
                    });

                    describe('when a selected option is clicked', function(){
                        beforeEach(function () {
                            this.SUT.find('[data-select-value="value3"]').simulate('click');

                        });

                        it('should not close options', function(){
                            expect(this.select.getAttribute('data-state')).toEqual('open');
                        });

                        it('should update the label to display selected items', function(){
                            expect(this.SUT.find('SelectLabel').text()).toEqual('Label 1');
                        });

                        it('should remove active indicator', function(){
                            expect(this.SUT.find('[data-select-value="value3"]').hasClass('select__option--is-active')).toBe(false);
                        });

                        it('should not invoke onchange handler with selected value', function(){
                            expect(this.onChangeSpy).not.toHaveBeenCalled();
                        });
                    });

                    describe('when user clicks outside of the select component', function(){
                        beforeEach(function () {
                            document.body.click();
                        });

                        it('should close options', function(){
                            expect(this.select.getAttribute('data-state')).toEqual('closed');
                        });

                        it('should display selection in label', function(){
                            expect(this.SUT.find('SelectLabel').text()).toEqual('2 Items');
                        });

                        it('should invoke onchange handler with selected value', function(){
                            expect(this.onChangeSpy).toHaveBeenCalledWith(['value1', 'value3']);
                        });
                    });
                });
            });
        });

    });
});
