import React from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';

interface RenderImageProps {
  item: string;
}

const RenderImage: React.FC<RenderImageProps> = ({item}) => {
  const [error, setError] = React.useState(false);

  return (
    <View style={styles.imageContainer}>
      {error ? (
        <Text style={styles.errorText}>Image not found</Text>
      ) : (
        <Image style={styles.image} source={{uri: item}} onError={() => setError(true)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  errorText: {
    color: 'red',
  },
});

export default RenderImage;
