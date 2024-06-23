import React, {useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  StyleSheet,
  ListRenderItemInfo,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Config from 'react-native-config';
import searchIcon from '@assets/icons/search.png';
import {useExhibitionDetailsStore} from '../../store/exhibitionCreationStore';

interface Place {
  place_id: string;
  name: string;
  formatted_address: string;
}

const PlacesSearchScreen: React.FC = () => {
  const {details, setDetails} = useExhibitionDetailsStore();
  const [query, setQuery] = useState<string>('');
  const [places, setPlaces] = useState<Place[]>([]);
  const navigation = useNavigation();

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
        params: {
          query: query,
          key: Config.GOOGLE_MAPS_API_KEY,
        },
      });
      setPlaces(response.data.results);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const selectPlace = async (place: Place) => {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
        params: {
          place_id: place.place_id,
          key: Config.GOOGLE_MAPS_API_KEY,
        },
      });

      const {lat, lng} = response.data.result.geometry.location;
      const addressComponents = response.data.result.address_components;

      const state =
        addressComponents.find((component: any) => component.types.includes('administrative_area_level_1'))
          ?.long_name || '';
      const city = addressComponents.find((component: any) => component.types.includes('locality'))?.long_name || '';
      const town =
        addressComponents.find((component: any) => component.types.includes('sublocality_level_1'))?.long_name || '';

      setDetails({
        location: {
          format_address: place.formatted_address,
          longitude: lng,
          latitude: lat,
          state,
          city,
          town,
        },
      });

      navigation.goBack();
    } catch (error) {
      console.error('Error fetching place details: ', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          onSubmitEditing={handleSearch}
          value={query}
          onChangeText={setQuery}
          placeholder="위치 검색"
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Image source={searchIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={places}
        keyExtractor={(item: Place) => item.place_id}
        renderItem={({item}: ListRenderItemInfo<Place>) => (
          <TouchableOpacity style={styles.itemContainer} onPress={() => selectPlace(item)}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDetails}>{item.formatted_address}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#333',
    padding: 15,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: '#FFF',
    marginRight: 10,
    fontFamily: 'System',
  },
  icon: {
    width: 20,
    height: 20,
  },
  itemContainer: {
    padding: 10,
    paddingBottom: 15,
    marginVertical: 5,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#292929',
  },
  itemName: {
    color: '#FFF',
    fontSize: 15,
    marginBottom: 5,
  },
  itemDetails: {
    color: '#fff',
    fontSize: 13,
  },
});

export default PlacesSearchScreen;
