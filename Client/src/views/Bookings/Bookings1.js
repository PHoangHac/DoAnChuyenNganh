// import React
import React, {useState} from 'react';

// import core component
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

import DeviceInfo from 'react-native-device-info';

// import icons, images
import {icons, images} from '../../constants/index';

//import DatePicker from the package we installed
import DateTimePicker from '@react-native-community/datetimepicker';

// Innit 2 variable get value height and wight of device
const WIGHTDEVICE = Dimensions.get('window').width;
const HEIGHTDEVICE = Dimensions.get('window').height;

const BookingScreen2 = ({navigation}) => {
  // Khởi tạo trạng thái
  const [numberA, setNumberA] = useState(1);
  const [numberC, setNumberC] = useState(1);

  const [money, setMoney] = useState(200);

  // Hàm thay tăng số lượng người lớn
  const IncreaseAdult = () => {
    setNumberA(numberA + 1);
  };

  // Hàm thay giảm số lượng người lớn
  const DecreaseAdult = () => {
    if (numberA <= 0) {
      alert('Please choose a number greater than 0!');
    } else {
      setNumberA(numberA - 1);
    }
  };

  // Hàm thay tăng số lượng trẻ em

  const IncreaseChildren = () => {
    setNumberC(numberC + 1);
  };

  // Hàm thay giảm số lượng trẻ em
  const DecreaseChildren = () => {
    if (numberC <= 0) {
      alert('Please choose a number greater than 0!');
    } else {
      setNumberC(numberC - 1);
    }
  };

  // Khởi tạo trạng thái là ngày và thời gian hiện tại
  const [date, setDate] = useState(new Date());
  // Khởi tạo trạng thái : date -> ngày tháng năm , time -> giờ phút giây
  const [mode, setMode] = useState('date');
  // Khởi tạo trạng thái kiểu boolean: true/ false -> đóng mở chọn lịch và chọn giờ
  const [show, setShow] = useState(false);

  // Kiểm tra là ngày hiện tại hay là ngày được chọn
  const [chooseDate, setChooseDate] = useState(false);

  // Khởi tạo hai trạng thái dạng chuỗi(String) xuất ra thông tin chọn
  const [textDate, setTextDate] = useState('empty');
  const [textTime, setTextTime] = useState('empty');

  //Arrow function thay đổi dựa trên sự kiện click
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);

    // Khởi tạo biến tempDate gán cho ngày đã được chọn
    const tempDate = new Date(currentDate);

    // Khởi tạo biến hiển thị ra định dạng(ngày\tháng\năm)
    const formatDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();

    // Khởi tạo biến hiển thị ra định dạng(giờ\phút\giây)
    const fotmaTime = tempDate.getHours() + ':' + tempDate.getMinutes();

    //Gán lại các biến cho trạng thái
    setTextDate(formatDate);
    setTextTime(fotmaTime);

    setChooseDate(true);
  };

  // Hàm thay đổi chế độ chọn: date
  const showDatepicker = () => {
    showMode('date');
  };

  // Hàm thay đổi chế độ chọn: time
  const showTimepicker = () => {
    showMode('time');
  };

  // Hiển thị lên trạng người dùng chọn
  const showMode = currentMode => {
    // ???????
    if (Platform.OS === 'android') {
      setShow(true);
      // for iOS, add a button that closes the picker
    }
    // gán lại
    setMode(currentMode);
  };

  //=======================================
  const currentDate = new Date();
  // Khởi tạo biến hiển thị ra định dạng(ngày\tháng\năm)
  const formatDate =
    currentDate.getDate() +
    '/' +
    (currentDate.getMonth() + 1) +
    '/' +
    currentDate.getFullYear();
  // Khởi tạo biến hiển thị ra định dạng(giờ\phút\giây)
  const fotmaTime = currentDate.getHours() + ':' + currentDate.getMinutes();
  //=======================================

  // Check thuong hieu nha san xuat
  const appName = DeviceInfo.getBrand();

  // if (appName == 'Redmi') {
  //   console.log('Chieu dai:' + HEIGHTDEVICE, 'Chieu rong' + WIGHTDEVICE);
  // } else if (appName == 'google') {
  //   console.log('Chieu dai:' + HEIGHTDEVICE, 'Chieu rong' + WIGHTDEVICE);
  // }

  // console.log('Chieu dai:' + HEIGHTDEVICE, 'Chieu rong' + WIGHTDEVICE);

  return (
    // Container
    <View
      style={{
        flex: 100,
        backgroundColor: '#ffffff',
      }}>
      {/* Header */}
      <View
        style={{
          flex: 10,
          borderWidth: 1,
          borderColor: 'black',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* Header Container */}
        <View
          style={{
            flexDirection: 'row',
            width: '95%',
            justifyContent: 'space-between',
            // backgroundColor: 'gray',
          }}>
          <TouchableOpacity
            style={{
              borderWidth: 0.5,
              borderColor: 'black',
              borderRadius: 10,
              //   marginLeft: 20,
            }}
            onPress={() => navigation.goBack()}>
            <Image
              style={{
                height: 40,
                width: 40,
              }}
              source={icons.ArrowBackIcon}
            />
          </TouchableOpacity>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 20,
              fontFamily: 'Inter-Bold',
              color: 'black',
              //   marginRight: 130,
            }}>
            Details Booking
          </Text>
        </View>
      </View>
      {/* END Header */}
      {/* Body */}
      <View
        style={{
          flex: 90,
        }}>
        <ScrollView
          style={{
            height: '100%',
            width: '100%',
          }}>
          {/* Container */}
          <View
            style={{
              height: '100%',
              width: '100%',
              alignItems: 'center',
            }}>
            {/* Each Item of scroll view*/}

            {/* Header */}
            <View
              style={{
                // backgroundColor: 'gray',
                height: HEIGHTDEVICE / 4,
                width: WIGHTDEVICE,
                justifyContent: 'center',
                alignItems: 'center',
                // borderWidth: 0.5,
                // borderColor: 'black',
              }}>
              <Image
                style={{
                  height: 200,
                  width: 200,
                }}
                resizeMode="cover"
                source={icons.planeicketicon}
              />
            </View>
            {/* END Header */}
            {/* choose day start */}
            <View
              style={{
                height: HEIGHTDEVICE / 14,
                width:
                  appName == 'Redmi' ? WIGHTDEVICE / 1.5 : WIGHTDEVICE / 1.75,
                marginTop: 5,
                justifyContent: 'center',
                // alignItems: 'center',
                // borderWidth: 0.5,
                // borderColor: 'black',
              }}>
              {/* Container date picker */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                {/* Text */}
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'black',
                      fontFamily: 'Inter-SemiBold',
                    }}>
                    Depart:
                  </Text>
                </View>
                {/* Date */}
                <View
                  style={
                    {
                      // justifyContent: 'center',
                    }
                  }>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      borderWidth: 1,
                      borderColor: 'black',
                      borderRadius: 12,
                    }}
                    onPress={showTimepicker}>
                    <Image
                      style={{
                        height: 30,
                        width: 30,
                        marginLeft: 8,
                        alignSelf: 'center',
                      }}
                      source={icons.calendaricon}
                    />
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 16,
                        fontWeight: '600',
                        padding: 8,
                      }}>
                      {chooseDate == true ? textDate : formatDate}
                    </Text>
                  </TouchableOpacity>
                  {/* POPUP calendar or clock */}
                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode={mode}
                      is24Hour={true}
                      onChange={onChange}
                    />
                  )}
                </View>
              </View>
              {/* END Container date picker*/}
            </View>
            {/* END choose day start */}

            {/* Choose number guest */}
            <View
              style={{
                height:
                  appName == 'Redmi' ? HEIGHTDEVICE / 4 : HEIGHTDEVICE / 4.4,
                width: WIGHTDEVICE / 1.15,
                marginTop: 5,
                // justifyContent: 'center',
                // alignItems: 'center',
                // borderWidth: 0.5,
                // borderColor: 'black',
              }}>
              {/* Guest container */}
              <View
                style={{
                  flexDirection: 'column',
                  height: '100%',
                  width: '100%',
                  justifyContent: 'space-between',
                }}>
                {/* title */}
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#1B202C',
                      fontFamily: 'Inter-SemiBold',
                    }}>
                    Guests
                  </Text>
                </View>
                {/* Adult */}
                <View
                  style={{
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderColor: 'black',
                    justifyContent: 'space-between',
                    borderRadius: 12,
                  }}>
                  {/* Name */}
                  <View
                    style={{
                      flexDirection: 'column',
                      paddingLeft: 10,
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'black',
                        fontFamily: 'Inter-Medium',
                      }}>
                      Adult
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Inter-Relugar',
                        color: '#551613',
                      }}>
                      More than 12 years old
                    </Text>
                  </View>
                  {/* number */}
                  <View
                    style={{
                      flexDirection: 'row',
                      // borderWidth: 0.5,
                      // borderColor: 'black',
                      alignSelf: 'center',
                      paddingRight: 10,
                    }}>
                    <TouchableOpacity onPress={DecreaseAdult}>
                      <Image
                        style={{
                          height: 30,
                          width: 30,
                        }}
                        source={icons.additionicon}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 18,
                        color: 'black',
                        marginHorizontal: 5,
                      }}>
                      {numberA}
                    </Text>
                    <TouchableOpacity onPress={IncreaseAdult}>
                      <Image
                        style={{
                          height: 30,
                          width: 30,
                        }}
                        source={icons.substractionicon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {/* Children */}
                <View
                  style={{
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderColor: 'black',
                    justifyContent: 'space-between',
                    borderRadius: 12,
                  }}>
                  {/* Name */}
                  <View
                    style={{
                      flexDirection: 'column',
                      paddingLeft: 10,
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'black',
                        fontFamily: 'Inter-Medium',
                      }}>
                      Children
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Inter-Relugar',
                        color: '#551613',
                      }}>
                      Between 5 - 11 year old
                    </Text>
                  </View>
                  {/* number */}
                  <View
                    style={{
                      flexDirection: 'row',
                      // borderWidth: 0.5,
                      // borderColor: 'black',
                      alignSelf: 'center',
                      paddingRight: 10,
                    }}>
                    <TouchableOpacity onPress={DecreaseChildren}>
                      <Image
                        style={{
                          height: 30,
                          width: 30,
                        }}
                        source={icons.additionicon}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 18,
                        color: 'black',
                        marginHorizontal: 5,
                      }}>
                      {numberC}
                    </Text>
                    <TouchableOpacity onPress={IncreaseChildren}>
                      <Image
                        style={{
                          height: 30,
                          width: 30,
                        }}
                        source={icons.substractionicon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            {/* END Choose number guest */}

            {/* Payment Summary */}
            <View
              style={{
                height:
                  appName == 'Redmi' ? HEIGHTDEVICE / 4 : HEIGHTDEVICE / 4.4,
                width: WIGHTDEVICE / 1.15,
                marginTop: 5,
                // justifyContent: 'center',
                // alignItems: 'center',
                // borderWidth: 0.5,
                // borderColor: 'black',
              }}>
              {/* Summary container */}
              <View
                style={{
                  flexDirection: 'column',
                  height: '100%',
                  width: '100%',
                }}>
                {/* Title summary */}
                <View
                  style={{
                    // borderWidth: 1,
                    // borderColor: 'red',
                    height: '20%',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#1B202C',
                      fontFamily: 'Inter-SemiBold',
                    }}>
                    Payment Summary
                  </Text>
                </View>
                {/* content summary */}
                <View
                  style={{
                    flexDirection: 'column',
                    // borderColor: 'blue',
                    // borderWidth: 1,
                    height: '80%',
                    width: '100%',
                    justifyContent: 'space-between',
                  }}>
                  {/* Line 1 */}
                  <View
                    style={{
                      flexDirection: 'row',
                      height: '26.7%',
                      width: '100%',
                      // borderColor: 'green',
                      // borderWidth: 1,
                      justifyContent: 'space-between',
                    }}>
                    {/* Line 1-1 */}
                    <View
                      style={{
                        // backgroundColor: '#A4D5DE',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        height: '100%',
                        width: '45%',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Inter-Regular',
                          color: '#551613',
                        }}>
                        Guests:
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Inter-Regular',
                          color: '#551613',
                        }}>
                        {numberA + numberC}
                      </Text>
                    </View>
                    {/* Line 1-2 */}
                    <View
                      style={{
                        // backgroundColor: '#A4D5DE',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        height: '100%',
                        width: '45%',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Inter-Regular',
                          color: '#551613',
                        }}>
                        Transports:
                      </Text>
                      <Image
                        style={{
                          height: 20,
                          width: 20,
                        }}
                        source={icons.busicon}
                      />
                    </View>
                  </View>
                  {/* Line 2 */}
                  <View
                    style={{
                      flexDirection: 'row',
                      height: '26.7%',
                      width: '100%',
                      // borderColor: 'green',
                      // borderWidth: 1,
                      justifyContent: 'space-between',
                    }}>
                    {/* Line 2-1 */}
                    <View
                      style={{
                        // backgroundColor: '#A4D5DE',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        height: '100%',
                        width: '45%',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Inter-Regular',
                          color: '#551613',
                        }}>
                        Adult:
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Inter-Regular',
                          color: '#551613',
                        }}>
                        {money * numberA} $
                      </Text>
                    </View>
                    {/* Line 2-2 */}
                    <View
                      style={{
                        // backgroundColor: '#A4D5DE',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        height: '100%',
                        width: '45%',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Inter-Regular',
                          color: '#551613',
                        }}>
                        Location:
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Inter-Regular',
                          color: '#551613',
                        }}>
                        ThaiLand
                      </Text>
                      {/* <Image
                        style={{
                          height: 20,
                          width: 20,
                        }}
                        source={icons.busicon}
                      /> */}
                    </View>
                  </View>
                  {/* Line 3 */}
                  <View
                    style={{
                      flexDirection: 'row',
                      height: '26.7%',
                      // borderColor: 'green',
                      // borderWidth: 1,
                      width: '100%',
                      justifyContent: 'space-between',
                    }}>
                    {/* Line 3-1 */}
                    <View
                      style={{
                        // backgroundColor: '#A4D5DE',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        height: '100%',
                        width: '45%',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Inter-Regular',
                          color: '#551613',
                        }}>
                        Children
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Inter-Regular',
                          color: '#551613',
                        }}>
                        {(money * numberC * 75) / 100} $
                      </Text>
                    </View>
                    {/* Line 3-2 */}
                    <View
                      style={{
                        // backgroundColor: '#A4D5DE',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        height: '100%',
                        width: '45%',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Inter-Regular',
                          color: '#551613',
                        }}>
                        -------------
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Inter-Regular',
                          color: '#551613',
                        }}>
                        ***
                      </Text>
                      {/* <Image
                        style={{
                          height: 20,
                          width: 20,
                        }}
                        source={icons.busicon}
                      /> */}
                    </View>
                  </View>
                </View>
              </View>
            </View>
            {/* END Payment Summary */}

            {/* Total Cost */}
            <View
              style={{
                height: HEIGHTDEVICE / 20,
                width: WIGHTDEVICE / 1.15,
                marginTop: 5,
                // justifyContent: 'center',
                // alignItems: 'center',
                // borderWidth: 0.5,
                // borderColor: 'black',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#1B202C',
                  fontFamily: 'Inter-SemiBold',
                  alignSelf: 'center',
                }}>
                Total: $ {(money * numberC * 75) / 100 + money * numberA}
              </Text>
            </View>
            {/* END Total Cost */}

            {/* BTN continue */}
            <View
              style={{
                height: HEIGHTDEVICE / 12,
                width: WIGHTDEVICE / 1.15,
                marginTop: 5,
                justifyContent: 'center',
                alignItems: 'center',
                // borderWidth: 0.5,
                // borderColor: 'black',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#551613',
                  borderRadius: 12,
                }}
                onPress={() => navigation.navigate('PaymentScreen')}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 22,
                    padding: 10,
                    fontFamily: 'Inter-Bold',
                  }}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
            {/* END btn continue */}
          </View>
        </ScrollView>
      </View>
      {/* END Body */}
    </View>
  );
};

export default BookingScreen2;
