import {StyleSheet, TouchableOpacity, View, Text, Dimensions} from 'react-native';

const windowHeight = Dimensions.get('window').height;

type styleProp = {
  title: string;
  navigation?: any
  func?: ()=>void;
  color?: string;
  background?: string;
  paddingNumber?: number;
};
function CommonButton(prop: styleProp) {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, {paddingHorizontal: prop.paddingNumber }]}
      onPress={() => {
        prop.navigation?.navigate('Certification');
        prop?.func && prop.func();
      }}>
      <View style={[styles.button, {backgroundColor: prop.background || '#FFD600' }]}>
        <Text style={[styles.buttonTitle, {color: prop.color || '#030303'}]}>{prop.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default CommonButton;

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    top: windowHeight - 140,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FFD600',
    borderRadius: 10,
    width: '100%',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    fontSize: 18,
    letterSpacing: -0.36,
    fontWeight: '700',
  },
});
