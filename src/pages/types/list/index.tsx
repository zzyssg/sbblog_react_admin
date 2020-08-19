import React from 'react';
import { Table, Tag, Space, Card } from 'antd';

const columns = [
    {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        render: (text : any) => <a>{text}</a>,
    },
    {
        title: '类型',
        key: 'types',
        dataIndex: 'types',
        render: (types: any) => (
            <>
                {types.map((tag: any) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: '操作',
        key: 'action',
        render: (text: any, record: any) => (
            <Space size="middle">
                <a>编辑 {record.name}</a>
                <a>删除</a>
            </Space>
        ),
    },
];

const data = [
    {
        key: '1',
        index: '1',
        types: ['nice', 'developer'],
    },
    {
        key: '2',
        index: '2',
        types: ['nice', 'developer'],
    },
    {
        key: '3',
        index: '3',
        types: ['nice', 'developer'],
    },
    {
        key: '4',
        index: '4',
        types: ['nice', 'developer'],
    },
    {
        key: '5',
        index: '5',
        types: ['nice', 'developer'],
    },
];

const TypeList = () => {
    return (
        <div>
            <Card 
                hoverable = {true}
            >
                <Table dataSource={data} columns={columns} />
            </Card>
        </div>
    );


}

export default TypeList;