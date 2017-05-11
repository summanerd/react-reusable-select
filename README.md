React-Reusable-Select
============

A lightweight, configurable, and modular (UMD) select component built with react.

more details coming soon...

## Simple start


```javascript
import React from 'react';
import {SingleSelect, MultiSelect} from 'react-reusable-select';

export function FrequencySelect (props){

    return (
        <SingleSelect selectedValues={[props.frequency]}
                      onChange={(selectedValues)=> props.onChange(selectedValues[0])}
                      options={[
                        {label: 'Select Frequency', value: 0},
                        {label: 'Monthly', value: 1},
                        {label: 'Every Other Month', value: 2},
                        {label: 'Quarterly', value: 3},
                        {label: 'Semi-Annual', value: 6},
                        {label: 'Annual', value: 12}
                      ]}
        />
    );
}

export function MortgageSelect (props){

    return (
        <MultiSelect selectedValues={[15, 30]}
                      onChange={(selectedValues)=> props.onChange(selectedValues)}
                      options={[
                        {label: '10 year', value: 10},
                        {label: '15 year', value: 15},
                        {label: '20 year', value: 20},
                        {label: '30 year', value: 30}
                      ]}
        />
    );
}
```