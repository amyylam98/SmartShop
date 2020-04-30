//Documentation: https://www.npmjs.com/package/react-native-chart-kit
//Documentation: https://www.npmjs.com/package/react-native-table-component
import * as React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { BarChart } from "react-native-chart-kit";
import { Table, Row, Rows } from 'react-native-table-component';

export default class Cost extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        tableHead: ['Month', 'Cost'],
        tableData: [
          ['January', '$20.45'],
          ['February', '$45.36'],
          ['March', '$102.43'],
          ['April', '$97.61'],
          ['May', '$64.76'],
          ['June', '$83.39'],
          ['July', '$97.34'],
          ['August', '$54.63'],
          ['October', '$34.63'],
          ['November', '$111.15'],
          ['December', '$120.23'],
      ]
    }
  }

  render() {
    const state = this.state;
    const barData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
          data: [20, 45, 28, 80, 99, 43, 150, 160, 40, 20, 20, 0 ],
        },
      ],
    };

  return (  
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style= {styles.otherText}>Yearly Costs</Text>
      <BarChart
        data={barData}
        width={375}
        height={250}
        yAxisLabel={'$'}
        chartConfig={chartConfig}
      />
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={state.tableData} textStyle={styles.text}/>
        </Table>
      </View>
    );
  }
}

const chartConfig = {
  
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(0,60, 300, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.4,
  useShadowColorFromDataset: true // optional
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  otherText: {
    color: 'darkgrey',
    fontSize: 25,
    textAlign: 'center',
    justifyContent: 'center',
  }
});