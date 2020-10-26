import React, { useState, useEffect } from 'react';
import { Table, Space, Modal, message } from 'antd';
import { Link } from 'react-router-dom';
import { ConnectState } from '@/models/connect';
import {connect} from 'umi';



const BlogList = (props: any) => {
    const { dispatch } = props;

    // const { confirm } = Modal;
    const [blogId, setBlogId] = useState();
    const [dataSource, setDataSource] = useState<Object>([]);

    // 删除博客对话框——控制modal显示和确认键的loading
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteModalConformLoading, setDeleteModalConformLoading] = useState(false);

    useEffect(() => {
        if (dispatch) {
            dispatch({
                type: 'blogs/fetch',
            }).then((res: any) => {
                const indexDataSource = res.result || [];
                setDataSource(indexDataSource);
            });
        }
    }, []);

    // 点击确定后显示 是否确认删除对话框
    const showDeleteModal = (record: any) => {
        setBlogId(record.id);
        setDeleteModalVisible(true);
    };

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
            render: (text: any, record: any) => (
                <Link to={{ pathname: '/blogs/publish', blog: record }}>{text}</Link>
            ),
        },
        {
            title: '博客类型',
            dataIndex: 'type',
            key: 'type',
            render: (text: any) => {
                // debugger
                return text.name;
            },
        },
        {
            title: '推荐',
            dataIndex: 'recommend',
            key: 'recommend',
            render: (text: any) => {
                return text ? '是' : '否';
            },
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
            render: (text: any) => {
                const newDate = new Date(text);
                return newDate.toLocaleString('chinese', { hour12: false });
            },
        },
        {
            title: '操作',
            key: 'action',
            render: (text: any, record: any) => {
                // debugger
                return (
                    <Space>
                        {/* <a onClick={() => {linkToEdit(record)}}>编辑</a> */}
                        <Link to={{ pathname: '/blogs/publish', blog: record }}>编辑</Link>
                        {/* <Link to="/blogs/publish?blog=${record}">编辑</Link> */}
                        <a
                            style={{ color: 'red' }}
                            onClick={() => {
                                showDeleteModal(record);
                            }}
                        >
                            删除
            </a>
                    </Space>
                );
            },
        },
    ];
    const deleteBlogCancle = () => {
        setDeleteModalVisible(false);
    };
    const deleteBlogOk = () => {
        setDeleteModalVisible(true);
        setDeleteModalConformLoading(true);
        setTimeout(() => {
            setDeleteModalVisible(false);
            setDeleteModalConformLoading(false);
        }, 500);
        if (dispatch) {
            dispatch({
                type: 'blogs/deleteBlogById',
                payload: { blogId },
            }).then((res: any) => {
                if (res.retCode === '001') {
                    // 提示框：删除成功
                    message.success('删除成功!!!');
                    // TODO 重新刷新表格数据
                    if (dispatch) {
                        dispatch({
                            type: 'blogs/fetch',
                        }).then((result: any) => {
                            setDataSource(result.result || []);
                        });
                    }
                } else {
                    message.error('删除失败！！！');
                }
            });
        }
    };

    return (
        <div>
            <Modal
                title="删除对话框"
                visible={deleteModalVisible}
                confirmLoading={deleteModalConformLoading}
                onOk={deleteBlogOk}
                onCancel={deleteBlogCancle}
            >
                <p>正在进行删除博客的相关操作...</p>
            </Modal>
            <Table bordered columns={columns} dataSource={dataSource} />
        </div>
    )



}

// export default BlogList;
export default connect(({ blogs }: ConnectState) => ({
    blogs,
  }))(BlogList);