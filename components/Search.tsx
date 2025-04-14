import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  StyleSheet,
} from 'react-native';
import { useDebouncedCallback } from 'use-debounce';
import { useLocalSearchParams, router, usePathname } from 'expo-router';
import Colors from '@/data/Colors';

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query || '');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const debouncedSearch = useDebouncedCallback((text: string) => {
    router.setParams({ query: text });
    performSearch(text);
  }, 500);

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  const performSearch = (query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image
          source={require('@/assets/images/search.png')}
          style={styles.searchIcon}
        />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for anything"
          style={styles.input}
        />
      </View>
      {searchResults.length > 0 && (
        <View style={styles.resultsContainer}>
          {searchResults.map((result, index) => (
            <TouchableOpacity
              key={index}
              style={styles.resultItem}
              onPress={() => {
                setSearch(result);
                router.setParams({ query: result });
                setSearchResults([]);
              }}
            >
              <Text style={styles.resultText}>{result}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
    marginTop: 30,
    paddingVertical: 6,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 50,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  input: {
    fontFamily: 'Rubik',
    fontSize: 14,
    color: '#4A4A4A',
    marginLeft: 8,
    flex: 1,
  },
  resultsContainer: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  resultText: {
    fontFamily: 'Rubik',
    fontSize: 14,
    color: '#000000',
  },
});
