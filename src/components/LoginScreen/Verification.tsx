import { View, Image, Text, StyleSheet } from "react-native";
import verified from '@assets/icons/verified.png';
import unverified from '@assets/icons/unverified.png';

type verifyProp = {
  label?: string;
}

function Verification(props: verifyProp):React.JSX.Element {
  return(
    <View style={styles.alertBox}>
      <Image source={unverified} style={styles.alertIcon} />
      <Text style={styles.alertText}>인증번호가 불일치합니다.</Text>
    </View>
  );
}

export default Verification;

const styles = StyleSheet.create({
  alertBox: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 12,
    gap: 5,
  },
  alertIcon: {
    width: 15,
    height: 15,
  },
  alertText: {
    color: 'white',
    fontSize: 12,
    letterSpacing: -0.24,
    fontFamily: 'Gothic A1',
  },
})