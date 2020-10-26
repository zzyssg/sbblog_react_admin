import React, {useState} from 'react';
import { Card} from 'antd';
import Search from './components/search';
import BlogList from './components/blogList';

const Blog = () => {

  const [blogs, setBlogs] = useState<[]>();

  const searchBlogs = (blogList : any) => {
    setBlogs(blogList);
  }

  return (
    <div style={{ margin: 0 }}>
      <Card hoverable={false}>
        <Search callback={searchBlogs}/>
        <Card hoverable={false}>
          <BlogList blogSource={blogs}/>
        </Card>
      </Card>
    </div>
  );
};

export default Blog;

