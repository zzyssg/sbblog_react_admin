import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Card, message, Form, Input, Button, Row, Col, Modal } from 'antd';
import { connect } from 'umi';
import { connectState } from '@/models/connect';
import types from '@/models/types';
// import {TypesState} from '@/models/types';

const TypeList = (props: any) => {
  const { dispatch } = props;
  const [data, setData] = useState([]);

  const [typeId, setTypeId] = useState();
  // 删除博客对话框——控制modal显示和确认键的loading
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteModalConformLoading, setDeleteModalConformLoading] = useState(false);

  // 点击确定后显示 是否确认删除对话框
  const showDeleteModal = (record: any) => {
    debugger;
    console.log(record.tyId);
    setTypeId(record.typeId);
    setDeleteModalVisible(true);
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: '类型',
      key: 'type',
      dataIndex: 'type',
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          <span>
            <a>编辑 {record.name}</a>
            <a
              style={{ color: 'red' }}
              onClick={() => {
                // onDelete(record);
                showDeleteModal(record);
              }}
            >
              删除
            </a>
          </span>
          <span>
            <Button>取消</Button>
            <Button>确定</Button>
          </span>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'types/queryAllTypes',
        payload: {},
      }).then((res: any) => {
        if (res.retCode === '001') {
          const tempData1 = res.result;
          const tempData2 = tempData1.map((dataElement: any, idx: any) => {
            const tem = {
              key: `${idx + 1}`,
              index: `${idx + 1}`,
              type: dataElement.name,
              typeId: dataElement.id,
            };
            return tem;
          });
          setData(tempData2);
        } else {
          message.error('加载时查询type失败！！！');
        }
      });
    }
  }, []);

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

    // 根据 typeId 调用type的deleteTypeByTypeId
    if (dispatch) {
      dispatch({
        type: 'types/deleteTypeByTypeId',
        payload: {
          typeId,
        },
      }).then((rest: any) => {
        // 若删除成功，则调用queryAllTypes接口，刷新typeList
        if (rest.retCode === '001') {
          dispatch({
            type: 'types/queryAllTypes',
            payload: {},
          }).then((res: any) => {
            if (res.retCode === '001') {
              message.success('查询types success!!!');
              const tempData1 = res.result;
              const tempData2 = tempData1.map((dataElement: any, idx: any) => {
                const tem = {
                  key: `${idx + 1}`,
                  index: `${idx + 1}`,
                  type: dataElement.name,
                  typeId: dataElement.id,
                };
                return tem;
              });
              setData(tempData2);
            } else {
              message.error('加载时查询type失败！！！');
            }
          });
        }
      });
    }
  };

  const onFinish = (name: any) => {
    if (dispatch) {
      dispatch({
        type: 'types/addType',
        payload: name,
      }).then(
        // 刷新页面
        (res: any) => {
          if (res && res.retCode === '001') {
            if (dispatch) {
              dispatch({
                type: 'types/queryAllTypes',
                payload: {},
              }).then((reslt: any) => {
                if (reslt.retCode === '001') {
                  message.success('查询types success!!!');
                  const tempData1 = reslt.result;
                  const tempData2 = tempData1.map((dataElement: any, idx: any) => {
                    const tem = {
                      key: `${idx + 1}`,
                      index: `${idx + 1}`,
                      type: dataElement.name,
                      typeId: dataElement.id,
                    };
                    return tem;
                  });
                  setData(tempData2);
                } else {
                  message.error('加载时查询type失败！！！');
                }
              });
            } else {
              message.error('dispatch is not a function...');
            }
            message.success('添加成功！！！');
          } else {
            message.error(res.retMsg);
          }
        },
      );
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
        <p>删除类型后，此类型下的所有博客也将删除，若继续请点击【确定】</p>
      </Modal>
      <Card>
        <Form name="basic" onFinish={onFinish}>
          <Row>
            <Col>
              <Form.Item colon={false} label={<Button>新增博客类型</Button>} name="name">
                <Input placeholder="请输入类型名称..." />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card>
        <Table dataSource={data} columns={columns} />
      </Card>
    </div>
  );
};

export default connect(({ TypeState }: connectState) => ({
  TypeState,
}))(TypeList);
