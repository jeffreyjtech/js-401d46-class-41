import { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Clipboard from 'expo-clipboard';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, SafeAreaView } from 'react-native';

export default function App() {
  const [camPermission, setCamPermssion] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState(null);

  const getCamPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setCamPermssion(status === 'granted');
  };

  const handleBarcodeScan = async ({ type, data }) => {
    setScanned(true);
    console.log(type, data);
    console.log(typeof type, typeof data);
    setBarcodeData({ type, data });
    await Clipboard.setStringAsync(data);
  };

  const handleScanAgain = () => {
    setScanned(false);
    setBarcodeData(null);
  };

  useEffect(() => {
    getCamPermission();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {scanned ? (
        <Button title="Press to scan again" onPress={handleScanAgain} />
      ) : (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarcodeScan}
          style={StyleSheet.absoluteFillObject}
        />
      )}

      {barcodeData ? (
        <>
          <Text>Barcode type: {barcodeData.type}</Text>
          <Text>Barcode data: {barcodeData.data}</Text>
          <Text>Barcode data loaded into clipboard</Text>
        </>
      ) : (
        <Text>Scanning scanner</Text>
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
