import { useState } from "react";

function Logout(){
  const [modalVisible, setModalVisible] = useState(false);
  const modalShown = () => {
    setModalVisible(!modalVisible);
  }

  const subTitleText = `
  ESTHETE를 이용해주셔서 감사합니다.
  다시 이용하시려면 재로그인 부탁드립니다.`
  const customProps = {
    title: '로그아웃하시겠습니까?',
    subTitle: subTitleText,
    visible: modalVisible,
    onClose: modalShown,
    button: ['로그아웃', '닫기']
  }
  return(
    <>
    </>
  );
}

export default Logout;