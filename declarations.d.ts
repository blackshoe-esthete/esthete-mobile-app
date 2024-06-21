declare module 'react-native-3dcube-navigation-typescript' {
  import {ComponentType, ReactNode} from 'react';
  import {ViewProps} from 'react-native';

  export interface CubeNavigationHorizontalProps extends ViewProps {
    children?: ReactNode; // children 속성 추가
    ref?: any;
    loop?: boolean;
  }

  export const CubeNavigationHorizontal: ComponentType<CubeNavigationHorizontalProps>;
}
