import { AxiosError } from "axios";
import { filterInstance, mygalleryInstance } from "./instance";
import {
  CreateFilterParams,
  CreateFilterResponse,
} from "#types/filterService.type";
import { exhibitionServiceToken } from "@utils/dummy";
import { Alert } from "react-native";
import { getToken } from "./login";

// 썸네일 불러오기 (GET 테스트 해보려고)
export const getThumbnail = async (filterId: string) => {
  try {
    const userToken = await getToken();
    const response = await filterInstance.get(`/${filterId}/thumbnail`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response;
  } catch (error) {
    console.log("실패");
    throw error;
  }
};

// 필터 제작 및 임시저장 (multipart/form-data)
export const createFilter = async ({
  url,
  thumbnail,
  representationImg,
  requestDto,
}: CreateFilterParams): Promise<CreateFilterResponse> => {
  const formData = new FormData();

  // 썸네일 파일 추가
  formData.append("thumbnail", {
    uri: thumbnail.uri,
    name: thumbnail.name,
    type: thumbnail.type,
  });
 
  // representation 이미지 파일 추가
  representationImg.forEach((img) => {
    formData.append("representation_img", {
      uri: img.uri,
      name: img.name,
      type: img.type,
    });
  });

  formData.append("requestDto", JSON.stringify(requestDto));

  // console.log('formData', formData);

  try {
    // console.log('진입');
    const userToken = await getToken();
    const response = await filterInstance.post(url, formData, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "multipart/form-data",
      },
      //   timeout: 5000, // 타임아웃을 5초로 설정
    });

    // console.log('성공', response.data);
    // console.log('성공 데이터', response.config.data._parts);
    // console.log('formData', formData);
    return response.data;
  } catch (error) {
    Alert.alert(
      ((error as AxiosError)?.response?.data as { error: string }).error
    );
    // console.error('실패 데이터', (error as AxiosError)?.config?.data._parts);
    // 에러코드에 따라 분기처리
    throw error;
  }
};

// 임시 필터 리스트 조회
export const getTemporaryFilterList = async () => {
  try {
    const userToken = await getToken();
    const response = await filterInstance.get("/temporary", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data.content;
  } catch (error) {
    console.log("실패", (error as AxiosError)?.response?.data);
    throw error;
  }
};

// 임시 필터 삭제
export const deleteTemporaryFilter = async (
  filterId: string,
  token: string
) => {
  try {
    const userToken = await getToken();
    const response = await filterInstance.delete(`/temporary/${filterId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    Alert.alert(
      ((error as AxiosError)?.response?.data as { error: string }).error
    );
    // console.log('실패', (error as AxiosError)?.response?.data);
    throw error;
  }
};

//필터조회
export const filterSearch = async () => {
  try {
    const userToken = await getToken();
    const response = await filterInstance.get("/searching", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    if (response.status == 200) {
      console.log("필터 searching 조회에 성공했습니다.");
    }

    return response.data.content;
  } catch (error) {
    console.log("필터조회실패", (error as AxiosError)?.response?.data);
    throw error;
  }
};

// 필터 id 세부 디테일 조회
export const indexFilterDetail = async (filterId: string) => {
  console.log("이 필터아이디는" + filterId);
  try {
    const response = await filterInstance.get(`/${filterId}/details`, {});
    if (response.status == 200) {
      console.log("개별 필터 상세조회에 성공했습니다.");
    }

    return response.data.payload;
  } catch (error) {
    console.log(
      "개별 필터 상세조회 실패",
      (error as AxiosError)?.response?.data
    );
    throw error;
  }
};

//필터 좋아요
export const pushLikeToFilter = async (filterId: string) => {
  try {
    console.log(filterId);
    const userToken = await getToken();
    const response = await filterInstance.post(
      `/${filterId}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    if (response.status == 200) {
      console.log("사용자의 좋아요가 정상적으로 동작했습니다.");
    }
    return response.data.payload;
  } catch (error) {
    console.log("필터 좋아요 api 실패", (error as AxiosError)?.response?.data);
    throw error;
  }
};

//필터 좋아요 취소
export const deleteLikeToFilter = async (filterId: string) => {
  try {
    const userToken = await getToken();
    const response = await filterInstance.delete(`/${filterId}/unlike`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    if (response.status == 200) {
      console.log("사용자의 좋아요 취소가 정상적으로 동작했습니다.");
    }
    return response.data.payload;
  } catch (error) {
    console.log(
      "필터 좋아요취소 api 실패",
      (error as AxiosError)?.response?.data
    );
    throw error;
  }
};

type tagIdList = {
  tagId?: string;
  keyword?: string;
};

//필터태그로 검색
export const searchForTag = async (tags: tagIdList) => {
  try {
    const params = {
      keyword: tags?.keyword || "",
      tagId: tags?.tagId || "",
    };

    const queryString = new URLSearchParams(params).toString();
    const response = await filterInstance.get(`/searching?${queryString}`, {});

    if (response.status == 200) {
      console.log("필터 태그결과가 정상적으로 조회되었습니다.");
      console.log(response.data.content);
    }

    return response.data.content;
  } catch (error) {
    console.log("필터 태그로 검색 실패", (error as AxiosError)?.response?.data);
    throw error;
  }
};

type deleteProp = {
  title: string; //filter 인지 exhibition 인지
  id: string;
};

//필터 삭제
export const deleteItem = async ({ title, id }: deleteProp) => {
  try {
    const userToken = await getToken();
    if (title == "filter") {
      const response = await filterInstance.delete(`/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.status == 200) {
        console.log("필터가 정상적으로 지워졌습니다.");
      }
      return response;
    } else if (title == "exhibition") {
      const response = await mygalleryInstance.delete(`/exhibitions/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.status == 200) {
        console.log("전시가 정상적으로 지워졌습니다.");
      }
      return response;
    }
  } catch (error) {
    console.log("필터 삭제 실패", (error as AxiosError)?.response?.data);
    throw error;
  }
};
