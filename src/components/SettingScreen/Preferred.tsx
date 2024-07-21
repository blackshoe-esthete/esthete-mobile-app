import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import cancel from '@assets/icons/cancel_gray.png';
import {exhibitionTags, preferTags} from '@utils/tags';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {putMyExhibitionPreferTag} from 'src/apis/mygallery';
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
};

const TagItem = ({item, status, setStatus}: tagItemProps) => {
  const {id, title} = item;
  return (
    <TouchableOpacity
      onPress={() => {
        const newStatus = [...status];
        newStatus[id] = !newStatus[id];
        setStatus(newStatus);
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
  const {id, title} = item;
  return (
    <View style={styles.selectedTag}>
      <Text style={styles.tagTitle}>{title}</Text>
      <TouchableOpacity
        onPress={() => {
          const newStatus = [...status];
          newStatus[id] = !newStatus[id];
          setStatus(newStatus);
        }}>
        <Image source={cancel} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

type propData = {
  data: string[];
  fetch?: boolean;
  updateFetch?: (item: boolean) => void;
  label?: string;
};

function Preferred({data, fetch, updateFetch, label}: propData) {
  const initial = Array(preferTags.length).fill(false);
  const [status, setStatus] = useState<boolean[]>(initial);
  const [filter, setFilter] = useState<tagForm[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data && label == 'filter') {
      const initialStatus = [...status];
      data.forEach((item: string) => {
        const index = preferTags.findIndex(tag => tag.tag_id === item);
        if (index !== -1) {
          initialStatus[index] = true;
        }
      });
      setStatus(initialStatus);
    }
    if (data && label == 'exhibition') {
      const initialStatus = [...status];
      data.forEach((item: string) => {
        const index = exhibitionTags.findIndex(tag => tag.title === item);
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
    if (label == 'exhibition') {
      const newFilteredTags = exhibitionTags.filter(item => status[item.id] === true);
      setFilter(newFilteredTags);
    }
  }, [status]);

  const mutationExhibitionTag = useMutation({
    mutationFn: async () => {
      let tag_list: string[] = [];
      filter.forEach(item => {
        if (item.title) {
          tag_list.push(item.title);
        }
      });
      return await putMyExhibitionPreferTag(tag_list);
    },
    onSuccess(data) {
      console.log(data);
      queryClient.invalidateQueries({queryKey: ['exhibition-tag']});
      if (updateFetch) {
        updateFetch(false);
      }
    },
    onError(data) {
      console.log(data);
    },
  });

  useEffect(() => {
    if (fetch) {
      mutationExhibitionTag.mutate();
    }
  }, [fetch]);

  const initialData = () => {
    if (label == 'filter') {
      return (
        <>
          {preferTags.map((item, index) => (
            <TagItem key={index} item={item} status={status} setStatus={setStatus} />
          ))}
        </>
      );
    }else if(label == 'exhibition'){
      return (
        <>
          {exhibitionTags.map((item, index) => (
            <TagItem key={index} item={item} status={status} setStatus={setStatus} />
          ))}
        </>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.intro}>선호하는 태그를 10개 선택해주세요 (최대 10개)</Text>
      <View style={styles.tagContainer}>
        {initialData()}
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

export default Preferred;

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
