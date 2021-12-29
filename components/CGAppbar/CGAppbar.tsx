// import {useNavigationState} from '@react-navigation/native';
// import _ from 'lodash';
import React from 'react';
import {Appbar} from 'react-native-paper';

const CGAppbar: React.FC = () => {
  //   const navigationState = useNavigationState(state => state);

  return (
    <Appbar>
      {/* {hasPreviousRoute ? (
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
      ) : null} */}
      <Appbar.Content title={'Crypto'} />
    </Appbar>
  );
};

export default CGAppbar;
