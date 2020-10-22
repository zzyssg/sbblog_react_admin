import {
  queryAllBlogVOs,
  queryBlogList,
  addBlog,
  queryBlogVOsByCondition,
  deleteBlogById,
  queryBlogsByYear,
  queryTypesAndTags,
} from '@/services/blogs';

const blogs = {
  namespace: 'blogs',
  state: {
    BlogsState: '',
  },
  effects: {
    *fetch({ payload }: any, { call }: any) {
      const response = yield call(queryAllBlogVOs, payload);
      return response;
    },
    *queryBlogList({ payload }: any, { call }: any) {
      const response = yield call(queryBlogList, payload);
      return response;
    },
    *addBlog({ payload }: any, { call }: any) {
      const response = yield call(addBlog, payload);
      return response;
    },
    *queryBlogVOsByCondition({ payload }: any, { call }: any) {
      const response = yield call(queryBlogVOsByCondition, payload);
      return response;
    },
    *deleteBlogById({ payload }: any, { call }: any) {
      const response = yield call(deleteBlogById, payload);
      return response;
    },
    *queryBlogsByYear({ payload }: any, { call }: any) {
      const response = yield call(queryBlogsByYear, payload);
      return response;
    },
    *queryTypesAndTags({ payload }: any, { call }: any) {
      const response = yield call(queryTypesAndTags, payload);
      return response;
    },
  },
  reducer: {},
};

export default blogs;
