import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import cancel from '@assets/icons/cancel_gray.png';
import {exhibitionTags, preferTags} from '@utils/tags';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {myFilterAddPreferTag, myFilterDeletePreferTag, putMyExhibitionPreferTag} from 'src/apis/mygallery';
import {SafeAreaView} from 'react-native-safe-area-context';

type tagForm = {
  id: number;
  tag_id?: string;
  title: string;
};

type tagItemProps = {
  item: tagForm;
  status: boolean[];
  setStatus: React.Dispatch<React.SetStateAction<boolean[]>>;
  setIndex?: React.Dispatch<React.SetStateAction<tagProp | undefined>>;
};

type tagProp = {
  tag_id: string;
  tag_name: string;
};

type propData = {
  data: tagProp[];
  fetch?: boolean;
  updateFetch?: (item: boolean) => void;
  label?: string;
};

function FilterPreferred({data, fetch, updateFetch, label}: propData) {
  const initial = Array(preferTags.length).fill(false);
  const [status, setStatus] = useState<boolean[]>(initial);
  const [index, setIndex] = useState<tagProp>();
  const [deleteI, setDelete] = useState<tagProp>();
  const [clickedIndex, setClickedIndex] = useState(false);
  const [filter, setFilter] = useState<tagForm[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data && label == 'filter') {
      const initialStatus = [...status];
      data.forEach((item: tagProp) => {
        const index = preferTags.findIndex(tag => tag.tag_id === item.tag_id);
        if (index !== -1) {
          initialStatus[index] = true;
        }
      });
      setStatus(initialStatus);
    }
  }, [data]);

  useEffect(() => {
    if (label == 'filter') {
      const newFilteredTags = preferTags.filter(item => status[item.id] === true);
      setFilter(newFilteredTags);
    }
  }, [status]);

  const mutationAddFilterPreferTag = useMutation({
    mutationFn: async (tag_id: string) => {
      return await myFilterAddPreferTag(tag_id);
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ['filter-tag'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const mutationDeleteFilterPreferTag = useMutation({
    mutationFn: async (tag_id: string) => {
      return await myFilterDeletePreferTag(tag_id);
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ['filter-tag'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const TagItem = ({item, status, setStatus}: tagItemProps) => {
    const {id, title, tag_id} = item;
    return (
      <TouchableOpacity
        onPress={() => {
          const newStatus = [...status];
          newStatus[id] = !newStatus[id];
          setStatus(newStatus);
          if (tag_id) {
            if (newStatus[id]) {
              mutationAddFilterPreferTag.mutate(tag_id);
            } else {
              mutationDeleteFilterPreferTag.mutate(tag_id);
            }
          }
        }}>
        {status[id] ? (
          <View style={styles.focusedTagBox}>
            <Text style={styles.focusedTagTitle}>{title}</Text>
          </View>
        ) : (
          <View style={styles.tagBox}>
            <Text style={styles.tagTitle}>{title}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const SelectedTagItem = ({item, status, setStatus}: tagItemProps) => {
    const {id, title, tag_id} = item;
    return (
      <View style={styles.selectedTag}>
        <Text style={styles.tagTitle}>{title}</Text>
        <TouchableOpacity
          onPress={() => {
            const newStatus = [...status];
            newStatus[id] = !newStatus[id];
            setStatus(newStatus);
            if (tag_id) {
              mutationDeleteFilterPreferTag.mutate(tag_id);
            }
          }}>
          <Image source={cancel} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.intro}>선호하는 태그를 10개 선택해주세요 (최대 10개)</Text>
      <View style={styles.tagContainer}>
        {preferTags.map((item, index) => (
          <TagItem key={index} item={item} status={status} setStatus={setStatus} />
        ))}
      </View>
      <Text style={[styles.intro, {marginTop: 50}]}>내가 선택한 태그</Text>
      <View style={styles.tagContainer}>
        {filter &&
          filter.map((item, index) => (
            <SelectedTagItem key={index} item={item} status={status} setStatus={setStatus} />
          ))}
      </View>
    </View>
  );
}

export default FilterPreferred;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
    marginBottom: 60,
  },
  intro: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.32,
  },
  tagBox: {
    borderRadius: 10,
    backgroundColor: '#414141',
    padding: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
  },
  focusedTagBox: {
    borderRadius: 10,
    backgroundColor: '#FFD600',
    padding: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
  },
  tagTitle: {
    color: '#F4F4F4',
    fontSize: 16,
    fontWeight: '500',
  },
  focusedTagTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
  tagContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 20,
  },
  selectedTag: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: 15,
    paddingLeft: 15,
    paddingRight: 11,
    backgroundColor: '#414141',
    padding: 15,
    borderRadius: 10,
    gap: 5,
  },
  icon: {
    width: 18,
    height: 18,
  },
});
