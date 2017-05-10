import Select from './src/component/select.jsx';
import getSingleSelect from './src/component/single-select/single.select';
import getMultiSelect from './src/component/multi-select/multi.select';

const SingleSelect = getSingleSelect(),
    MultiSelect = getMultiSelect();


export {
    Select,
    SingleSelect,
    MultiSelect
};