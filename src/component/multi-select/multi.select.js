import React from 'react';
import {getCleanProps} from '../select-helper';
import getSelectComponent from '../select.jsx';

export default function getMultiSelect() {

    const Select = getSelectComponent({
        onSelectOption(option){
            const isCurrentlySelected = this.selectedValues.indexOf(option.value) > -1,
                selected = isCurrentlySelected
                    ? this.state.selected.filter(_option=> _option.value !== option.value)
                    : this.state.selected.slice().concat([option]);

            this.setState({selected});
        }
    });
    
    return function MultiSelect(props) {
        const _props = getCleanProps(props);
        
        return (
            <Select {..._props} />
        );
    };
} 