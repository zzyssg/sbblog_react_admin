// import React from 'react';

// const Layout: React.FC = ({ children }) => <>{children}</>;

// export default Layout;
import React from 'react';
import { Layout } from 'antd';

const BlogLayout = (props) => {
    const { Header, Footer, Sider, Content } = Layout;
    return (
        <div>
            <Layout>
                <Header>Header</Header>
                <Layout>
                    <Sider theme="light">Sider</Sider>
                    <Content>Content</Content>
                    <Sider theme="light">Sider</Sider>
                </Layout>
                <Footer>Footer</Footer>
            </Layout>
        </div>
    );
};
export default BlogLayout;
