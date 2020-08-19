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
        title: '标签',
        key: 'tags',
        dataIndex: 'tags',
        render: (tags: any) => (
            <>
                {tags.map((tag: any) => {
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
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        index: '2',
        tags: ['nice', 'developer'],
    },
    {
        key: '3',
        index: '3',
        tags: ['nice', 'developer'],
    },
    {
        key: '4',
        index: '4',
        tags: ['nice', 'developer'],
    },
    {
        key: '5',
        index: '5',
        tags: ['nice', 'developer'],
    },
    {
        key: '6',
        index: '6',
        tags: ['nice', 'developer'],
    },
];

const TagList = () => {
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

export default TagList;