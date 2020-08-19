import React from 'react';
import { Input, Button, Card, Col, Row } from 'antd';

const TypePublish = (props) => {

    return (
        <div>
            <Card
                hoverable={true}
            >
                <Row justify="space-between">
                    <Col span={14}>
                        <Input.Group compact>
                            <Button type="primary" style={{ width: "15%" }}>博客类型名称</Button>
                            <Input placeholder="请输入类型..." style={{ width: "80%" }} />
                        </Input.Group>
                    </Col>
                    <Col span={8}>
                        <Button type="dashed">返回</Button>
                        <Button type="primary">提交</Button>
                    </Col>
                </Row>
            </Card>
        </div>
    );

}

export default TypePublish;