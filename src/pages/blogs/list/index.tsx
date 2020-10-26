import React, { useState, useEffect } from 'react';
import { Card} from 'antd';
import Search from './components/search';
import BlogList from './components/blogList';

const Blog = () => {
  return (
    <div style={{ margin: 0 }}>
      <Card hoverable={false}>
        <Search />
        <Card hoverable={false}>
          <BlogList/>
        </Card>
      </Card>
    </div>
  );
};

export default Blog;

