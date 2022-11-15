const places = [
  {
    id: '1',
    name: 'Lago di Braies, Braies',
    location: {
      country: 'Italy',
      placeName: 'Capri & Sorrento',
      descLocation: ' coastal area within Liguria, in the northwest of Italy',
    },
    TypeOfTransport: {
      nameTransport: 'Airplane',
    },
    price: 100.0,
    image: require('../assets/images/location1.jpg'),
    details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit.`,
  },
  {
    id: '2',
    name: 'Siargao island',
    location: {
      country: 'Philippines',
      placeName: 'Capri & Sorrento',
      descLocation: ' coastal area within Liguria, in the northwest of Italy',
    },
    TypeOfTransport: {
      nameTransport: 'Bus',
    },
    price: 200,
    image: require('../assets/images/location2.jpg'),
    details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit.`,
  },
  {
    id: '3',
    name: 'Manarola',
    location: {
      country: 'Italy',
      placeName: 'Capri & Sorrento',
      descLocation: ' coastal area within Liguria, in the northwest of Italy',
    },
    TypeOfTransport: {
      nameTransport: 'Train',
    },
    price: 300,
    image: require('../assets/images/location3.jpg'),
    details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit.`,
  },
  {
    id: '4',
    name: 'Perhentian Islands',
    location: {
      country: 'Malaysia',
      placeName: 'Capri & Sorrento',
      descLocation: ' coastal area within Liguria, in the northwest of Italy',
    },
    TypeOfTransport: {
      nameTransport: 'Yacht',
    },
    price: 400,
    image: require('../assets/images/location4.jpg'),
    details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit.`,
  },
  {
    id: '5',
    name: 'Perhentian Islands',
    location: {
      country: 'Malaysia',
      placeName: 'Capri & Sorrento',
      descLocation: ' coastal area within Liguria, in the northwest of Italy',
    },
    TypeOfTransport: {
      nameTransport: 'Airplane',
    },
    price: 500,
    image: require('../assets/images/location4.jpg'),
    details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit.`,
  },
  {
    id: '6',
    name: 'Perhentian Islands',
    location: {
      country: 'Indonesia',
      placeName: 'Capri & Sorrento',
      descLocation: ' coastal area within Liguria, in the northwest of Italy',
    },
    TypeOfTransport: {
      nameTransport: 'Yacht',
    },
    price: 600,
    image: require('../assets/images/location4.jpg'),
    details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit.`,
  },
];

const Review = [
  {
    id: 1,
    username: 'Hoang',
    image: 'picture 1',
    rating: 5,
    descripton:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque',
    createAt: 'a hour ago',
  },
  {
    id: 2,
    username: 'Hoang',
    image: 'picture 1',
    rating: 5,
    descripton:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesq',
    createAt: 'a hour ago',
  },
  {
    id: 3,
    username: 'Hoang',
    image: 'picture 1',
    rating: 5,
    descripton:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium',
    createAt: 'a hour ago',
  },
  {
    id: 4,
    username: 'Hoang',
    image: 'picture 1',
    rating: 5,
    descripton:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    createAt: 'a hour ago',
  },
  {
    id: 5,
    username: 'Hoang',
    image: 'picture 1',
    rating: 5,
    descripton:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque',
    createAt: 'a hour ago',
  },
];

const FListData = [
  {
    key: '12f3asdjq2j1jwdnalknwafnwo12321rfgfsF',
    name: 'i',
    imageUrl: require('../assets/images/pic3.jpg'),
    fooddesc: 'dsdsd.DHOIHGFWOI',
  },
  {
    key: '12f3asdjq2j1dqdwqd21d2fgfsF',
    name: 'a',
    imageUrl: require('../assets/images/pic3.jpg'),
    fooddesc: 'dsdsd',
  },
  {
    key: '12f3asdjq2j1jwd312321ed1221rfgfsF',
    name: 'id',
    imageUrl: require('../assets/images/pic3.jpg'),
    fooddesc: 'dsdsd',
  },
  {
    key: '12f3asdjq2j1jw312ed21e1rfgfsF',
    name: 'v',
    imageUrl: require('../assets/images/pic3.jpg'),
    fooddesc: 'dsdsd',
  },
  {
    key: '12f3asdjq2j1jwdne21e21e1',
    name: 'd',
    imageUrl: require('../assets/images/pic3.jpg'),
    fooddesc: 'dsdsd',
  },
  {
    key: '12f3asdjq2j1jwdnae12e2132132121rfgfsF',
    name: 'a',
    imageUrl: require('../assets/images/pic3.jpg'),
    fooddesc: 'dsdsd',
  },
  {
    key: '12f3asdjq2j1jw3123211e2321rfgfsF',
    name: 'sa',
    imageUrl: require('../assets/images/pic3.jpg'),
    fooddesc: 'dsdsd',
  },
  {
    key: '12f3asdjq2j1jwdnal12321d12d321rfgfsF',
    name: 'aa',
    imageUrl: require('../assets/images/pic3.jpg'),
  },
  {
    key: '12f3asdjq2j1jwd321e2121rfgfsF',
    name: 'g',
    imageUrl: require('../assets/images/pic3.jpg'),
    fooddesc: 'dsdsd',
  },
];

