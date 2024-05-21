import {create} from 'zustand';

const NavigateStore = (set: any, get: any) => ({ 
  status: false, //처음 navigation은 거짓
  changeStatus: () => {
    const {status} = get(); 
    const nextState = !status;
    set({ status: nextState})
  },
  getFalse: () => {
    const {status} = get();
    set({ status: false })
  },
  getStatue: () => get((state: any) => {state.status})
});

const useNavigateStore = create(NavigateStore);

export default useNavigateStore;