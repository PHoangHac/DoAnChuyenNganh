import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
// import SelectList from 'react-native-dropdown-select-list';
import {Dropdown} from 'react-native-element-dropdown';
// import SelectDropdown from 'react-native-select-dropdown';
import {icons} from '../../constants';

const HeightDevice = Dimensions.get('window').height;
const WidthDevice = Dimensions.get('window').width;
// const countries = [
//   'Egypt',
//   'Canada',
//   'Australia',
//   'Ireland',
//   'Brazil',
//   'England',
// ];
const data = [
  {label: 'Italy', value: '1'},
  {label: 'Philippines', value: '2'},
  {label: 'Malaysia', value: '3'},
  {label: 'Indonesia', value: '4'},
];

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Airplane',
    img: icons.airplaneicon,
    isChecked: false,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Bus',
    img: icons.busicon,
    isChecked: false,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Train',
    img: icons.tranicon,
    isChecked: false,
  },
  {
    id: '58694a0f-3da1-471f-bd96-j098j0-80sjs',
    title: 'Yacht',
    img: icons.shipicon,
    isChecked: false,
  },
];

const FilterSearch = ({
  modalVisible,
  setModalVisible,
  onPress,
  setCountry,
  setPrice,
  // onPressOut,
}) => {
  const [multiSliderValue, setMultiSliderValue] = useState([0, 10000]);
  const multiSliderValuesChange = values => setMultiSliderValue(values);
  const [value, setValue] = useState(null);
  const [label, setLabel] = useState(null);
  const [products, setProducts] = useState(DATA);

  // console.log(label);

  const handleChange = id => {
    let temp = products.map(product => {
      if (id === product.id) {
        return {...product, isChecked: !product.isChecked};
      }
      return product;
    });
    setProducts(temp);
  };

  const OffPopUp = () => {
    setModalVisible(!modalVisible);
    setCountry(label);
    setPrice(multiSliderValue);
  };

  const renderItem = ({item}) => {
    return (
      <Item
        onPress={() => {
          handleChange(item.id);
        }}
        data={item}
      />
    );
  };

  const Item = ({data, onPress}) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: data.isChecked ? 'white' : '#E6E6FA',
          padding: 20,
          // marginVertical: 8,
          marginHorizontal: 8,
          borderWidth: 1.5,
          borderRadius: 16,
          borderColor: data.isChecked ? 'black' : '#F8F8FF',
        }}
        onPress={onPress}>
        <Image
          style={{
            height: 30,
            width: 30,
          }}
          source={data.img}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            height: HeightDevice,
            width: WidthDevice,
            // backgroundColor: 'black',
          }}>
          {/* Vertical */}
          <ScrollView
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: '#F8F8FF',
              marginTop: 150,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              // elevation: 8,
              // paddingBottom: 80,
              // marginBottom: 50,
            }}
            showsVerticalScrollIndicator={false}>
            {/* Container */}
            <View
              style={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
              }}>
              {/* Title */}
              <View
                style={{
                  height: 70,
                  width: '90%',
                  // backgroundColor: 'gray',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Inter-Black',
                    color: 'black',
                  }}>
                  Filter your search
                </Text>
              </View>
              {/* End Title */}

              {/* BTN */}
              <View
                style={{
                  height: 45,
                  width: '90%',
                  // backgroundColor: 'gray',
                  // alignSelf: 'flex-start',
                }}>
                <TouchableOpacity
                  style={{
                    height: '100%',
                    width: '40%',
                    backgroundColor: '#000080',
                    borderRadius: 15,
                  }}
                  onPress={onPress}
                  onPressOut={OffPopUp}>
                  <Text
                    style={{
                      fontFamily: 'Inter-SemiBold',
                      color: 'white',
                      padding: 8,
                      fontSize: 16,
                      alignSelf: 'center',
                    }}>
                    Reset Filter
                  </Text>
                </TouchableOpacity>
              </View>
              {/* End BTN */}

              {/* Range price */}
              <View
                style={{
                  height: 50,
                  width: '90%',
                  // backgroundColor: 'yellow',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Inter-Black',
                    color: 'black',
                  }}>
                  Range price
                </Text>
              </View>
              {/* Slider price */}
              <View
                style={{
                  height: 120,
                  width: '90%',
                  // backgroundColor: 'gray',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}>
                {/* label price */}
                <View
                  style={{
                    height: '50%',
                    width: '100%',
                    // backgroundColor: 'blue',
                    flexDirection: 'row',
                  }}>
                  {/* Min */}
                  <View
                    style={{
                      height: '100%',
                      width: '50%',
                      justifyContent: 'center',
                      // backgroundColor: 'green',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Inter-Medium',
                        fontSize: 16,
                        color: 'black',
                        borderRadius: 12,
                        borderColor: 'black',
                        borderWidth: 1,
                        width: '50%',
                        padding: 3,
                      }}>
                      $ {multiSliderValue[0]}
                    </Text>
                  </View>
                  {/* Max */}
                  <View
                    style={{
                      height: '100%',
                      width: '50%',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Inter-Medium',
                        fontSize: 16,
                        color: 'black',
                        borderRadius: 12,
                        borderColor: 'black',
                        borderWidth: 1,
                        width: '50%',
                        alignSelf: 'flex-end',
                        padding: 3,
                      }}>
                      $ {multiSliderValue[1]}
                    </Text>
                  </View>
                </View>
                {/* slider */}
                <View
                  style={{
                    height: '50%',
                    width: '100%',
                    // backgroundColor: 'orange',
                    alignItems: 'center',
                  }}>
                  <MultiSlider
                    markerStyle={{
                      ...Platform.select({
                        ios: {
                          height: 30,
                          width: 30,
                          shadowColor: '#000000',
                          shadowOffset: {
                            width: 0,
                            height: 3,
                          },
                          shadowRadius: 1,
                          shadowOpacity: 0.1,
                        },
                        android: {
                          height: 30,
                          width: 30,
                          // borderRadius: 50,
                          backgroundColor: '#00008B',
                        },
                      }),
                    }}
                    pressedMarkerStyle={{
                      ...Platform.select({
                        android: {
                          height: 30,
                          width: 30,
                          borderRadius: 20,
                          backgroundColor: '#87CEEB',
                        },
                      }),
                    }}
                    selectedStyle={{
                      backgroundColor: '#00008B',
                    }}
                    trackStyle={{
                      backgroundColor: '#CECECE',
                    }}
                    touchDimensions={{
                      height: 40,
                      width: 40,
                      borderRadius: 20,
                      slipDisplacement: 40,
                    }}
                    values={[multiSliderValue[0], multiSliderValue[1]]}
                    sliderLength={320}
                    onValuesChange={multiSliderValuesChange}
                    min={0}
                    max={10000}
                    allowOverlap={false}
                    minMarkerOverlapDistance={10}
                  />
                </View>
              </View>

              {/* Label choose location */}
              <View
                style={{
                  height: 50,
                  width: '90%',
                  // backgroundColor: 'yellow',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Inter-Black',
                    color: 'black',
                  }}>
                  Country
                </Text>
              </View>

              {/* Location */}
              <View
                style={{
                  height: 50,
                  width: '90%',
                  // backgroundColor: 'gray',
                  // borderColor: 'black',
                  // borderWidth: 1,
                  // borderRadius: 12,
                  justifyContent: 'center',
                }}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  search={false}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={'Select item'}
                  // searchPlaceholder="Search..."
                  value={value}
                  onChange={item => {
                    setValue(item.value);
                    setLabel(item.label);
                  }}
                />
              </View>
              {/* End Location */}

              {/* Transport */}
              <View
                style={{
                  height: 55,
                  width: '90%',
                  // backgroundColor: 'yellow',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Inter-Black',
                    color: 'black',
                  }}>
                  Types of transport
                </Text>
              </View>

              <View
                style={{
                  height: 100,
                  width: '90%',
                  // backgroundColor: 'yellow',
                  justifyContent: 'center',
                }}>
                <ScrollView nestedScrollEnabled={true}>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={products}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                  />
                </ScrollView>
              </View>
              {/* End Transport */}

              <View
                style={{
                  height: 100,
                  width: '30%',
                  // backgroundColor: 'yellow',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  // onPress={onPressOut}
                  onPressOut={OffPopUp}>
                  <Text style={styles.textStyle}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Container */}
          </ScrollView>
          {/* End Vertical */}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    // marginTop: 30,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default FilterSearch;
