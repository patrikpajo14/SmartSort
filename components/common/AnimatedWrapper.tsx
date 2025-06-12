// AnimatedWrapper.tsx

import React, {useState, useEffect, ReactNode} from 'react';
import {Animated, View, LayoutChangeEvent} from 'react-native';

interface AnimatedWrapperProps {
  children: ReactNode;
  isVisible: boolean;
}

const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  children,
  isVisible,
}) => {
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const [animation] = useState(new Animated.Value(isVisible ? 1 : 0));

  // Measure the content height
  const handleLayout = (event: LayoutChangeEvent) => {
    const {height} = event.nativeEvent.layout;
    setContentHeight(height);
  };

  useEffect(() => {
    // Only animate if contentHeight is known
    if (contentHeight !== null) {
      Animated.timing(animation, {
        toValue: isVisible ? 1 : 0,
        duration: 300,
        useNativeDriver: false, // Cannot use native driver when animating height
      }).start();
    }
  }, [isVisible, animation, contentHeight]);

  // Animated styles
  const animatedStyle = {
    height: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, contentHeight || 0],
    }),
    opacity: animation,
    overflow: 'hidden' as const,
  };

  return (
    <>
      <View style={{position: 'absolute', opacity: 0, zIndex: -1}}>
        <View onLayout={handleLayout}>{children}</View>
      </View>
      {contentHeight !== null && (
        <Animated.View style={animatedStyle}>{children}</Animated.View>
      )}
    </>
  );
};

export default AnimatedWrapper;
