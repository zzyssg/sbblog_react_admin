import { Checkbox, Col, Row } from 'antd';
import React, { useState } from 'react';

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple', 'Pear', 'Orange', "推荐"];
const defaultCheckedList = ['Apple', 'Pear', 'Orange', "推荐"];

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
            <Row justify="space-between">
                <Col span={10}>
                    <CheckboxGroup
                        options={plainOptions}
                        value={checkedList}
                        onChange={onChange}
                    />
                </Col>
                <Col span={10}>
                    <span className="site-checkbox-all-wrapper">
                        <Checkbox
                            indeterminate={indeterminate}
                            onChange={onCheckAllChange}
                            checked={checkAll}
                        >
                            全选
                </Checkbox>
                    </span>

                </Col>
                <Col span={10}>

                </Col>
            </Row>
        </div >
    );
}

export default MyCheckbox;