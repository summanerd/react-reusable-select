import React from 'react';
import * as selectHelper from './select-helper';

const noop = function(){};


export default function getSelectComponent(options = {}){
    
    const {
        onSelectOption = selectHelper.onSelectOption,
        onToggleOpen = selectHelper.onToggleOpen,
        onToggleClose = selectHelper.onToggleClose,
        getSelectedOptions = selectHelper.getSelectedOptions,
        getDefaultClasses = selectHelper.getDefaultClasses,
        SelectOption = selectHelper.SelectOption,
        SelectLabel = selectHelper.SelectLabel
        
    } = options;
    
    
    class Select extends React.Component {

        static defaultProps = {
            defaultLabel: 'All Items',
            pluralLabel: 'Items',
            selectedValues: [],
            options: [],
            onChange: noop
        };

        constructor(props){
            super(props);

            this.state = {
                isOpen: false,
                selected: getSelectedOptions(props.options, props.selectedValues)
            };
            
            this.classes = getDefaultClasses();
        }

        render(){
            const {options} = this.props;
            const {toggleClasses, labelClasses, optionClasses} = this.classes;
            let selectClasses = this.classes.selectClasses.slice();
            let optionsClasses = this.classes.optionsClasses.slice();

            if (this.state.isOpen) {
                selectClasses.push('select--is-open');
                optionsClasses.push('select__options--is-open');
            }

            return(
                <div className={selectClasses.join(' ')} data-state={this.state.isOpen ? 'open' : 'closed'} data-component="select">
                    <button className={toggleClasses.join(' ')} data-action="toggle" onClick={this.toggleDropDown}>
                        <SelectLabel label={this.label} classes={labelClasses} />
                    </button>
                    <ul className={optionsClasses.join(' ')} data-region="select-options">
                        {
                            options.map((option, index)=>{
                                return <SelectOption key={`select-${index}`}
                                                     option={option}
                                                     selectedValues={this.selectedValues}
                                                     onSelect={this.onSelectOption} 
                                                     classes={optionClasses}
                                        />
                            })
                        }
                    </ul>
                </div>
            );
        }

        sendChangeNotification(){
            this.props.onChange(this.selectedValues);
        }

        get label(){
            if (!this.state.selected.length) {
                return this.props.defaultLabel;
            }

            if (this.state.selected.length === 1) {
                return this.state.selected[0].label;
            }

            return `${this.state.selected.length} ${this.props.pluralLabel}`;
        }

        get selectedValues(){
            return this.state.selected.map(option=> option.value);
        }

        onSelectOption = onSelectOption.bind(this);
        onToggleOpen = onToggleOpen.bind(this);
        onToggleClose = onToggleClose.bind(this);

        toggleDropDown = function selectToggleDropDown() {
            const isOpen = !this.state.isOpen;
            this.setState({isOpen});
            this[isOpen ? 'onToggleOpen' : 'onToggleClose']();
        }.bind(this);
    }

    return Select;
}