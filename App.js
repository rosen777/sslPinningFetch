/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, Platform} from 'react-native';
const axios = require('axios').default;

const CERTURL = 'https://busdue.com';
const NONCERTURL = 'https://reqres.in/api/users/2';

const App = () => {
  const [validationFetchCertMsg, setValidationCertFetchMsg] =
    useState('Waiting');
  const [validationCertAxiosMsg, setValidationCertAxiosMsg] =
    useState('Waiting');
  const [validationFetchNonCertMsg, setValidationNonCertFetchMsg] =
    useState('Waiting');
  const [validationNonCertAxiosMsg, setValidationNonCertAxiosMsg] =
    useState('Waiting');
  const [validationFetchCertStatus, setValidationFetchCertStatus] =
    useState('');
  const [validationAxiosCertStatus, setValidationAxiosCertStatus] =
    useState('');
  const [validationFetchNonCertStatus, setValidationFetchNonCertStatus] =
    useState('');
  const [validationAxioshNonCertStatus, setValidationAxiosNonCertStatus] =
    useState('');
  const onCertFetch = () => {
    fetch(CERTURL)
      .then(res => {
        console.log('**************');
        console.log(res);
        console.log('**************');
        setValidationCertFetchMsg('Valid certificate, connected.');
        setValidationFetchCertStatus('success');
      })
      .catch(() => {
        setValidationCertFetchMsg(
          'Certificate does not match, connection refused',
        );
        setValidationFetchCertStatus('failed');
      });
  };

  const onAxiosCertFetch = () => {
    axios
      .get(CERTURL)
      .then(res => {
        console.log('**************');
        console.log(res);
        console.log('**************');
        setValidationCertAxiosMsg('Valid certificate, connected.');
        setValidationAxiosCertStatus('success');
      })
      .catch(() => {
        setValidationCertAxiosMsg(
          'Certificate does not match, connection refused',
        );
        setValidationAxiosCertStatus('failed');
      });
  };

  const onNonCertFetch = async () => {
    try {
      const response = await fetch(NONCERTURL);
      console.log('**************');
      console.log(response.json());
      console.log('**************');
      setValidationNonCertFetchMsg('Valid certificate, connected.');
      setValidationFetchNonCertStatus('success');
    } catch (e) {
      setValidationNonCertFetchMsg(
        'Certificate does not match, connection refused',
      );
      setValidationFetchNonCertStatus('failed');
    }
  };

  const onAxiosNonCertFetch = () => {
    axios
      .get(NONCERTURL)
      .then(res => {
        console.log('**************');
        console.log(res.data);
        console.log('**************');
        setValidationNonCertAxiosMsg('Valid certificate, connected.');
        setValidationAxiosNonCertStatus('success');
      })
      .catch(() => {
        setValidationNonCertAxiosMsg(
          'Certificate does not match, connection refused',
        );
        setValidationAxiosNonCertStatus('failed');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native SSL Pinning</Text>
      <Text style={styles.title}>({Platform.OS.toUpperCase()})</Text>
      <Text style={styles.header}>Certificate status:</Text>
      <View style={styles.statusContainer}>
        <Text
          style={[
            styles.status,
            validationFetchCertStatus === 'success' && styles.success,
            validationFetchCertStatus === 'failed' && styles.failed,
          ]}>
          {validationFetchCertMsg}
        </Text>
        <View style={styles.btnContainer}>
          <Button title={`Test fetch call: ${CERTURL}`} onPress={onCertFetch} />
        </View>
      </View>
      <View style={styles.statusContainer}>
        <Text
          style={[
            styles.status,
            validationAxiosCertStatus === 'success' && styles.success,
            validationAxiosCertStatus === 'failed' && styles.failed,
          ]}>
          {validationCertAxiosMsg}
        </Text>
        <View style={styles.btnContainer}>
          <Button
            title={`Test axios call: ${CERTURL}`}
            onPress={onAxiosCertFetch}
          />
        </View>
      </View>
      <View style={styles.statusContainer}>
        <Text
          style={[
            styles.status,
            validationFetchNonCertStatus === 'success' && styles.success,
            validationFetchNonCertStatus === 'failed' && styles.failed,
          ]}>
          {validationFetchNonCertMsg}
        </Text>
        <View style={styles.btnContainer}>
          <Button
            title={`Test fetch call: ${NONCERTURL}`}
            onPress={onNonCertFetch}
          />
        </View>
      </View>
      <View style={styles.statusContainer}>
        <Text
          style={[
            styles.status,
            validationAxioshNonCertStatus === 'success' && styles.success,
            validationAxioshNonCertStatus === 'failed' && styles.failed,
          ]}>
          {validationNonCertAxiosMsg}
        </Text>
        <View style={styles.btnContainer}>
          <Button
            title={`Test axios call: ${NONCERTURL}`}
            onPress={onAxiosNonCertFetch}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header: {
    paddingTop: 46,
    fontSize: 18,
    textAlign: 'center',
  },
  status: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  success: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  failed: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
  btnContainer: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
    paddingHorizontal: 16,
    marginTop: 24,
  },
  statusContainer: {
    with: 200,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
