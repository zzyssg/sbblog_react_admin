import React from 'react';
import { Form, Input, Button, Checkbox, Card, Row, Col, Table, Space } from 'antd';
import Search from './components/search';
import { red, BackgroundColor } from 'chalk';
// const layout = {
//     labelCol: {
//         span: 4,
//     },
//     wrapperCol: {
//         span: 8,
//     },
// };
// const tailLayout = {
//     wrapperCol: {
//         // offset: 4,
//         span: 8,
//     },
// };
const formItem = {
    margin: 0
}
const columns = [
    {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
    },
    {
        title: '博客标题',
        dataIndex: 'title',
        key: 'title',
        render: (text: any) => <a>{text}</a>
    },
    {
        title: '博客类型',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: '推荐',
        dataIndex: 'recommned',
        key: 'recommend',
    },
    {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime'
    },
    {
        title: '操作',
        key: 'action',
        render: (text: any, record: any) => (
            <Space>
                <a>编辑{record.title}</a>
                <a>删除</a>
            </Space>

        )


    }
]
const dataSource = [
    {
        key: "1",
        index: 1,
        title: '博客1',
        type: "type1",
        recommned: "是",
        updateTime: "2020-02-20",
    },
    {
        key: "2",
        index: 2,
        title: '博客2',
        type: "type2",
        recommned: "是",
        updateTime: "2020-02-20",
    },
    {
        key: "3",
        index: 3,
        title: '博客2',
        type: "type2",
        recommned: "是",
        updateTime: "2020-02-20",
    },
    {
        key: "4",
        index: 4,
        title: '博客2',
        type: "type2",
        recommned: "是",
        updateTime: "2020-02-20",
    },
    {
        key: "5",
        index: 5,
        title: '博客2',
        type: "type2",
        recommned: "是",
        updateTime: "2020-02-20",
    },
    {
        key: "6",
        index: 6,
        title: '博客2',
        type: "type2",
        recommned: "是",
        updateTime: "2020-02-20",
    },
    {
        key: "7",
        index: 7,
        title: '博客2',
        type: "type2",
        recommned: "是",
        updateTime: "2020-02-20",
    },
    {
        key: "8",
        index: 8,
        title: '博客2',
        type: "type2",
        recommned: "是",
        updateTime: "2020-02-20",
    },
    {
        key: "9",
        index: 9,
        title: '博客2',
        type: "type2",
        recommned: "是",
        updateTime: "2020-02-20",
    },
    {
        key: "10",
        index: 10,
        title: '博客2',
        type: "type2",
        recommned: "是",
        updateTime: "2020-02-20",
    },
    {
        key: "11",
        index: 11,
        title: '博客2',
        type: "type2",
        recommned: "是",
        updateTime: "2020-02-20",
    },
    {
        key: "12",
        index: 12,
        title: '博客2',
        type: "type2",
        recommned: "是",
        updateTime: "2020-02-20",
    },


]


const BlogList = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Card 
                hoverable = {true}
            >
                <Card
                    title="博客查询"
                    style={{ padding: 0 }}
                    hoverable={true}

                >
                    <Form
                        // {...layout}
                        name="basic"
                        initialValues={{
                            recommend: false,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Row justify="space-between">
                            <Col span={7}>
                                <Form.Item
                                    style={formItem}
                                    label="标题"
                                    name="title"
                                >
                                    <Input placeholder="请输入标题内容" />
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item
                                    style={formItem}
                                    label="分类"
                                    name="types"
                                >
                                    <Search style={{ width: 600 }} />
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item
                                    style={formItem}
                                    // {...tailLayout} 
                                    name="recommend" valuePropName="checked">
                                    <Checkbox>推荐</Checkbox>
                                </Form.Item>
                            </Col>

                            <Col span={4}>
                                <Form.Item
                                    style={formItem}
                                // {...tailLayout}
                                >
                                    <Button type="primary" htmlType="submit" shape="round">
                                        Submit
                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card >
                <Card                 
                    hoverable = {true}
                >
                    <Table
                        bordered={true}
                        columns={columns || []}
                        dataSource={dataSource || []}
                    />
                </Card>
            </Card>

        </div>
    );
};

export default BlogList;