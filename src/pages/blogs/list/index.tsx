import React, {useState} from 'react';
import { Card} from 'antd';
import Search from './components/search';
import BlogList from './components/blogList';

const Blog = () => {

  const [blogs, setBlogs] = useState<[]>();
  const [searchCondition, setSearchCondition] = useState<Object>();

  const searchBlogs = (callbackObj : any) => {
    const {blogList} = callbackObj;
    const {searchConditionValue} = callbackObj;
    setBlogs(blogList);
    setSearchCondition(searchConditionValue);
  }

  return (
    <div style={{ margin: 0 }}>
      <Card hoverable={false}>
        <Search callback={searchBlogs}/>
        <Card hoverable={false}>
          <BlogList blogSource={blogs} searchCondition={searchCondition}/>
        </Card>
      </Card>
    </div>
  );
};

export default Blog;

