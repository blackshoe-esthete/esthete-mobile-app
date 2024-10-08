import { useState } from 'react';
import {TouchableOpacity, View, StyleSheet, Image, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import backIcon from '@assets/icons/backspace_white.png';
import nextIcon from '@assets/icons/arrow.png';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '@screens/Routes';
import OutModal from '@components/SettingScreen/GoOutModal';
import { useMutation } from '@tanstack/react-query';
import { logout } from 'src/apis/login';
type Props = NativeStackScreenProps<Routes, 'MyMenu'>;

function MyMenu({navigation, route}: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const modalShown = () => {
    setModalVisible(!modalVisible);
  }

  const mutationLogout = useMutation({
    mutationFn: logout,
    onSuccess(data){
      console.log(data);
    },
    onError(data){
      console.log(data);
    }
  });

  const subTitleText = `
  ESTHETE를 이용해주셔서 감사합니다.
  다시 이용하시려면 재로그인 부탁드립니다.`
  const customProps = {
    title: '로그아웃하시겠습니까?',
    subTitle: subTitleText,
    visible: modalVisible,
    onClose: modalShown,
    button: ['로그아웃', '닫기'],
    button1: () => mutationLogout.mutate()
  }

  const objects = [
    {id: 1, title: '좋아요', name: 'MyLikes'},
    {id: 2, title: '임시저장', name: 'Temporary'},
    {id: 3, title: '필터 구매 내역', name: 'SubScribe'},
    {id: 4, title: '설정', name: 'Settings'},
    {id: 5, title: '정보', name: 'Information'},
    {id: 6, title: '로그아웃', function: modalShown, color: '#FFD600'},
  ];
  type menuProp = {
    id: number;
    title: string;
    name?: string;
    function?: () => void;
    color?: string;
  };
  const nextScreen = (props: menuProp) => {
    const newScreen: any = props?.name;
    return (
      <TouchableOpacity
        onPress={() => {
          newScreen && navigation.navigate(newScreen);
          props.function && props.function();
        }}>
        <View style={styles.stackButton}>
          <Text style={[styles.titleStyle, {color: props.color || 'white' }]}>{props?.title}</Text>
          <Image source={nextIcon} style={styles.icon} />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconPosition}
          onPress={() => navigation.goBack()}>
          <Image source={backIcon} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.menuTitle}>설정 및 환경</Text>
      </View>
      <View style={{marginTop: 15, width: '100%'}}>
        {objects.map((content, i) => {
          return <View key={i}>{nextScreen(content)}</View>;
        })}
      </View>

        {/* 모달관리 */}
        <OutModal {...customProps}/>
    </SafeAreaView>
  );
}

export default MyMenu;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconPosition: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  icon: {
    width: 8.5,
    height: 20,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  stackButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 25,
    height: 68,
    width: '100%',
    alignItems: 'center',
    borderBottomColor: '#292929',
    borderWidth: 0.8,
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: '500',
    // lineHeight: -0.36,
  },
});
