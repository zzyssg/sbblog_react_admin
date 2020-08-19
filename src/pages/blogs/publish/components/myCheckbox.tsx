import { Checkbox, Divider } from 'antd';
import React, { useState } from 'react';

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['推荐', '转载声明', '赞赏', "评论"];
const defaultCheckedList = ['推荐', '转载声明', '赞赏'];

const MyCheckbox = () => {
    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);
    // state = {
    //     checkedList: defaultCheckedList,
    //     indeterminate: true,
    //     checkAll: false,
    // };

    const onChange = (checkedList: any) => {
        // this.setState({
        //     checkedList,
        //     indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
        //     checkAll: checkedList.length === plainOptions.length,
        // });
        setCheckedList(checkedList);
        setIndeterminate(!!checkedList.length && checkedList.length < plainOptions.length);
        setCheckAll(checkedList.length === plainOptions.length);
    };

    const onCheckAllChange = (e: any) => {
        // this.setState({
        //     checkedList: e.target.checked ? plainOptions : [],
        //     indeterminate: false,
        //     checkAll: e.target.checked,
        // });
        setCheckedList(e.target.checked ? plainOptions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };


    return (
        <div>
            <CheckboxGroup
                options={plainOptions}
                value={checkedList}
                onChange={onChange}
            />
            <Divider type="vertical" />
            <Divider type="vertical" />
            <Divider type="vertical" />
            <span className="site-checkbox-all-wrapper">
                <Checkbox
                    indeterminate={indeterminate}
                    onChange={onCheckAllChange}
                    checked={checkAll}
                >
                    全选
                </Checkbox>
            </span>
        </div >
    );
}

export default MyCheckbox;