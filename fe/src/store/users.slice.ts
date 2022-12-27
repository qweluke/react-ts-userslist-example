import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import usersApi from '../api/users.api';
import requestStatus from './requestStatus';
import { RootState, store } from './index';
import { shouldFetchData } from '../helpers/shouldFetchData';
import { UsersStoreInterface } from '../interfaces/UserStore.interface';
import { UserInterface } from '../interfaces/User.interface';

export const USERS_FEATURE_KEY = 'users';
export const usersAdapter = createEntityAdapter({
  selectId: (row: UserInterface) => row.username,
});

export const fetchUsersPaginated = createAsyncThunk(
  `${USERS_FEATURE_KEY}/fetchPaginated`,
  async (props: { page: number }) =>
    await usersApi.fetchUsersPaginated({ page: props.page }),
);

export const fetchUsersPaginatedIfNeeded = createAsyncThunk(
  `${USERS_FEATURE_KEY}/fetchPaginatedIfNeeded`,
  async (props: { page: number }, { getState, dispatch }) => {
    const { users } = getState() as RootState;
    if (
      users.params.page !== props.page ||
      shouldFetchData({
        date: users.lastRequest,
        timeToAdd: { minutes: 30 },
      })
    ) {
      return dispatch(fetchUsersPaginated(props));
    }
  },
);

export const fetchUsersByUsername = createAsyncThunk(
  `${USERS_FEATURE_KEY}/fetchByUsername`,
  async ({ username }: { username: string }) =>
    await usersApi.fetchUserByUsername({ username: username }),
);

const defaultStore: UsersStoreInterface = {
  ids: [],
  entities: {},
  loadingStatus: requestStatus.initial,
  totalRows: 0,
  lastRequest: null,
  params: {},
  error: '',
};

export const initialState = usersAdapter.getInitialState(defaultStore);
export const usersSlice = createSlice({
  name: USERS_FEATURE_KEY,
  initialState: initialState,
  reducers: {
    add: usersAdapter.addOne,
    remove: usersAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      // fetch users paginated
      .addCase(fetchUsersPaginated.pending, (state, { meta }) => {
        state.params = meta.arg;
        state.lastRequest = +new Date();
        state.loadingStatus = requestStatus.pending;
      })
      .addCase(fetchUsersPaginated.fulfilled, (state, { payload }) => {
        usersAdapter.setAll(state, payload.data);
        state.totalRows = payload.totalCount;
        state.loadingStatus = requestStatus.fulfilled;
      })
      .addCase(fetchUsersPaginated.rejected, (state, { error }) => {
        state.loadingStatus = requestStatus.error;
        state.error = error.message || '';
      })

      // fetch users by username
      .addCase(fetchUsersByUsername.pending, (state) => {
        state.lastRequest = +new Date();
        state.loadingStatus = requestStatus.pending;
      })
      .addCase(fetchUsersByUsername.fulfilled, (state, { payload }) => {
        if (payload) {
          usersAdapter.upsertOne(state, payload);
        }
        state.loadingStatus = requestStatus.fulfilled;
      })
      .addCase(fetchUsersByUsername.rejected, (state, { error }) => {
        state.loadingStatus = requestStatus.error;
        state.error = error?.message || '';
      });
  },
});

export const usersReducer = usersSlice.reducer;

const { selectAll, selectById } = usersAdapter.getSelectors();

export const getUsersState = (rootState: ReturnType<typeof store.getState>) =>
  rootState[USERS_FEATURE_KEY];

export const selectAllUsers = createSelector(getUsersState, selectAll);

export const selectUserByUsername = (username: string) =>
  createSelector(getUsersState, (state) => selectById(state, username));

export const selectTotalUsersCount = createSelector(
  getUsersState,
  (state) => state.totalRows,
);

export const selectUsersLoadingStatus = createSelector(
  getUsersState,
  (state) => state.loadingStatus,
);
