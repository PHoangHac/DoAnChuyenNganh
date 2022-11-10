import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {icons} from '../../constants/index';
import {places} from '../../constants/dataDummy';
import FilterSearch from './ModelFilter';

const dataCountry = ['Italy', 'Philippines', 'Malaysia', 'Indonesia'];

const DropSearchDown = props => {
  const {dataSource} = props;
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
      {dataSource.length ? (
        dataSource.map((item, index) => {
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
                  style={{
                    color: 'black',
                    paddingHorizontal: 20,
                    fontSize: 20,
                    // backgroundColor: 'gray',
                  }}>
                  {item}
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

const Item = ({data}) => {
  // console.log(data);

  return (
    <View
      style={{
        height: 150,
        width: '90%',
        alignSelf: 'center',
        marginVertical: 10,
      }}>
      <TouchableOpacity
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
          source={data.image}
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
                width: '90%',
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
                style={{
                  padding: 5,
                  color: 'black',
                  fontFamily: 'Inter-Black',
                }}>
                {data.name}
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
                {data.location.country}
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
                $ {data.price}
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

const SearchItemScreen = () => {
  const [dataFilter, setDataFilter] = useState(places);
  // const [dataFilter2, setDataFilter2] = useState([]);
  const [searching, setSearching] = useState(false);
  const [filtered, setFiltered] = useState(dataSource);
  const [modalVisible, setModalVisible] = useState(false);
  const [textInputS, setTextInputS] = useState('');
  const [country, setCountry] = useState('');
  const [price, setPrice] = useState([]);
  const [dataSource] = useState([
    'apple',
    'banana',
    'cow',
    'dex',
    'zee',
    'orange',
    'air',
    'bottle',
  ]);

  let home = country;

  const onSearch = text => {
    if (text) {
      setTextInputS(text);
      setSearching(true);
      const temp = text.toLowerCase();

      const tempList = dataSource.filter(item => {
        if (item.match(temp)) return item;
      });
      setFiltered(tempList);
    } else {
      setSearching(false);
      setFiltered(dataSource);
    }
  };
  const renderItem = ({item}) => <Item data={item} />;

  const Reload = () => {
    setDataFilter(places);
    setCountry('');
    setPrice([]);
  };

  useEffect(() => {
    if (dataCountry.includes(home)) {
      const data = dataFilter.filter(function (creature) {
        return creature.location.country == home;
      });
      const dataNext = data;
      setDataFilter(dataNext);
    } else {
      setDataFilter(places);
      console.log('NO');
    }
  }, [home]);

  console.log(price);

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
          setCountry={setCountry}
          setPrice={setPrice}
          // onPressOut={SearchCountry}
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
              dataSource={filtered}
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
          <FlatList
            contentContainerStyle={{paddingBottom: 60}}
            data={dataFilter}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </View>
  );
};

export default SearchItemScreen;
