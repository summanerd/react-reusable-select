import React from 'react';
import {getCleanProps} from '../select-helper';
import getSelectComponent from '../select.jsx';

export default function getSingleSelect() {

    const Select = getSelectComponent();
    
    return function MultiSelect(props) {
        const _props = getCleanProps(props);
        
        return (
            <Select {..._props} />
        );
    };
} 