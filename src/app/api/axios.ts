import axiosStatic from 'axios';

const instance = axiosStatic.create();
export const axios = instance;
