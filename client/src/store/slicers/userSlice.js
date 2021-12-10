import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addNewUser = createAsyncThunk(
  'userSlice/addNewTodo',
  async function ({ email, password }, { rejectWithValue, dispatch }) {
    try {
      const user = {
        email,
        password,
      };
      const response = await fetch(`http://localhost:5000/user/register`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      if (!response.ok) throw new Error('Ошибка опять');
      const data = await response.json();
      dispatch(setUser(data));
    } catch (e) {
      return rejectWithValue(e.message)
    }
  },
);

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    email: null,
  },
  reducers: {
    setUser(state, action) {
      state.email = action.payload.user.email;
    },

    removeUser(state) {
      state.email = null;
    }
  }
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
