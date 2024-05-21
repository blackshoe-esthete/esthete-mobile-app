import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import FilterItem from './FilterItem';
import filterImg1 from '@assets/imgs/filter-cover1.png';
import filterImg2 from '@assets/imgs/filter-cover2.png';
import filterImg3 from '@assets/imgs/filter-cover3.png';

const FilterTab = () => {
  const [activeTab, setActiveTab] = useState('내 필터');
  const [selectedFilter, setSelectedFilter] = useState<string>('');

  const myFilters = [
    {id: '0', name: 'Original', imageUri: filterImg1},
    {id: '1', name: '필터 1', imageUri: filterImg3},
    {id: '2', name: '필터 2', imageUri: filterImg2},
    {id: '3', name: '필터 3', imageUri: filterImg1},
  ];

  const purchasedFilters = [
    {id: '4', name: '필터 4', imageUri: filterImg2},
    {id: '5', name: '필터 5', imageUri: filterImg1},
  ];

  const filters = activeTab === '내 필터' ? myFilters : purchasedFilters;

  const onPressFilter = (id: string) => {
    setSelectedFilter(id);
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
    paddingTop: 50,
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
