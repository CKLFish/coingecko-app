import React from 'react';
import {ScrollView, View} from 'react-native';

type SettingProps = {};

const list: any[] = [];

const Setting: React.FC<SettingProps> = _props => {
  return (
    <ScrollView>
      {list.map((_item, _index) => {
        return <View style={{}} />;
      })}
    </ScrollView>
  );
};

export default Setting;
