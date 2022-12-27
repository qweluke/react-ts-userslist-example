import getAxiosApi from '../services/axiosFactory';

// todo: add missing prop interfaces
const usersApi = {
  fetchUsersPaginated: async (props: any) => {
    const response = await getAxiosApi({
      url: '/users',
      method: 'get',
      params: {
        _page: props.page | 0,
        _limit: 20,
      },
    });

    return {
      data: response.data || [],
      totalCount: response?.headers?.['x-total-count']
        ? +response?.headers?.['x-total-count']
        : 0,
    };
  },
  fetchUserByUsername: async (props: any) => {
    const response = await getAxiosApi({
      url: '/users',
      method: 'get',
      params: {
        username: props.username,
      },
    });

    return response.data[0]  ||  null;
  },
};

export default usersApi;
