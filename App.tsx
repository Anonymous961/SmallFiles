/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import AppNav from './navigation/Appnav';
import AppIntroSlider from 'react-native-app-intro-slider';
import slides from './assests/slides';
import RenderItem from './components/slidesRender';

function App(): React.JSX.Element {
  const [showRealApp, setShowRealApp] = useState(false);

  const onDone = () => {
    setShowRealApp(true);
  };
  const onSkip = () => {
    setShowRealApp(true);
  };

  return (
    <>
      {showRealApp ? (
        <AppNav />
      ) : (
        <AppIntroSlider
          data={slides}
          renderItem={RenderItem}
          onDone={onDone}
          showSkipButton={true}
          onSkip={onSkip}
        />
      )}
    </>
  );
}

export default App;
