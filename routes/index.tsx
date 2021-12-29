import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CGAppbar from '../components/CGAppbar';
import CryptoGlobalMarket from './CryptoGlobalMarket/CryptoGlobalMarket';
import CryptoSummary from './CryptoSummary';
import CryptoTrend from './CryptoTrend';
// import Setting from './Setting';

const Tab = createMaterialBottomTabNavigator();
const size = 24;

type NavigationTabBarIconProps = {
  focused: boolean;
  color: string;
};

export default function Router() {
  const navigationRef = useNavigationContainerRef();
  const {t} = useTranslation();
  const {colors} = useTheme();

  const SCREENS = [
    {
      id: 'CryptoSummary',
      name: t('NAVIGATOR_TAB_CRYPTO_SUMMARY')!,
      component: CryptoSummary,
      options: {
        tabBarIcon: ({color}: NavigationTabBarIconProps) => {
          // console.log('size:: ', size);
          return (
            <MaterialCommunityIcons
              name="view-list"
              color={color}
              size={size}
            />
          );
        },
      },
    },
    {
      id: 'CryptoTrend',
      name: t('NAVIGATOR_TAB_CRYPTO_TREND')!,
      component: CryptoTrend,
      options: {
        tabBarIcon: ({color}: NavigationTabBarIconProps) => (
          <MaterialCommunityIcons
            name="trending-up"
            color={color}
            size={size}
          />
        ),
      },
    },
    {
      id: 'CryptoGlobalMarket',
      name: t('NAVIGATOR_TAB_CRYPTO_MARKET')!,
      component: CryptoGlobalMarket,
      options: {
        tabBarIcon: ({color}: NavigationTabBarIconProps) => (
          <MaterialCommunityIcons name="web" color={color} size={size} />
        ),
      },
    },
    // {
    //   id: 'Setting',
    //   name: t('NAVIGATOR_TAB_CRYPTO_SETTING')!,
    //   component: Setting,
    //   options: {
    //     tabBarIcon: ({focused, color}: NavigationTabBarIconProps) => (
    //       <MaterialIcons name="settings" color={color} size={size} />
    //     ),
    //   },
    // },
  ];

  return (
    <NavigationContainer ref={navigationRef}>
      <CGAppbar />
      <Tab.Navigator
        initialRouteName={SCREENS[0].name}
        barStyle={{
          backgroundColor: colors.primary,
        }}>
        {SCREENS.map(({id, name, component, ...otherProps}) => {
          return (
            <Tab.Screen
              key={id}
              name={name}
              component={component}
              {...otherProps}
            />
          );
        })}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
