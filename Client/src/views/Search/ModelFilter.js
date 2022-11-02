import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

import MultiSlider from '@ptomasroos/react-native-multi-slider';

import SelectList from 'react-native-dropdown-select-list';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const HeightDevice = Dimensions.get('window').height;
const WidthDevice = Dimensions.get('window').width;

const FilterSearch = ({modalVisible, setModalVisible}) => {
  const [multiSliderValue, setMultiSliderValue] = useState([0, 10000]);
  const multiSliderValuesChange = values => setMultiSliderValue(values);
  const [selected, setSelected] = useState('');

  const JustClick = () => {
    setSelected;
  };

  /*--------Animated-------//
  const animation = useSharedValue({marginTop: 0, opacity: 0, height: 180});
  const animationStyle = useAnimatedStyle(() => {
    return {
      marginTop: withTiming(animation.value.marginTop, {
        duration: 1500,
      }),
      opacity: withTiming(animation.value.opacity, {
        duration: 2000,
      }),
    };
  });
  const animationStyleContainer = useAnimatedStyle(() => {
    return {
      height: withTiming(animation.value.height, {
        duration: 1500,
      }),
    };
  });
  const ChangeSize = () => {
    animation.value = {marginTop: 125, opacity: 1, height: 280};
  };
  const ChangeSizePre = () => {
    animation.value = {marginTop: -125, opacity: 0, height: 180};
  };
  useEffect(() => {
    animationStyle;
    animationStyleContainer;
  }, []);
  //--------Animated-------*/
  const data = [
    {key: '1', value: 'Italy'},
    {key: '2', value: 'Indonesia'},
    {key: '3', value: 'ThaiLand'},
    {key: '4', value: 'Brazil'},
    {key: '5', value: 'Brazil'},
    {key: '6', value: 'Brazil'},
    {key: '7', value: 'Brazil'},
    {key: '8', value: 'Brazil'},
  ];
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
          }}>
          {/* Container */}
          <View
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: '#F8F8FF',
              marginTop: 150,
              borderTopStartRadius: 25,
              borderTopRightRadius: 25,
              flexDirection: 'column',
              alignItems: 'center',
              elevation: 8,
            }}>
            {/* Title */}
            <View
              style={{
                height: '8%',
                width: '80%',
                // backgroundColor: '#F0FFF0',
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
            {/* Range price */}
            <View
              style={{
                height: '6%',
                width: '80%',
                // backgroundColor: 'gray',
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
            {/* Slider container */}
            <View
              style={{
                height: '10%',
                width: '80%',
                // backgroundColor: 'gray',
                flexDirection: 'column',
              }}>
              {/* Number */}
              <View
                style={{
                  height: '30%',
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  // paddingHorizontal: 5,
                  // borderWidth: 1,
                  // borderColor: 'black',
                }}>
                <Text
                  style={{
                    fontFamily: 'Inter-Medium',
                    fontSize: 16,
                    color: 'black',
                  }}>
                  $ {multiSliderValue[0]}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Inter-Medium',
                    fontSize: 16,
                    color: 'black',
                  }}>
                  $ {multiSliderValue[1]}
                </Text>
              </View>
              {/* Slider */}
              <View
                style={{
                  height: '70%',
                  width: '100%',
                  // borderWidth: 1,
                  // borderColor: 'blue',
                  justifyContent: 'center',
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
                  sliderLength={280}
                  onValuesChange={multiSliderValuesChange}
                  min={0}
                  max={10000}
                  allowOverlap={false}
                  minMarkerOverlapDistance={10}
                />
              </View>
            </View>
            {/* END Slider container */}
            {/* Choose transports */}
            {/* tittle */}
            <View
              style={{
                height: '5%',
                width: '80%',
                // backgroundColor: 'blue',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Inter-Black',
                  color: 'black',
                }}>
                Location
              </Text>
            </View>
            {/* Transport */}
            <View
              style={{
                height: '20%',
                width: '80%',
                flexDirection: 'row',
                // borderColor: 'black',
                // borderWidth: 1,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  height: '100%',
                  width: '45%',
                  backgroundColor: '#F8F8FF',
                  borderRadius: 12,
                }}>
                <SelectList
                  setSelected={JustClick}
                  data={data}
                  search={false}
                  dropdownStyles={{
                    height: '60%',
                  }}
                  inputStyles={{
                    fontFamily: 'Inter-Regular',
                    color: 'black',
                  }}
                  dropdownTextStyles={{
                    fontFamily: 'Inter-Bold',
                    color: '#000080',
                  }}
                  boxStyles={{
                    zIndex: 10,
                  }}
                  placeholder="Country"
                  // defaultOption={{key: '0', value: 'Country'}} //default selected option
                />
              </View>
              <View
                style={{
                  height: '100%',
                  width: '45%',
                  backgroundColor: '#F8F8FF',
                  borderRadius: 12,
                }}></View>
            </View>
            {/* Choose transports */}
            {/* Members */}
            <View
              style={{
                height: '20%',
                width: '80%',
                // backgroundColor: 'gray',
                flexDirection: 'column',
              }}>
              {/* Title */}
              <View
                style={{
                  height: '25%',
                  width: '100%',
                  // backgroundColor: 'blue',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Inter-Black',
                    color: 'black',
                  }}>
                  Member
                </Text>
              </View>
              <View
                style={{
                  height: '70%',
                  width: '100%',
                  // backgroundColor: 'green',
                }}>
                {/* Container */}
                <View
                  style={{
                    height: '100%',
                    width: '60%',
                  }}>
                  <SelectList
                    // onSelect={() => console.log(selected)}
                    setSelected={setSelected}
                    data={data}
                    inputStyles={{
                      fontFamily: 'Inter-Regular',
                      color: 'black',
                    }}
                    dropdownStyles={{
                      height: '60%',
                    }}
                    dropdownTextStyles={{
                      fontFamily: 'Inter-Bold',
                      color: '#000080',
                    }}
                    boxStyles={{
                      zIndex: 10,
                    }}
                    search={false}
                    placeholder="City"
                    // defaultOption={{key: '0', value: 'City'}} //default selected option
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 30,
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
});

export default FilterSearch;
