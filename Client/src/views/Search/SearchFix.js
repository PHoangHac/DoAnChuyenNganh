import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import {icons, images} from '../../constants/index';
// import {places} from '../../constants/dataDummy';
import FilterSearch from './ModelFilter';
import {URL} from '../../context/config';
import axios from 'axios';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const DropSearchDown = props => {
  const {Yeh} = props;
  return (
    <View
      style={{
        // backgroundColor: 'blue',
        // paddingTop: 10,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
        width: '95%',
        alignSelf: 'center',
      }}>
      {Yeh.length ? (
        Yeh.map((item, index) => {
          // console.log(item.slice(0, 1));
          // let idTour = parseInt(item.slice(0, 1));
          return (
            <View
              style={{
                // marginHorizontal: '10%',
                // backgroundColor: 'blue',
                height: 50,
                width: '100%',
                justifyContent: 'center',
                // borderBottomWidth: 0.5,
                // borderBottomColor: '#CCCCCC',
              }}
              key={index}>
              <TouchableOpacity>
                <Text
                  numberOfLines={1}
                  style={{
                    color: 'black',
                    paddingHorizontal: 20,
                    fontSize: 20,
                    // backgroundColor: 'gray',
                  }}>
                  {item.slice(2, 100)}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })
      ) : (
        <View
          style={{
            backgroundColor: 'white',
            alignSelf: 'center',
            // margin: 20,
            height: 120,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            borderRadius: 8,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            No search items matched
          </Text>
        </View>
      )}
    </View>
  );
};

const Item = ({data, navigation}) => {
  const pic = JSON.parse(data.images);

  // console.log(data.NameTour.length);

  return (
    <View
      style={{
        height: 150,
        width: '90%',
        alignSelf: 'center',
        marginVertical: 10,
      }}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DetailsScreen2', {
            id: data.id,
            images: data.images,
          })
        }
        style={{
          height: '100%',
          width: '100%',
        }}>
        <Image
          style={{
            height: '100%',
            width: '100%',
            borderRadius: 15,
          }}
          source={
            pic.length === 0 ? images.NotFoundImg : {uri: `${URL}/${pic[0]}`}
          }
        />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}>
          <View
            style={{
              height: '100%',
              width: '80%',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              // backgroundColor: 'yellow',
              paddingLeft: 10,
            }}>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 15,
                width: '100%',
                flexDirection: 'row',
              }}>
              <Image
                style={{
                  height: 22,
                  width: 22,
                  alignSelf: 'center',
                  marginLeft: 5,
                }}
                source={icons.SignPostIcon}
              />
              <Text
                numberOfLines={1}
                style={{
                  padding: 5,
                  fontSize: data.NameTour.length > 25 ? 12 : 14,
                  color: 'black',
                  fontFamily: 'Inter-Black',
                }}>
                {data.NameTour}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 15,
                width: '60%',
                flexDirection: 'row',
              }}>
              <Image
                style={{
                  height: 22,
                  width: 22,
                  alignSelf: 'center',
                  marginLeft: 5,
                }}
                source={icons.locationicon}
              />
              <Text
                style={{
                  padding: 5,
                  color: 'black',
                  fontFamily: 'Inter-Black',
                }}>
                {data.Location.country}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                width: '40%',
                borderRadius: 15,
              }}>
              {StarIcons.map((icon, index) => (
                <View
                  style={{
                    padding: 4,
                    paddingLeft: 5,
                  }}
                  key={index}>
                  {icon}
                </View>
              ))}
            </View>
          </View>
          <View
            style={{
              height: '100%',
              width: '25%',
              // backgroundColor: 'blue',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                top: 120,
                borderRadius: 15,
                right: 25,
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: 'black',
                  fontFamily: 'Inter-Bold',
                }}>
                $ {data.PricePerson}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const StarIcons = [
  <Image style={{height: 12, width: 12}} source={icons.staricon} />,
  <Image style={{height: 12, width: 12}} source={icons.staricon} />,
  <Image style={{height: 12, width: 12}} source={icons.staricon} />,
  <Image style={{height: 12, width: 12}} source={icons.staricon} />,
  <Image style={{height: 12, width: 12}} source={icons.staricon} />,
];

