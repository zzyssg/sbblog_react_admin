import { Select } from 'antd';
import React from 'react';

const { Option } = Select;

const Search = (props : any) => {
    function onChange(value : any) {
        console.log(`selected ${value}`);
    }

    function onBlur() {
        console.log('blur');
    }

    function onFocus() {
        console.log('focus');
    }

    function onSearch(val : any) {
        console.log('search:', val);
    }

    return (
        <div>

            <Select
                // showSearch
                placeholder="选择分类"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option value="java">Java</Option>
                <Option value="c">C</Option>
                <Option value="c++">C++</Option>
                <Option value="python">Python</Option>
            </Select>
        </div>
    );
}
export default Search;