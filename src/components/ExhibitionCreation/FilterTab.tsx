import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList, Dimensions} from 'react-native';
import FilterItem from './FilterItem';
import filterImg1 from '@assets/imgs/filter-cover1.png';
import filterImg2 from '@assets/imgs/filter-cover2.png';
import filterImg3 from '@assets/imgs/filter-cover3.png';
import {useExhibitionCreationStore} from '../../store/exhibitionCreationStore';

const SCREEN_WIDTH = Dimensions.get('window').width;

const FilterTab = () => {
  const [activeTab, setActiveTab] = useState('내 필터');
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const {setCurrentFilterId} = useExhibitionCreationStore();

  const myFilters = [
    {id: '0', name: 'Original', imageUri: filterImg1},
    {id: 'd20e2654-3c4a-4ebe-b1c9-5695ac2a6207', name: '따뜻한', imageUri: filterImg3},
    {id: 'fe96c294-b5f3-425e-a6de-8cc1b13beb5a', name: '부드러운', imageUri: filterImg2},
    {id: '118ccbfb-8caf-498b-913a-16a315b3a859', name: '평화로운', imageUri: filterImg1},
  ];

  const purchasedFilters = [
    {id: '4a0db2eb-f4bc-4fa3-ae47-8381ed0da1ab', name: '차가운', imageUri: filterImg2},
    {id: 'ae4a3cee-f7e3-48a1-8b0a-eb4d177b2267', name: '세련된', imageUri: filterImg1},
  ];

  const filters = activeTab === '내 필터' ? myFilters : purchasedFilters;

  const onPressFilter = (id: string) => {
    setSelectedFilter(id);
    setCurrentFilterId(id);
  };

  return (
    <View style={styles.container}>
      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('내 필터')}>
          <Text style={[styles.tabText, activeTab === '내 필터' && styles.activeTabText]}>내 필터</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('구매한 필터')}>
          <Text style={[styles.tabText, activeTab === '구매한 필터' && styles.activeTabText]}>구매한 필터</Text>
        </TouchableOpacity>
      </View>

      {/* Filters FlatList */}
      <View style={styles.flatListContent}>
        <FlatList
          data={filters}
          keyExtractor={item => item.id}
          horizontal
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => onPressFilter(item.id)}>
              <FilterItem imageUri={item.imageUri} filterName={item.name} />
              {selectedFilter === item.id && <View style={styles.selectedOverlay}></View>}
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: (SCREEN_WIDTH - 40) * 0.1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  tab: {
    marginRight: 20,
  },
  tabText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  activeTabText: {
    color: '#FFD600',
    fontWeight: 'bold',
  },
  flatListContent: {
    padding: 10,
    gap: 10,
  },
  selectedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 15,
  },
});

export default FilterTab;
