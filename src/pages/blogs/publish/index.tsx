import React from 'react';
import { Form, Input, Button, Card, Select, Col, Row } from 'antd';
import MyRichText from '@/utils/richText';
import MyCheckbox from './components/myCheckbox';

// const layout = {
//     labelCol: {
//         span: 8,
//     },
//     wrapperCol: {
//         span: 16,
//     },
// };
// const tailLayout = {
//     wrapperCol: {
//         offset: 8,
//         span: 16,
//     },
// };


const { Option } = Select;

const Publish = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Card
            bordered = {false}
            style={{ padding: 0 }}
            hoverable={true}
        >
            <Form
                // {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Card
                    style={{ padding: 0, margin: 0 }}
                    hoverable={true}
                >
                    <Form.Item
                        style={{ padding: 0, margin: 0 }}
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input.Group compact

                        >
                            <Select
                                style={{ fontWeight: "bolder" }} defaultValue="1">
                                <Option value="0">原创</Option>
                                <Option value="1">转载</Option>
                            </Select>
                            <Input
                                placeholder="文章标题"
                                style={{ width: '50%' }} />
                        </Input.Group>
                    </Form.Item>
                </Card>

                {/* 富文本编辑器 */}
                <Card
                    hoverable={true}
                >
                    <Form.Item
                        name="richText"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        {/* <Input.Password /> */}
                        <MyRichText />
                    </Form.Item>
                </Card>

                <Card
                    hoverable={true}
                >
                    <Form.Item
                        style={{ margin: 0 }}
                    // {...tailLayout} 
                    >
                        <Row justify="space-between">
                            <Col span={10}>
                                <Card
                                    bordered={false}
                                    hoverable={true}
                                >
                                    <Input.Group compact
                                    >
                                        <Button type="primary">分类</Button>
                                        <Select defaultValue="2" style={{ width: "70%" }}>
                                            <Option value="0">原创</Option>
                                            <Option value="1">转载</Option>
                                            <Option value="2">翻译</Option>
                                        </Select>
                                    </Input.Group>
                                </Card>
                            </Col>
                            <Col span={10}>
                                <Card
                                    bordered={false}
                                    hoverable={true}
                                >
                                    <Input.Group compact
                                    >
                                        <Button type="danger">标签</Button>
                                        <Select defaultValue="2" style={{ width: "70%" }}>
                                            <Option value="0">java</Option>
                                            <Option value="1">c</Option>
                                            <Option value="2">Python</Option>
                                        </Select>
                                    </Input.Group>
                                </Card>
                            </Col>
                        </Row>
                    </Form.Item>
                </Card>
                <Card
                    hoverable={true}
                >
                    <Form.Item
                        style={{ margin: 0 }}
                    // {...tailLayout}
                    >
                        <Input.Group compact>
                            <Button type="primary" htmlType="submit">
                                首图
                            </Button>
                            <Input placeholder="首图地址" style={{ width: "50%" }} />
                        </Input.Group>
                    </Form.Item>
                </Card>
                <Card hoverable={true}>
                    <MyCheckbox />
                </Card>
                <Card hoverable={true}>
                    <Row>
                        <Col span={6}></Col>
                        <Col span={6}></Col>
                        <Col span={6}></Col>
                        <Col span={6}>
                            <Row justify="space-between">
                                <Col span={7}>
                                    <Button type="danger">返回</Button>
                                </Col>
                                <Col span={7}>
                                    <Button>保存</Button>
                                </Col>
                                <Col span={7}>
                                    <Button type="primary">发布</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </Form>
        </Card>
    );
};

export default Publish;