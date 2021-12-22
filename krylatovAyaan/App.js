import React, {useState} from 'react';
import {Text, View, Button} from 'react-native';

const App = () => {
  const [count, setCount] = useState(0);
  var [color] = useState('#476DD5');

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>dont touch button {count}</Text>
      <Button
        color={changeColor(count, color, setCount)}
        title="Smash me!"
        onPress={() => {
          setCount(count + 1);
          changeColor(count, color, setCount);
          color = color;
        }}
      />
    </View>
  );
};
const changeColor = (count, color, setCount) => {
  if (count === 0) {
    color = '#FFBA73';
  }
  if (count === 1) {
    color = '#476DD5';
  }
  if (count === 2) {
    color = '#F13C73';
  }
  if (count === 3) {
    setCount(count - 3);
    color = '#FFBA73';
  }
  return color;
};
export default App;
