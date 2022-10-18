import React, {useState} from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Button,
} from 'react-native';

import {icons} from '../../constants/index';

//import DatePicker from the package we installed
import DateTimePicker from '@react-native-community/datetimepicker';

const BookingScreen = ({navigation}) => {
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

  return (
    <View style={{flex: 100, backgroundColor: 'white'}}>
      {/* Header */}
      <View
        style={{
          flex: 10,
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
        }}>
        {/* Container */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',

            width: '100%',
          }}>
          {/* icons back */}
          <View style={{}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                style={{
                  height: 45,
                  width: 45,
                }}
                source={icons.ArrowBackIcon}
              />
            </TouchableOpacity>
          </View>
          {/* title */}
          <View
            style={{
              right: 150,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontWeight: 'bold',
              }}>
              My Bookings
            </Text>
          </View>
        </View>
      </View>
      {/* Body */}
      <View
        style={{
          flex: 90,
        }}>
        {/* Container*/}
        <View
          style={{
            flexDirection: 'column',
            height: '100%',
            width: '100%',
          }}>
          {/* Container Logo */}
          <View
            style={{
              height: '20%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                height: 80,
                width: 80,
              }}
              source={icons.transportationicon}
            />
          </View>
          {/* Pick date, time start*/}
          <View
            style={{
              height: '10%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* Container */}
            <View
              style={{
                flexDirection: 'row',
                height: '100%',
                width: '100%',
              }}>
              {/* Pick date start */}
              <View
                style={{
                  height: '100%',
                  width: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: '#2B3E6D',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 12,
                  }}
                  onPress={showDatepicker}>
                  <Image
                    style={{
                      height: 30,
                      width: 30,
                      marginLeft: 8,
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
              </View>
              {/* Pick time start */}
              <View
                style={{
                  height: '100%',
                  width: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: 55,
                }}>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: '#2B3E6D',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 12,
                  }}
                  onPress={showTimepicker}>
                  <Image
                    style={{
                      height: 30,
                      width: 30,
                      marginLeft: 10,
                    }}
                    source={icons.clockicon}
                  />
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 16,
                      fontWeight: '600',
                      padding: 8,
                    }}>
                    {chooseDate == true ? textTime : fotmaTime}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
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
          {/* choose guest: adult or children */}
          <View
            style={{
              flexDirection: 'column',
              height: '30%',
              width: '100%',
            }}>
            {/* title */}
            <View
              style={{
                height: '15%',
                width: '100%',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  left: 30,
                }}>
                Guests
              </Text>
            </View>
            {/* choose number guest */}
            <View
              style={{
                flexDirection: 'column',
                height: '80%',
                width: '100%',
              }}>
              {/* adult */}
              <View
                style={{
                  height: '50%',
                  width: '100%',

                  justifyContent: 'center',
                }}>
                {/* Container */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 30,
                    borderColor: '#838383',
                    borderWidth: 1,
                    borderRadius: 12,
                    padding: 12,
                  }}>
                  {/* Item */}
                  <View
                    style={{
                      flexDirection: 'column',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'black',
                        fontWeight: 'bold',
                      }}>
                      Adult
                    </Text>
                    <Text>More than 12 years old </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity>
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
                      1
                    </Text>
                    <TouchableOpacity>
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
              {/* children */}
              <View
                style={{
                  height: '50%',
                  width: '100%',
                  marginTop: 8,
                }}>
                {/* Container */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 30,
                    borderColor: '#838383',
                    borderWidth: 1,
                    borderRadius: 12,
                    padding: 12,
                  }}>
                  {/* Item */}
                  <View
                    style={{
                      flexDirection: 'column',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'black',
                        fontWeight: 'bold',
                      }}>
                      Children
                    </Text>
                    <Text>Between 5 - 11 year old </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity>
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
                      1
                    </Text>
                    <TouchableOpacity>
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
          </View>
          {/* Contact infomation */}
          <View
            style={{
              height: '30%',
              width: '100%',
            }}>
            {/* title */}
            <View
              style={{
                height: '15%',
                width: '100%',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  left: 30,
                }}>
                payment summary
              </Text>
            </View>
            {/* body */}
            <View
              style={{
                height: '70%',
                width: '100%',
                flexDirection: 'row',
                paddingHorizontal: 10,
              }}>
              {/* detail1 */}
              <View
                style={{
                  height: '100%',
                  width: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    // borderWidth: 1,
                    // borderColor: 'black',
                    justifyContent: 'space-between',
                    width: '80%',
                  }}>
                  {/* item */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                      }}>
                      Guests
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                      }}>
                      1
                    </Text>
                  </View>
                  {/* item */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: 25,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                      }}>
                      Adult
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                      }}>
                      200 $
                    </Text>
                  </View>
                  {/* item */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                      }}>
                      Children
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                      }}>
                      0
                    </Text>
                  </View>
                </View>
              </View>
              {/* detail2 */}
              <View
                style={{
                  height: '100%',
                  width: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    // borderWidth: 1,
                    // borderColor: 'black',
                    justifyContent: 'space-between',
                    width: '80%',
                  }}>
                  {/* item */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                      }}>
                      ------
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                      }}>
                      *
                    </Text>
                  </View>
                  {/* item */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: 25,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                      }}>
                      ------
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                      }}>
                      *
                    </Text>
                  </View>
                  {/* item */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                      }}>
                      -------
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                      }}>
                      *
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            {/* footer */}
            <View
              style={{
                height: '15%',
                width: '100%',
                // borderWidth: 1,
                // borderColor: 'black',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  left: 30,
                }}>
                Total:{' $ 200 '}
              </Text>
            </View>
          </View>
          {/* Continue payment */}
          <View
            style={{
              height: '10%',
              width: '100%',
              borderWidth: 0.5,
              borderColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#1D222B',
                width: '50%',
                borderRadius: 12,
              }}>
              <Text
                style={{
                  color: 'white',
                  padding: 10,
                  alignSelf: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BookingScreen;