const SearchItemScreen = ({navigation}) => {
  const [dataFilter, setDataFilter] = useState([]);
  // -----Search textInput----//
  const [modalVisible, setModalVisible] = useState(false);
  const [textInputS, setTextInputS] = useState('');
  const [resultsFound, setResultsFound] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([0, 10000]);
  const [selectedTransPost, setSelectedTransPost] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  // -----Search textInput----//
  const [searching, setSearching] = useState(false);
  const [filtered, setFiltered] = useState(Yeh);
  // const [dataSource] = useState(Yeh);

  const Yeh = dataFilter.map((item, index) => {
    return `${index}: ${item.NameTour}`;
  });

  // console.log(Yeh);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    Reload();
    FilterTour();
    wait(1500).then(() => setRefreshing(false));
  }, []);

  const ListTour = () => {
    fetch(`${URL}/tour/GetAll`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => setDataFilter(json))
      .catch(err => console.error(err));
  };

  //-------Filter Search------//
  const onSearch = text => {
    if (text) {
      setTextInputS(text);
      setSearching(true);
      const temp = text.toLowerCase().toUpperCase();

      const tempList = Yeh.filter(item => {
        if (item.match(temp)) return item;
      });
      setFiltered(tempList);
    } else {
      setSearching(false);
      setFiltered(Yeh);
    }
  };
  const renderItem = ({item}) => <Item navigation={navigation} data={item} />;
  //-------Filter Search------//

  const Reload = () => {
    setDataFilter(dataFilter);
    setSelectedCountry(null);
    setSelectedPrice([0, 10000]);
    setSelectedTransPost([]);
  };

  //-------Filter-----//
  const handleSelectCountry = value =>
    !value ? null : setSelectedCountry(value);

  const handleFilterPrice = value => {
    setSelectedPrice(value);
  };

  const handleFilterTransPost = value => {
    setSelectedTransPost(value);
  };

  const FilterTour = useCallback(async () => {
    let Tour = await axios.get(`${URL}/tour/GetAll`);
    let Result = Tour.data;

    // const myValues = Object.keys(Result).map(key => Result[key]);

    // console.log(myValues);

    // price filter
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];
    Result = Result.filter(
      item => item.PricePerson >= minPrice && item.PricePerson <= maxPrice,
    ).map(item => item);

    //Country filter
    if (selectedCountry === null) {
    } else {
      Result = Result.filter(
        item => item.Location.country === selectedCountry,
      ).map(item => item);
    }

    //TransPost Filter
    if (selectedTransPost.length === 0) {
    } else {
      Result = Result.filter(
        item =>
          item.TypeOfTransport.nameTransport === selectedTransPost[0] ||
          item.TypeOfTransport.nameTransport === selectedTransPost[1] ||
          item.TypeOfTransport.nameTransport === selectedTransPost[2] ||
          item.TypeOfTransport.nameTransport === selectedTransPost[3],
      );
    }

    //Rating filter
    // if (selectedRating) {
    //   Result = Result.filter(
    //     (item) => parseInt(item.rating) === parseInt(selectedRating)
    //   );
    // }

    setDataFilter(Result);

    !Result.length ? setResultsFound(false) : setResultsFound(true);
  }, [selectedCountry, selectedPrice, selectedTransPost]);

  useEffect(() => {
    FilterTour();
    // ListTour();
  }, [FilterTour, selectedCountry, selectedPrice, selectedTransPost]);

  return (
    <View
      style={{
        flex: 100,
        backgroundColor: 'white',
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}>
      {/* Header */}
      <View
        style={{
          // borderRadius: 20,
          marginTop: -22,
        }}>
        <FilterSearch
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onPress={Reload}
          setSelectedCountry={handleSelectCountry}
          handleFilterPrice={handleFilterPrice}
          handleFilterTransPost={handleFilterTransPost}
          dataFilter={dataFilter}
        />
      </View>
      <View
        style={{
          flex: 10,
          // borderRadius: 20,
        }}>
        {/* Container */}
        <View
          style={{
            height: '100%',
            width: '100%',
            flexDirection: 'row',
            backgroundColor: '#00008B',
            borderRadius: 15,
          }}>
          <View
            style={{
              height: '100%',
              width: '80%',
              justifyContent: 'center',
              marginLeft: 15,
            }}>
            <Image
              style={{
                height: 30,
                width: 30,
                position: 'absolute',
                tintColor: 'white',
                marginLeft: 10,
              }}
              source={icons.searchicon}
            />
            <TouchableOpacity
              style={{
                borderColor: 'white',
                borderWidth: 1,
                borderRadius: 12,
              }}>
              <TextInput
                onChangeText={onSearch}
                placeholder="Search in here...."
                placeholderTextColor="white"
                defaultValue={textInputS}
                style={{
                  color: 'white',
                  paddingLeft: 45,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 0,
              }}
              onPress={() => {
                setSearching(false);
                setTextInputS('');
              }}
              // onPress={SearchCountry}
            >
              <Image
                style={{
                  height: 25,
                  width: 25,
                  tintColor: 'white',
                  marginRight: 10,
                }}
                source={icons.RemoveIcon}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: '100%',
              width: '20%',
              justifyContent: 'center',
              marginLeft: 15,
            }}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}>
              <Image
                style={{
                  height: 32,
                  width: 32,
                  tintColor: 'white',
                }}
                source={icons.filtercon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* popup */}
        <View
          style={{
            position: 'absolute',
            // height: 500,
            width: '100%',
            top: 79.5,
            // backgroundColor: '#00BFFF',
            zIndex: 10,
          }}>
          {searching && (
            <DropSearchDown
              onPress={() => setSearching(false)}
              Yeh={filtered}
              navigation={navigation}
            />
          )}
        </View>
        {/* End popup */}
      </View>
      {/* End Header */}
      <View
        style={{
          flex: 90,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            height: '100%',
            width: '100%',
          }}>
          {resultsFound === true ? (
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              contentContainerStyle={{paddingBottom: 60}}
              data={dataFilter}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          ) : (
            <View
              style={{
                height: '90%',
                width: '100%',
                // backgroundColor: 'gray',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Inter-Black',
                  fontSize: 24,
                  color: 'black',
                }}>
                Not Found !
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default SearchItemScreen;
