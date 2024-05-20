import {TouchableOpacity, View, StyleSheet, Image, Text} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import backIcon from '@assets/icons/backspace_white.png';
import nextIcon from '@assets/icons/arrow.png';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '@screens/Routes';
type Props = NativeStackScreenProps<Routes, 'MyMenu'>;

function MyMenu({navigation, route}: Props) {
  const objects = [
    {id: 1, title: '좋아요', name: 'MyLikes'},
    {id: 2, title: '임시저장', name: 'Temporary'},
    {id: 3, title: '필터 구매 내역', name: 'SubScribe'},
    {id: 4, title: '설정', name: 'Settings'},
    {id: 5, title: '정보', name: 'Information'},
    {id: 6, title: '로그아웃'},
  ];
  type menuProp = {
    id: number;
    title: string;
    name?: string;
  };
  const nextScreen = (props: menuProp) => {
    const newScreen = props?.name;
    return (
      <TouchableOpacity
        onPress={() => {
          newScreen && navigation.navigate(newScreen);
        }}>
        <View style={styles.stackButton}>
          <Text style={styles.titleStyle}>{props.title}</Text>
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
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: -0.36,
  },
});
