import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

/** 인스턴스 생성 */
const FILTER_BASE_URL = Config.FILTER_BASE_URL as string;
const EXHIBITION_BASE_URL = Config.EXHIBITION_BASE_URL as string;

/** 인증 토큰을 가져오는 함수 */
const getAuthToken = async () => await AsyncStorage.getItem('token');

/** Axios 기본 인스턴스 생성 */
const createAxiosInstance = (baseURL: string) => {
  const instance = axios.create({baseURL});

  /* instance.interceptors.request.use(
    async config => {
      // 토큰을 가져옵니다.
      const token = await getAuthToken();

      // 토큰이 있으면 Authorization 헤더를 설정합니다.
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    error => Promise.reject(error),
  ); */

  return instance;
};

/** 인스턴스 생성 */
const apiInstances = {
  filterInstance: createAxiosInstance(`${FILTER_BASE_URL}/filters`),
  exhibitionInstance: createAxiosInstance(`${EXHIBITION_BASE_URL}/api/v1/exhibitions`),
  mygalleryInstance: createAxiosInstance(`${EXHIBITION_BASE_URL}/api/v1/mygallery`)
};

/** 인스턴스를 내보냅니다. */
export const {filterInstance, exhibitionInstance, mygalleryInstance} = apiInstances;

