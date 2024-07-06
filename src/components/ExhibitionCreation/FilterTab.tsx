import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList, Dimensions} from 'react-native';
import FilterItem from './FilterItem';

import {useExhibitionCreationStore} from '../../store/exhibitionCreationStore';
import {getCreatedFilters, getPurchasedFilters} from 'src/apis/exhibitionCreate';
import {filterServiceToken} from 'src/utils/dummy';

const SCREEN_WIDTH = Dimensions.get('window').width;

const FilterTab = () => {
  const [activeTab, setActiveTab] = useState('내 필터');
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const {setCurrentFilterId, setCurrentFilterIdForAll} = useExhibitionCreationStore();

  // 초기 필터 목록 설정 및 상태 관리
  const [myFilters, setMyFilters] = useState([{filter_id: '0', filter_name: 'Original', filter_thumbnail_url: ''}]);

  const [purchasedFilters, setPurchasedFilters] = useState([
    {filter_id: '0', filter_name: 'Original', filter_thumbnail_url: ''},
  ]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const createdResults = await getCreatedFilters(filterServiceToken);
        if (createdResults && createdResults.payload && createdResults.payload.created_filter_list) {
          setMyFilters(currentFilters => [...currentFilters, ...createdResults.payload.created_filter_list]);
          console.log('Updated created filter list:', myFilters);
        }

        const purchasedResults = await getPurchasedFilters(filterServiceToken);
        if (purchasedResults && purchasedResults.payload && purchasedResults.payload.created_filter_list) {
          setPurchasedFilters(currentFilters => [...currentFilters, ...purchasedResults.payload.created_filter_list]);
          console.log('Updated purchased filter list:', purchasedFilters);
        }
      } catch (error) {
        console.log('Error fetching filters:', error);
      }
    };
    fetchFilters();
  }, []);

  const filters = activeTab === '내 필터' ? myFilters : purchasedFilters;

  const onPressFilter = (id: string) => {
    setSelectedFilter(id);
    setCurrentFilterId(id);
    setCurrentFilterIdForAll(id);
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
          keyExtractor={item => item.filter_id || item.filter_id}
          horizontal
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => onPressFilter(item.filter_id || item.filter_id)}>
              <FilterItem imageUri={item.filter_thumbnail_url} filterName={item.filter_name} />
              {selectedFilter === (item.filter_id || item.filter_id) && <View style={styles.selectedOverlay}></View>}
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
