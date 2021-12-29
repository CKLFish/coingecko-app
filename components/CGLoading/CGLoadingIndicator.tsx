import React from 'react';
import {ViewProps} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

interface LoadingIndicatorProps extends ViewProps {}

const CGLoadingIndicator: React.FC<LoadingIndicatorProps> = props => {
  return <ActivityIndicator size={'large'} {...props} />;
};

export default CGLoadingIndicator;
