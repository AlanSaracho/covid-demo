import React from 'react';
import { useFonts } from 'expo-font';
import { Screens } from './screens';
import { RecoilRoot } from 'recoil';
import Splash from 'screens/Splash/Splash';

const App = () => {
  const [fontsLoaded] = useFonts({
    'bacterias': require('./components/BacteriaIcon/assets/bateria-font/font/bacterias.ttf'),
    'KosugiMaru-Regular': require('../assets/KosugiMaru-Regular.ttf'),
    'CfWorldAtWarPersoRegular-rg2qp': require('../assets/CfWorldAtWarPersoRegular-rg2qp.ttf')
  });
  return (
    <React.Suspense fallback={(<Splash />)}>
      <RecoilRoot>
        {fontsLoaded && <Screens />}
        {/* overlayed components */}
      </RecoilRoot>
    </React.Suspense>
  );
};


export default App;

