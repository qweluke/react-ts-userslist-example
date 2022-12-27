import getAxiosApi from '../services/axiosFactory';

const usersApi = {
  fetchUsersPaginated: async (props: { page: number }) => {
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
  fetchUserByUsername: async (props: { username: string }) => {
    const response = await getAxiosApi({
      url: '/users',
      method: 'get',
      params: {
        username: props.username,
      },
    });

    return response.data[0] || null;
  },
};

export default usersApi;
