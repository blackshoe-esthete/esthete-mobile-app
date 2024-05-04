import {create} from 'zustand';

const CameraStore = (set: any, get: any) => ({
  positions: ['front', 'back'], // 가능한 카메라 위치
  positionIndex: 0, // 현재 위치 인덱스 (0은 'back')

  // 현재 위치를 전환하는 함수
  togglePosition: () => {
    const { positions, positionIndex } = get(); // 현재 상태를 가져옴
    const nextIndex = (positionIndex + 1) % positions.length; // 다음 인덱스 계산
    set({ positionIndex: nextIndex }); // 상태 업데이트
  },

  // 현재 위치를 가져오는 헬퍼
  getCurrentPosition: () => {
    const { positions, positionIndex } = get();
    return positions[positionIndex];
  }
});

const useCameraStore = create(CameraStore);

export default useCameraStore;