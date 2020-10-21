import React, { useState, useEffect } from 'react';
import { connect, Dispatch, history, SelectLang } from 'umi';
import { BlogsState } from '@/models/blogs';
import { Form, Input, Button, Checkbox, Card, Row, Col, Table, Space, Modal, Select, message } from 'antd';
import Search from './components/search';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import styles from './index.less';
import {Link} from 'react-router-dom';
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

const { confirm } = Modal;



const BlogList = (props: any) => {
    const { Option } = Select;

    const { dispatch } = props;
    const [dataSource, setDataSource] = useState<Object>([]);

    const [blogId, setBlogId] = useState();

    // 删除博客对话框——控制modal显示和确认键的loading
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteModalConformLoading, setDeleteModalConformLoading] = useState(false);

    useEffect(() => {
        if (dispatch) {
            dispatch({
                type: 'blogs/fetch',
            })
                .then(
                    (res: any) => {
                        //  debugger
                        console.log(res);

                        setDataSource(res.result || []);
                    }
                )
        }

    }, [])


    // 跳至编辑和修改页面
    const linkToEdit = (record: any) => {
        // DOTO 携带数据跳转页面
        // history.push('/blogs/publish');


    }

    // 点击确定后显示 是否确认删除对话框
    const showDeleteModal = (record : any) => {
        console.log(record.id);
        setBlogId(record.id)
        setDeleteModalVisible(true);

    }

    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text: any, record: any, index: number) => `${index + 1}`,
        },
        {
            title: '博客标题',
            dataIndex: 'title',
            key: 'title',
            render: (text: any,record : any) => <Link to={{pathname : '/blogs/publish',blog : record}}>{text}</Link>
        },
        {
            title: '博客类型',
            dataIndex: 'type',
            key: 'type',
            render: (text: any) => {
                // debugger
                return text.name;
            }
        },
        {
            title: '推荐',
            dataIndex: 'recommend',
            key: 'recommend',
            render: (text: any) => {
                return text ? "是" : "否";
            }
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
            render: (text: any) => {
                const newDate = new Date(text);
                return newDate.toLocaleString('chinese', { hour12: false });
            }
        },
        {
            title: '操作',
            key: 'action',
            render: (text: any, record: any) => {
                // debugger
                return (
                    <Space>
                        {/* <a onClick={() => {linkToEdit(record)}}>编辑</a> */}
                        <Link to={{pathname : '/blogs/publish',blog : record}}>编辑</Link>
                        {/* <Link to="/blogs/publish?blog=${record}">编辑</Link> */}
                        <a style={{ color: "red" }} onClick={()=>{showDeleteModal(record)}}>删除</a>
                    </Space>

                )
            }


        }
    ]

    const onFinish = (values: any) => {
        if (dispatch) {
            dispatch({
                type: 'blogs/queryBlogVOsByCondition',
                payload: values
            }).then(
                (res: any) => {
                    setDataSource(res.result || [])
                }
            )
        }



    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const deleteBlogCancle = () => {
        setDeleteModalVisible(false);
    }
    const deleteBlogOk = () => {
        setDeleteModalVisible(true);
        setDeleteModalConformLoading(true);
        setTimeout(
            () => {
                setDeleteModalVisible(false);
                setDeleteModalConformLoading(false);
            }, 500
        );
        if (dispatch) {
            dispatch(
                {
                    type: "blogs/deleteBlogById",
                    payload: {blogId}
                    
                }
            )
                .then(
                    (res: any) => {
                        if (res.retCode === "001") {
                            // 提示框：删除成功
                            message.success("删除成功!!!");

                            // TODO 重新刷新表格数据
                            if (dispatch) {
                                dispatch({
                                    type: 'blogs/fetch',
                                })
                                    .then(
                                        (result: any) => {
                                            //  debugger
                                            console.log(result);
                    
                                            setDataSource(result.result || []);
                                        }
                                    )
                            }
                        } else {
                            message.error("删除失败！！！");
                        }
                    }
                )

        }
    }

    return (
        <div style={{ margin: 0 }}>
            <Modal
                title="删除对话框"
                visible={deleteModalVisible}
                confirmLoading={deleteModalConformLoading}
                onOk={deleteBlogOk}
                onCancel={deleteBlogCancle}
            >
                <p>正在进行删除博客的相关操作...</p>
            </Modal>
            <Card
                hoverable={false}
            >
                <Card
                    title="博客查询"
                    style={{ padding: 0 }}
                    hoverable={false}
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
                                    name="typeId"
                                >
                                    {/* <Search style={{ width: 600 }} /> */}

                                    <Select
                                        allowClear
                                        placeholder="选择分类"
                                    >
                                        <Option value="1">日常</Option>
                                        <Option value="2">历史</Option>
                                        <Option value="3">哲学</Option>
                                        <Option value="4">冷知识</Option>
                                        <Option value="5">科学</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item
                                    style={formItem}
                                    // {...tailLayout} 
                                    name="recommend"
                                    valuePropName="checked"
                                >
                                    {/* <Checkbox >推荐</Checkbox> */}
                                    <Select
                                        allowClear
                                        placeholder="是否推荐"
                                    >
                                        <Option value="true">推荐</Option>
                                        <Option value="false">不推荐</Option>
                                    </Select>
                                </Form.Item>

                            </Col>

                            <Col span={4}>
                                <Form.Item
                                    style={formItem}
                                // {...tailLayout}
                                >
                                    <Button type="primary" htmlType="submit" shape="round">
                                        查询
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card >
                <Card
                    hoverable={false}
                >
                    <Table
                        bordered
                        columns={columns}
                        dataSource={dataSource}
                    />
                </Card>
            </Card>

        </div>
    );
};

export default connect(({ blogs }: BlogsState) => ({
    blogs,
}))(BlogList);
// export default  BlogList;