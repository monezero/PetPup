/* eslint-disable react/jsx-filename-extension */
import { View, Text, FlatList } from 'react-native';
import { TextList, ViewList } from './style';

const SearchFilter = ({ data, input, setInput }) => {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          if (input === '') {
            return (
              <ViewList>
                <TextList>{item.name}</TextList>
              </ViewList>
            );
          }

          if (item.name.toLowerCase().includes(input.toLowerCase())) {
            return (
              <ViewList>
                <TextList>{item.name}</TextList>
              </ViewList>
            );
          }
        }}
      />
    </View>
  );
};

export default SearchFilter;
