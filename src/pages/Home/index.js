import { FlatList, Image, Linking, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../utils/colors'
import { apiURL, getData, storeData, urlToken } from '../../utils/localStorage';
import { fonts, myDimensi, windowHeight, windowWidth } from '../../utils/fonts';
import { Icon } from 'react-native-elements'
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import MyCarouser from '../../components/MyCarouser';
import { ImageBackground } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { useIsFocused } from '@react-navigation/native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { TouchableNativeFeedback } from 'react-native';
export default function Home({ navigation, route }) {

  const [user, setUser] = useState({});
  const [kategori, setKategori] = useState([]);
  const [produk, setProduk] = useState([]);
  const [best, setBest] = useState({});
  const [cart, setCart] = useState(0);
  const isFocused = useIsFocused();
  useEffect(() => {

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const json = JSON.stringify(remoteMessage);
      const obj = JSON.parse(json);
      console.log(obj);
      PushNotification.localNotification({
        channelId: 'siskapuncak', // (required) channelId, if the channel doesn't exist, notification will not trigger.
        title: obj.notification.title, // (optional)
        message: obj.notification.body, // (required)
      });

    });




    getData('user').then(u => {
      setUser(u);
      UpdateToken(u.id);
    });

    return unsubscribe;



  }, [isFocused]);




  const UpdateToken = (id) => {

    getData('token').then(res => {
      // console.log('tokenSAYA', res.token);
      axios.post(apiURL + 'v1_token_update.php', {
        api_token: urlToken,
        id: id,
        token: res.token
      }).then(zvl => {
        // console.log('UPDATE TOKEN', zvl.data)
      })
    })

  }







  return (

    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white
    }}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      {/* header */}
      <View style={{
        backgroundColor: colors.primary,
        flexDirection: 'row',
        height: windowHeight / 12,
      }}>
        <View style={{
          flex: 1,
          padding: 5,
        }}>
          <Text style={{
            fontFamily: fonts.primary[400],
            fontSize: myDimensi / 2,
            color: colors.white
          }}>Halo, <Text style={{
            fontFamily: fonts.primary[600],
            fontSize: myDimensi / 2
          }}>{user.nama_lengkap}</Text></Text>
          <Text style={{
            fontFamily: fonts.primary[600],
            fontSize: myDimensi / 1.2,
            color: colors.white
          }}>Siska Puncak</Text>
        </View>

        {/* <TouchableOpacity onPress={() => navigation.navigate('Account')} style={{
          backgroundColor: colors.white,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Image source={require('../../assets/logo.png')} style={{
            width: myDimensi / 0.5,
            height: myDimensi / 1,
            borderRadius: 5,
            resizeMode: 'contain'
          }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Account')} style={{
          backgroundColor: colors.white,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Image source={require('../../assets/pemda.png')} style={{
            width: myDimensi / 0.5,
            height: myDimensi / 1,
            borderRadius: 5,
            resizeMode: 'contain'
          }} />
        </TouchableOpacity> */}

      </View>

      {/* slider */}
      <MyCarouser />

      <View style={{
        flex: 1,
        justifyContent: 'center'
      }}>

        <TouchableOpacity onPress={() => navigation.navigate('AAPermintaan')} style={{
          flexDirection: 'row',
          backgroundColor: colors.primary,
          marginHorizontal: 10,
          marginVertical: 10,
          padding: 10,
        }}>
          <View style={{
            flex: 0.5,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Icon type='ionicon' size={myDimensi / 0.5} color={colors.white} name='create-outline' />
          </View>
          <View style={{
            flex: 1,
            justifyContent: 'center',

          }}>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: myDimensi / 1.5,
              color: colors.white
            }}>Buat Permintaan</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('AAMasuk')} style={{
          flexDirection: 'row',
          backgroundColor: colors.secondary,
          marginHorizontal: 10,
          marginVertical: 10,
          padding: 10,
        }}>
          <View style={{
            flex: 0.5,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Icon type='ionicon' size={myDimensi / 0.5} color={colors.white} name='mail-outline' />
          </View>
          <View style={{
            flex: 1,
            justifyContent: 'center',

          }}>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: myDimensi / 1.5,
              color: colors.white
            }}>Pesan Masuk</Text>
          </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => navigation.navigate('AADaftar')} style={{
          flexDirection: 'row',
          backgroundColor: colors.tertiary,
          marginHorizontal: 10,
          marginVertical: 10,
          padding: 10,
        }}>
          <View style={{
            flex: 0.5,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Icon type='ionicon' size={myDimensi / 0.5} color={colors.white} name='file-tray-stacked-outline' />
          </View>
          <View style={{
            flex: 1,
            justifyContent: 'center',

          }}>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: myDimensi / 1.5,
              color: colors.white
            }}>Daftar Dokumen</Text>
          </View>
        </TouchableOpacity>
      </View>







    </SafeAreaView >
  )
}

const styles = StyleSheet.create({})