const FoodList = [
  {
    id: '1',
    title: 'Poha',
    category: 'Breakfast',
    price: '$1',
    img: 'https://c.ndtvimg.com/2021-08/loudr2go_aloo-poha_625x300_05_August_21.jpg?im=FeatureCrop,algorithm=dnn,width=620,height=350',
    desc: ' Poha. Light, filling and easy to make, poha is one famous breakfast that is eaten almost everywhere in the country. And the best part is- it can be made in a number of ways. Kanda poha, soya poha, Indori poha, Nagpur Tari Poha are a few examples',
  },
  {
    id: '2',
    title: 'Upma',
    category: 'Breakfast',
    price: '$1',
    img: 'https://c.ndtvimg.com/2021-04/37hi8sl_rava-upma_625x300_17_April_21.jpg?im=FeatureCrop,algorithm=dnn,width=620,height=350',
    desc: ' A quintessential South Indian Breakfast! Made with protein-packed urad dal and semolina followed by crunchy veggies and curd, this recipe makes for a hearty morning meal. With some grated coconut on top, it gives a beautiful south-Indian flavour.',
  },
  {
    id: '3',
    title: 'Cheela',
    category: 'Breakfast',
    price: '$1',
    img: 'https://c.ndtvimg.com/2019-05/1afu8vt8_weight-loss-friendly-breakfast-paneer-besan-chilla_625x300_25_May_19.jpg?im=FaceCrop,algorithm=dnn,width=620,height=350',
    desc: 'A staple across Indian households, moong dal is widely used in a number of Indian delicacies. One such delicacy is moong dal cheela. You can also add paneer to this recipe to amp up the nutritional value and make it, even more, protein-dense',
  },
  {
    id: '4',
    title: 'Channa Kulcha',
    category: 'Lunch',
    price: '$1',
    img: 'https://i.ndtvimg.com/i/2015-04/chana-kulcha_625x350_41429707001.jpg',
    desc: 'A classic dish that never goes out of style. The quintessential chana kulcha  needs only a few ingredients - cumin powder, ginger, coriander powder, carom powder, and some mango powder, which is what gives the chana its sour and tangy taste.',
  },
  {
    id: '5',
    title: 'Egg Curry',
    category: 'Lunch',
    price: '$1',
    img: 'https://i.ndtvimg.com/i/2017-11/goan-egg-curry_620x350_41511515276.jpg',
    desc: 'Eggs are a versatile food that can be cooked for any meal of the day. From breakfast to dinner, it can be a go-to food. Here is a mildly-spiced egg curry made with garlic, onions, a whole lot of kasuri methi, fresh cream, yogurt, and fresh coriander.',
  },
  {
    id: '6',
    title: 'Paneer Aachari',
    category: 'Lunch',
    price: '$1',
    img: 'https://i.ndtvimg.com/i/2015-04/paneer_625x350_61429707960.jpg',
    desc: "Don't get intimidated by the list of ingredients because not only are already in your kitchen cabinet, but also because all they'll need is 20 minutes of your time. Chunks of cottage cheese cooked in some exciting spices, yogurt and a pinch of sugar.",
  },
  {
    id: '7',
    title: 'Fish Fry',
    category: 'Dinner',
    price: '$1',
    img: 'https://i.ndtvimg.com/i/2015-06/indian-dinner_625x350_41434360207.jpg',
    desc: 'Get your daily dose of perfect protein. Pieces of surmai fish marinated in garlic, cumin, fennel, curry leaves, and tomatoes are pan-fried in refined oil and served hot. This fish fry recipe has a host of delectable spices used for marination giving it a unique touch.',
  },
  {
    id: '8',
    title: 'Dum Alloo',
    category: 'Dinner',
    price: '$1',
    img: 'https://i.ndtvimg.com/i/2015-06/indian-dinner_625x350_51434362664.jpg',
    desc: 'Your family will thank you for this fantastic bowl of dum aloo cooked Lakhnawi style. Take some potatoes, crumbled paneer, kasuri methi, butter, onions, and some ghee.',
  },
  {
    id: '9',
    title: 'Malai Kofta',
    category: 'Dinner',
    price: '$1',
    img: 'https://i.ndtvimg.com/i/2017-10/makhmali-kofte_620x350_51508918483.jpg',
    desc: 'A rich gravy made of khus khus, coconut and milk that tastes best with koftas made from khoya. This velvety and creamy recipe will leave you licking your fingers. Makhmali kofte can be your go-to dish for dinner parties as this is quite different from other kofta recipes and extremely delicious.',
  },
  {
    id: '10',
    title: 'Malai Kofta',
    category: 'Snaks',
    price: '$1',
    img: 'https://i.ndtvimg.com/i/2017-10/makhmali-kofte_620x350_51508918483.jpg',
    desc: 'A rich gravy made of khus khus, coconut and milk that tastes best with koftas made from khoya. This velvety and creamy recipe will leave you licking your fingers. Makhmali kofte can be your go-to dish for dinner parties as this is quite different from other kofta recipes and extremely delicious.',
  },
];

export {places, FListData, FoodList, Review};
