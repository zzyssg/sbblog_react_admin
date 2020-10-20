import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Select, Col, Row, Radio, message } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { connect } from 'umi';
import { BlogsState } from '@/models/blogs';
import styles from './publish.less';

const { Option } = Select;

const Publish = (props: any) => {
  // 编辑器state
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null));

  const { dispatch } = props;

  const blogMsg = props.location.blog;

  // useEffect(() => {
  //     console.log("props");
  //     console.log(props);

  // }, [])

  const submitContent = () => {
    // 编辑器按下保存快捷键时执行，提交到服务端前，使用toHTML
    setEditorState(editorState);
    // const htmlContent = editorState.toHTML();
    // console.log(htmlContent);
  };

  const handleEditorChange = () => {
    setEditorState(editorState);
  };

  const getRequestBody = (values: any) => {
    // 将得到的editState数据转化为htmlContent
    values.content = values.content.toHTML();
    console.log('htmlContent:', values.content);
    // values.sharement = values.sharement === "1" ? "true" : 'false';
    return values;
  };

  const onFinish = (values: any) => {
    const requestBody = getRequestBody(values);

    if (dispatch) {
      dispatch({
        type: 'blogs/addBlog',
        payload: requestBody,
      }).then((res: any) => {
        if (res.retCode === '001') {
          message.success('添加成功！！！');
        } else {
          message.error('添加失败！！！');
        }
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Card bordered={false} style={{ padding: 0 }} hoverable>
      <Form
        // {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Card style={{ padding: 0, margin: 0 }} hoverable>
          <Form.Item
            name="id"
            // 若有id则是从编辑页面跳转而来，初始化为相应的blogId值；否则为-1，即不存在
            initialValue={blogMsg && blogMsg.id ? blogMsg.id : -1}
          >
            <Input placeholder="我是博客id" hidden />
          </Form.Item>
          <Form.Item
            style={{ padding: 0, margin: 0 }}
            name="title"
            // label={
            //     <Select
            //         style={{ fontWeight: "bolder" }} >
            //         <Option value="0">原创</Option>
            //         <Option value="1">转载</Option>
            //     </Select>
            // }
            initialValue={blogMsg && blogMsg.title ? blogMsg.title : ''}
            rules={[
              {
                required: false,
                message: '标题为空！！！',
              },
            ]}
          >
            {/* <Input.Group compact

                        > */}
            <Input placeholder="文章标题" style={{ width: '50%' }} />
            {/* </Input.Group> */}
          </Form.Item>
        </Card>

        {/* 富文本编辑器 */}
        <Card hoverable>
          <Form.Item
            name="content"
            initialValue={
              blogMsg && blogMsg.content ? BraftEditor.createEditorState(blogMsg.content) : ''
            }
            rules={[
              {
                required: true,
                message: '内容为空！！！',
              },
            ]}
          >
            {/* <Input.Password /> */}
            <BraftEditor value={editorState} onChange={handleEditorChange} onSave={submitContent} />
          </Form.Item>
        </Card>

        <Card hoverable>
          {/* <Form.Item
                        style={{ margin: 0 }}
                    // {...tailLayout} 
                    > */}
          <Row justify="space-between">
            <Col span={12}>
              <Card bordered={false} hoverable>
                {/* <Input.Group compact
                                    > */}
                <Form.Item
                  name="typeId"
                  initialValue={blogMsg && blogMsg.typeId ? blogMsg.typeId.toString() : '0'}
                  // initialValue="0"
                  label={<Button type="primary">分类</Button>}
                  colon={false}
                >
                  <Select style={{ width: '50%' }}>
                    <Option value="1">日常</Option>
                    <Option value="2">历史</Option>
                    <Option value="3">哲学</Option>
                    <Option value="4">冷知识</Option>
                    <Option value="5">科学</Option>
                    <Option value="6">数据结构</Option>
                    <Option value="7">算法</Option>
                    <Option value="8">话题</Option>
                  </Select>
                </Form.Item>
                {/* </Input.Group> */}
              </Card>
            </Col>
            <Col span={12}>
              <Card bordered={false} hoverable>
                <Form.Item
                  // name="tagId"
                  initialValue="2"
                  label={<Button type="danger">标签</Button>}
                  colon={false}
                >
                  {/* <Input.Group compact
                                        > */}
                  <Select style={{ width: '50%' }}>
                    <Option value="0">java</Option>
                    <Option value="1">c</Option>
                    <Option value="2">Python</Option>
                  </Select>
                  {/* </Input.Group> */}
                </Form.Item>
              </Card>
            </Col>
          </Row>
          {/* </Form.Item> */}
        </Card>
        <Card hoverable>
          <Input.Group compact>
            <Button type="primary" htmlType="submit">
              首图
            </Button>
            <Form.Item
              // style={{ margin: 0 }}
              // className={styles.publishCard}
              name="firstPicture"
              initialValue={blogMsg && blogMsg.firstPicture ? blogMsg.firstPicture : '0'}
              // {...tailLayout}
            >
              <Input placeholder="首图地址" />
            </Form.Item>
          </Input.Group>
        </Card>
        <Card hoverable>
          <Form.Item
            // name="sharement"
            label={<Button type="danger">分享</Button>}
            colon={false}
            name="sharement"
            initialValue={blogMsg && blogMsg.sharement ? 'true' : 'false'}
            className={styles.publishCard}
          >
            <Select>
              <Option value="false">不可分享</Option>
              <Option value="true">分享</Option>
            </Select>
            {/* <MyCheckbox value="111" /> */}
          </Form.Item>
        </Card>
        <Card hoverable>
          <Form.Item
            name="description"
            label="简介"
            initialValue={blogMsg && blogMsg.description ? blogMsg.description : ''}
          >
            <Input.TextArea />
          </Form.Item>
        </Card>
        <Card hoverable>
          <Row>
            <Col span={6} offset={18}>
              <Form.Item>
                <Row justify="space-between">
                  <Col span={7}>
                    <Button>返回</Button>
                  </Col>
                  <Col span={7}>
                    <Button htmlType="submit" type="primary">
                      保存
                    </Button>
                  </Col>
                  <Col span={7}>
                    <Button>发布</Button>
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </Card>
  );
};

export default connect(({ blogs }: BlogsState) => ({
  blogs,
}))(Publish);
// export default Publish;
