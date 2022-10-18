import React, {useState} from 'react';

import {View, Text, Image, ScrollView} from 'react-native';
import {icons} from '../../constants/index';
import {FoodItems} from './components';

const FoodList = () => {
  /**
   * 1. listView from a map objects
   * 2. FlatList
   */
  const [foods, setFoods] = useState([
    {
      name: 'Breads',
      status: 'Opening soon',
      url: require('./assets/pic1.jpg'),
      price: 5213.232,
      website: 'https://lesonA.com',
      socialNetworks: [
        {
          facebook: 'https://www.facebook.com/person1',
          twitter: 'https://www.twitter.com/person1',
          instagram: 'https://www.instagram.com/person1',
        },
      ],
    },
    {
      name: 'Chargrilled Mackerel With Sweet And Sour Beetroot',
      status: 'Opening now',
      url: require('./assets/pic2.jpg'),
      price: 5213.232,
      website: 'https://lesonB.com',
      socialNetworks: [
        {
          twitter: 'https://www.twitter.com/person1',
          instagram: 'https://www.instagram.com/person1',
        },
      ],
    },
    {
      name: 'Chicken Liver & Pineau Pâté',
      status: 'closing now',
      url: require('./assets/pic3.jpg'),
      price: 5213.232,
      website: 'https://lesonC.com',
      socialNetworks: [
        {
          facebook: 'https://www.facebook.com/person3',
          instagram: 'https://www.instagram.com/person1',
        },
      ],
    },
    {
      name: 'Tripple Cheese & Tarragon-Stuffed Mushroom',
      status: 'closing now',
      url: require('./assets/pic4.jpg'),
      price: 5213.232,
      website: 'https://lesondD.com',
      socialNetworks: [
        {
          facebook: 'https://www.facebook.com/person4',
          twitter: 'https://www.twitter.com/person1',
        },
      ],
    },
    {
      name: 'Watercress & Celeriac Soup With Goatss Cheese Crouton',
      status: 'Opening soon',
      url: require('./assets/pic5.jpg'),
      price: 5213.232,
      website: 'https://lesondE.com',
      socialNetworks: [
        {
          instagram: 'https://www.instagram.com/person1',
        },
      ],
    },
    {
      name: 'Chilled-Marinated Pork With Vietnamese Brussels Sprouts',
      status: 'closing now',
      url: require('./assets/pic6.jpg'),
      price: 5213.232,
      website: 'https://lesondF.com',
      socialNetworks: [
        {
          twitter: 'https://www.twitter.com/person1',
        },
      ],
    },
    {
      name: 'Confectionery',
      status: 'Opening soon',
      url: require('./assets/pic7.jpg'),
      price: 5213.232,
      website: 'https://lesondG.com',
      socialNetworks: [
        {
          facebook: 'https://www.facebook.com/person7',
        },
      ],
    },
    {
      name: 'Lampreys, with the remains Of sharp sauce and birds brains,With honey so luscious',
      status: 'Opening now',
      url: require('./assets/pic8.jpg'),
      price: 5213.232,
      website: 'https://lesondH.com',
      socialNetworks: [
        {
          facebook: 'https://www.facebook.com/person8',
          twitter: 'https://www.twitter.com/person1',
          instagram: 'https://www.instagram.com/person1',
        },
      ],
    },
  ]);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View>
        <ScrollView>
          {foods.map(eachfood => (
            <FoodItems food={eachfood} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default FoodList;
