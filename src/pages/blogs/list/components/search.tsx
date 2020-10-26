import { Select, Card, Form, Row, Col, Button,  Input} from 'antd';
import React from 'react';

const { Option } = Select;

const formItem = {
    margin: 0,
  };

const Search = (props : any) => {

    const {dispatch} = props;

    const onFinish = (values: any) => {
        if (dispatch) {
          dispatch({
            type: 'blogs/queryBlogVOsByCondition',
            payload: values,
          }).then((res: any) => {
              const dataSource = res.result || [];
            setDataSource(dataSource);
          });
        }
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };

    return (
        <div>
            <Card title="博客查询" style={{ padding: 0 }} hoverable={false}>
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
                <Form.Item style={formItem} label="标题" name="title" rules={[{required : true, message : "请选择类型"}]}>
                  <Input placeholder="请输入标题内容" />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item style={formItem} label="分类" name="typeId" rules={[{required : true, message : "请选择分类"}]}>
                  {/* <Search style={{ width: 600 }} /> */}

                  <Select allowClear placeholder="选择分类">
                    <Option value="1">日常1</Option>
                    <Option value="2">历史1</Option>
                    <Option value="3">哲学1</Option>
                    <Option value="4">冷知识1</Option>
                    <Option value="5">科学1</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item
                  style={formItem}
                  // {...tailLayout}
                  name="recommend"
                  valuePropName="checked"
                  rules={[{required : true, message : "请选择类型"}]}
                >
                  {/* <Checkbox >推荐</Checkbox> */}
                  <Select allowClear placeholder="是否推荐">
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
        </Card>
        </div>
    );
}
export default Search;