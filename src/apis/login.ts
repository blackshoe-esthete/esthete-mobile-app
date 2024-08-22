import axios, { AxiosError } from "axios";
import { userInstance } from "./instance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "react-native-config";

type loginProp = {
  id: string;
  pwd: string;
};

// 로그인
export const login = async ({ id, pwd }: loginProp) => {
  try {
    const response = await userInstance.post(`/login`, {
      username: id,
      password: pwd,
    });
    if (response.status == 200) {
      console.log("성공적으로 로그인이 됐습니다.");
    }

    const authorizationHeader = response.headers["authorization"];
    if (authorizationHeader) {
      const token = authorizationHeader.split(" ")[1];
      await AsyncStorage.setItem("token", token);
      console.log("Token:", token);
    } else {
      console.log("Authorization 헤더가 없습니다.");
    }
  } catch (error) {
    console.log("로그인 실패 데이터: ", (error as AxiosError).config);
    if ((error as AxiosError).response?.status === 401) {
      await refreshToken();
    } else {
      throw error;
    }
  }
};

export const logout = async () => {
  try {
    const response = await userInstance.post(`/logout`, {});
    if (response.status == 200) {
      console.log("로그아웃이 정상적으로 실행되었습니다.");
    }

    return response.data;
  } catch (error) {
    console.log("로그아웃 실패: ", (error as AxiosError).config);
    throw error;
  }
};

//refresh 토큰 재발급
export const refreshToken = async () => {
  try {
    const response = await userInstance.post(`/reissue`, {});
    if (response.status == 200) {
      console.log("refresh token이 재발급됐습니다.");
    }

    const authorizationHeader = response.headers["authorization"];
    if (authorizationHeader) {
      const token = authorizationHeader.split(" ")[1];
      await AsyncStorage.setItem("token", token);
      console.log("Token:", token);
    } else {
      console.log("Authorization 헤더가 없습니다.");
    }
  } catch (error) {
    console.log("리프레시 토큰 재발급 실패: ", (error as AxiosError).config);
    throw error;
  }
};

//이메일 인증번호 전송
export const emailValidation = async (email: string) => {
  try {
    const response = await userInstance.post(`/signup/email/validation`, {
      email: email,
    });
    if (response.status == 200) {
      console.log("인증번호가 성공적으로 전달되었습니다.");
    }

    return response.data;
  } catch (error) {
    console.log("이메일 검증 실패 데이터: ", (error as AxiosError).config);
    throw error;
  }
};

type verifyProp = {
  email: string;
  number: string;
};
//인증번호 검사
export const emailVerification = async ({ email, number }: verifyProp) => {
  try {
    const response = await userInstance.post(`/signup/email/verification`, {
      email: email,
      auth_num: number,
    });
    if (response.status == 200) {
      console.log("인증번호 확인이 되었습니다.");
    }
    return response.data;
  } catch (error) {
    console.log("이메일 인증 전송 실패: ", (error as AxiosError).config);
    throw error;
  }
};

type signupProp = {
  email: string;
  password: string;
};
// 사용자 이메일, 비밀번호 회원가입
export const signUpNext = async ({ email, password }: signupProp) => {
  try {
    const response = await userInstance.post(`/signup/next`, {
      email: email,
      password: password,
    });
    if (response.status == 200) {
      console.log("회원가입 절차가 무사히 진행되었습니다.");
    }
    return response.data.payload;
  } catch (error) {
    console.log("회원가입1 실패: ", (error as AxiosError).config);
    throw error;
  }
};

//이미 존재하는 사용자인지 확인
export const userCheck = async (email: string) => {
  try {
    const response = await userInstance.put(`/id/check`, {
      email,
    });
    return response.data;
  } catch (error) {
    console.log(
      "이미 존재하는 사용자인지 조회하기 실패: ",
      (error as AxiosError).config
    );
    throw error;
  }
};

type completeProp = {
  user_id: string;
  nickname: string;
  gender: string;
  birthday: string;
};

//회원가입 마무리
export const signupCompletion = async ({
  user_id,
  nickname,
  gender,
  birthday,
}: completeProp) => {
  try {
    const response = await userInstance.post(`/signup/completion`, {
      user_id,
      nickname,
      gender,
      birthday,
    });
    if (response.status == 200) {
      console.log("정상적으로 회원가입이 되었습니다.");
    }
    return response.data.payload;
  } catch (error) {
    console.log("회원가입 마무리 실패: ", (error as AxiosError).config);
    throw error;
  }
};

type socialProp = {
  provider?: string;
  accessToken?: string;
  email?: string;
  nickname?: string;
  gender?: string;
  birthday?: string;
};

// 소셜로그인
// 로그인후 -> 회원인경우, 아닌경우로 나뉨
// 회원인경우: 헤더) access, 쿠키) refresh
// 비회원인경우: signup 화면으로 이동
export const socialIdentifyLogin = async ({
  provider,
  accessToken,
  email,
}: socialProp) => {
  try {
    const body = {
      naver_id: provider === "naver" ? Config.NAVER_SERVER_ID : null,
      kakao_id: provider === "kakao" ? Config.KAKAO_SERVER_ID : null,
      email: provider === "google" ? email : null,
      provider,
    };

    const response = await userInstance.post(
      `/social-login?authorizationHeader=${accessToken}`,
      body
    );

    if (response.status == 200) {
      console.log("소셜로그인이 정상적으로 요청되었습니다.");
    }

    //회원인 경우
    if (response.data.payload.membered) {
      const accessToken = response.headers["authorization"];
      if(accessToken){
        const token = accessToken.split(" ")[1];
        await AsyncStorage.setItem("token", token);
        console.log(token);
      }
    }
    return response.data.payload.membered;
  } catch (error) {
    console.log("소셜로그인 요청 실패: ", (error as AxiosError).config);
    throw error;
  }
};


// 비회원인 경우 signup2 화면
export const socialSignUp = async ({
  provider,
  accessToken,
  email,
  nickname,
  gender,
  birthday,
}: socialProp) => {
  try { 
    const body = {
      provider,
      kakao_id: provider == "kakao" ? Config.KAKAO_SERVER_ID : null,
      naver_id: provider == "naver" ? Config.NAVER_SERVER_ID : null,
      nickname,
      email,
      gender,
      birthday,
    };

    const response = await userInstance.post(
      `/social-login/signup?authorizationHeader=${accessToken}`,
      body
    );
    if(response.status == 200){
      console.log("소셜로그인 회원가입이 정상적으로 마무리되었습니다.");
      await AsyncStorage.setItem('userId', response.data.payload.user_id);
      const accessToken = response.headers["authorization"];
      if(accessToken){
        const token = accessToken.split(" ")[1];
        await AsyncStorage.setItem("token", token);
      }
    }
    return response.data.payload;
  } catch (error) {
    console.log("소셜로그인 추가정보기입 실패: ", (error as AxiosError).config);
    throw error;
  }
};
