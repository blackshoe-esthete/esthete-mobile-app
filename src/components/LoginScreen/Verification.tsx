import {View, Image, Text, StyleSheet} from 'react-native';
import verified from '@assets/icons/verified.png';
import unverified from '@assets/icons/unverified.png';

type verifyProp = {
  label?: string;
  state?: boolean;
};

function Verification(props: verifyProp): React.JSX.Element {
  return (
    <View style={styles.alertBox}>
      {props.state ? (
        <>
          <Image source={verified} style={styles.alertIcon} />
          <Text style={styles.alertText}>{props.label} 일치합니다.</Text>
        </>
      ) : (
        <>
          <Image source={unverified} style={styles.alertIcon} />
          <Text style={styles.alertText}>{props.label} 불일치합니다.</Text>
        </>
      )}
    </View>
  );
}

export default Verification;

const styles = StyleSheet.create({
  alertBox: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 12,
    height: 20,
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
});
