import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addresses: null,
};

const addressesSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {},
});

export default addressesSlice;
