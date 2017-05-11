import React from 'react';

export {
    SelectLabel,
    SelectOption,
    onSelectOption,
    onToggleOpen,
    onToggleClose,
    getSelectedOptions,
    getDefaultClasses,
    getCleanProps
};

const validProps = ['defaultLabel', 'pluralLabel', 'options', 'selectedValues', 'onChange'];

function SelectOption({option, selectedValues, onSelect, classes = []}) {
    const isSelected = selectedValues.indexOf(option.value) > -1;

    if (isSelected) {
        classes = [].concat(classes, ['select__option--is-active']);
    }

    return (
        <li className={classes.join(' ')} 
            data-select-value={option.value} 
            data-action="select" 
            onClick={()=> onSelect(option)}
        >
            <a className="select__option-label" href="#" onClick={ev=> ev.preventDefault()}>
                {option.label}
            </a>
        </li>
    );

}

function SelectLabel({label, classes = []}) {

    return (
        <div className={classes.join(' ')} data-region="select-label">
            {label}
        </div>
    );

}

function onSelectOption(option) {

    this.setState({selected: [option]}, this.toggleDropDown);

}

function onToggleOpen() {

    const listener = onClickOutsideOfSelect.bind(this);
    document.addEventListener('click', listener);
    this.removeBodyClickListener = ()=> document.removeEventListener('click', listener);

}

function onToggleClose() {

    if (this.removeBodyClickListener) {
        this.removeBodyClickListener();
        delete this.removeBodyClickListener;
    }
    
    this.sendChangeNotification();

}

function onClickOutsideOfSelect(event) {

    if (!this.selectNode){
        return;
    }
    if (this.selectNode.contains(event.target)) {
        return;
    }
    delete this.removeBodyClickListener;
    this.toggleDropDown();
}

function getSelectedOptions(options, selectedValues) {

    let i = 0;

    while (i < options.length) {
        const option = options[i++];
        if (selectedValues.indexOf(option.value) > -1){
            return [option];
        }
    }

    return [];
}

function getDefaultClasses() {

    return {
        selectClasses: ['select'],
        toggleClasses: ['select__toggle'],
        labelClasses: ['select__label'],
        optionsClasses: ['select__options'],
        optionClasses: ['select__option']
    }
}

function getCleanProps(props) {

    let _props = {};

    validProps.forEach(prop=>{
        if(props[prop]){
            _props[prop] = props[prop];
        }
    });

    return _props;
}