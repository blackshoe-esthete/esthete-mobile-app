import { AxiosError } from "axios";
import { mygalleryInstance } from "./instance";
import { mygalleryToken } from "@utils/dummy";

export const getMyFollowing = async () => {
  try{
    const response = await mygalleryInstance.get(`/followings`, {
      headers: {
        Authorization: `Bearer ${mygalleryToken}`
      }
    });
    if(response.data.code == 200){
      console.log(response.data.message);
    }

    return response.data.payload;
  }catch(error){
    console.log('실패 데이터: ', (error as AxiosError).config);
    throw error;
  }
};

export const getMyFollower = async () => {
  try{
    const response = await mygalleryInstance.get(`/followers`, {
      headers: {
        Authorization: `Bearer ${mygalleryToken}`
      }
    });
    if(response.data.code == 200){
      console.log(response.data.message);
    }

    return response.data.payload;
  }catch(error){
    console.log('실패 데이터: ', (error as AxiosError).config);
    throw error;
  }
}