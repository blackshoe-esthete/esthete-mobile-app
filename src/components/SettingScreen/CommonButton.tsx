import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';

type styleProp = {
  margin?: number;
  title: string;
  marginHorizontal?: number;
};
function CommonButton(prop: styleProp) {
  return (
    <TouchableOpacity
      style={
        prop.margin
          ? {marginTop: prop.margin, marginHorizontal: prop.marginHorizontal}
          : {}
      }>
      <View style={styles.button}>
        <Text style={styles.buttonTitle}>{prop.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default CommonButton;

const styles = StyleSheet.create({
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
    color: '#030303',
    fontSize: 18,
    letterSpacing: -0.36,
    fontWeight: '700',
  },
});
