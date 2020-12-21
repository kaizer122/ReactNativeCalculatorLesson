/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Button from './components/Button';

const App = () => {
  const [a, seta] = useState('');
  const [prev, setPrev] = useState(0);

  const click = (value) => {
    const openPars = String(a).match(/\(/g) || [];
    const closePars = String(a).match(/\)/g) || [];

    switch (value) {
      case '<-':
        if (a.length >= 1) {
          if (endsWithOperation(a)) seta((lastA) => lastA.replace(/.$/, ''));
          else seta((lastA) => lastA.replace(/[0-9]+/, ''));
        }
        break;
      case 'C':
        seta('');
        break;
      case '%':
      case '/':
      case '-':
      case '+':
      case '*':
        let res = String(a);
        if (endsWithOperation(a)) {
          res = String(a).replace(/.$/, value);
        } else if (includesOneOperation(a)) {
          res = String(eval(res));
          res += value;
        } else {
          res = res + value;
        }
        seta(res);
        break;

      case '( )':
        if (
          String(a).lastIndexOf('(') === a.length - 1 ||
          String(a).lastIndexOf(')') === a.length - 1
        )
          break;
        if (openPars.length > closePars.length) seta((a) => a + ')');
        else seta((a) => a + '(');
        break;
      case '=':
        let x = a;
        if (endsWithOperation(a)) {
          x = x.substr(0, x.length - 1);
        }
        seta(sum(x));
        break;

      default:
        seta((a) => a + value);
        break;
    }
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.result}>{a ?? ''}</Text>
        </View>
        <View style={styles.section}>
          {valuesArray.map((x, i) => {
            return <Button text={x} key={i} onPress={click} />;
          })}
        </View>
      </SafeAreaView>
    </>
  );
};
const valuesArray = [
  'C',
  '( )',
  '%',
  '<-',
  '7',
  '8',
  '9',
  '/',
  '4',
  '5',
  '6',
  '*',
  '1',
  '2',
  '3',
  '+',
  '-',
  '0',
  '.',
  '=',
];

const endsWithOperation = (a) =>
  ['%', '/', '-', '+', '*'].includes(String(a)[String(a).length - 1]);

const includesOneOperation = (a) =>
  ['%', '/', '-', '+', '*'].some((operation) => String(a).includes(operation));

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1,
    width: '100%',
    alignContent: 'flex-end',
  },
  topSection: {
    height: 50,
    flex: 1,
  },
  column: {
    width: '25%',
  },
  result: {
    fontSize: 30,
    padding: 5,
    marginLeft: 5,
  },
});

export default App;
