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
          debugger
          message.error(res.retMsg);
        }
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Card bordered={false} style={{ padding: 0 }} >
      <Form
        // {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Card style={{ padding: 0, margin: 0 }} >
          <Form.Item
            name="id"
            // 若有id则是从编辑页面跳转而来，初始化为相应的blogId值；否则为-1，即不存在
            initialValue={blogMsg && blogMsg.id ? blogMsg.id : -1}
          >
            <Input placeholder="我是博客id" hidden />
          </Form.Item>

          <Row justify="space-between">
            <Col span={11}>
              <Input.Group compact>
                <Button type="primary">标题</Button>
                <Form.Item
                  style={{ padding: 0, margin: 0, width: "70%" }}
                  name="title"

                  initialValue={blogMsg && blogMsg.title ? blogMsg.title : ''}
                  rules={[
                    {
                      required: false,
                      message: '标题为空！！！',
                    },
                  ]}
                >
                  <Input placeholder="文章标题..." />
                </Form.Item>
              </Input.Group>
            </Col>
            <Col span={6}>
              <Input.Group compact>
                <Button type="danger">分类</Button>
                <Form.Item
                  name="typeId"
                  initialValue={blogMsg && blogMsg.typeId ? blogMsg.typeId.toString() : "0"}
                  colon={false}
                  style={{ width: "60%" }}
                >
                  <Select >
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
              </Input.Group>
            </Col>
            <Col span={6}>
              <Input.Group compact
              >
                <Button type="danger">标签</Button>
                <Form.Item
                  // name="tagId"
                  initialValue="c"
                  colon={false}
                  style={{ width: "60%" }}
                >
                  <Select>
                    <Option value="0">java</Option>
                    <Option value="1">c</Option>
                    <Option value="2">Python</Option>
                  </Select>
                </Form.Item>
              </Input.Group>
            </Col>
          </Row>
        </Card>

        {/* 富文本编辑器 */}
        <Card >
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
        <Card >
          <Form.Item
            name="description"
            label="简介"
            initialValue={blogMsg && blogMsg.description ? blogMsg.description : ''}
          >
            <Input.TextArea />
          </Form.Item>
        </Card>
        <Card>
          <Row justify="space-between">
            <Col span={18}>
              <Input.Group compact>
                <Button type="primary" htmlType="submit">
                  首图
            </Button>
                <Form.Item
                  name="firstPicture"
                  style={{ width: "80%" }}
                  initialValue={blogMsg && blogMsg.firstPicture ? blogMsg.firstPicture : 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3501337130,1924171143&fm=26&gp=0.jpg'}
                >
                  <Input placeholder="首图地址" />
                </Form.Item>
              </Input.Group>
            </Col>
            <Col span={6}>
              <Input.Group compact>
                <Button type="danger">分享</Button>
                <Form.Item
                  // name="sharement"
                  colon={false}
                  name="sharement"
                  initialValue={blogMsg && blogMsg.sharement ? 'true' : 'false'}
                  className={styles.publishCard}
                  style={{ width: "50%" }}
                >
                  <Select>
                    <Option value="false">不可分享</Option>
                    <Option value="true">分享</Option>
                  </Select>
                  {/* <MyCheckbox value="111" /> */}
                </Form.Item>
              </Input.Group>
            </Col>
          </Row>
        </Card>
        <Card >
          <Row>
            <Col span={6} offset={9}>
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
