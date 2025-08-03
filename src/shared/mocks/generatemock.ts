import MCAPIndexImage from '@assets/img/index-photo1.jpg';

const createRandomIndex = () => {

  const possibleTitles = [
    'Market Cap Index',
    'Blue Chip Index',
    'Tech Sector Index',
    'Volatility Index',
    'S&P 500 Mock',
    'Dow Jones Mock',
  ];

  const type = Math.random() > 0.5 ? 'up' : 'down';
  const mcap = Math.floor(Math.random() * (500000000 - 10000000 + 1)) + 10000000; 
  const price = parseFloat((Math.random() * (5000 - 200) + 200).toFixed(2)); 
  const change_price = parseFloat((Math.random() * (100 - 1) + 1).toFixed(2)); 

  return {

    icon: MCAPIndexImage, 
    title: possibleTitles[Math.floor(Math.random() * possibleTitles.length)],
    mcap,
    price,
    change_price,
    type,
    
  };

};

const generateIndexesMock = (count = 5) => {

  return Array.from({ length: count }, createRandomIndex);

};

export { generateIndexesMock };