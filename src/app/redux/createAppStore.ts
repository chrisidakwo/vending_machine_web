import { History } from 'history';
import { configureStore } from '@reduxjs/toolkit';

interface CreateAppStoreOptions {
  history: History;
}

const createAppStore = ({ history }: CreateAppStoreOptions) => {
  // return configureStore();
};

export default createAppStore;
