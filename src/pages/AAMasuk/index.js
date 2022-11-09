import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
    TouchableWithoutFeedback,
    Image,
    Linking,
    ActivityIndicator,
    Alert,
    Keyboard,
    TextInput,
} from 'react-native';

import { apiURL, getData, storeData, urlAPI, urlToken } from '../../utils/localStorage';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MyButton, MyInput, MyPicker } from '../../components';
import { colors } from '../../utils/colors';
import { TouchableOpacity, Swipeable } from 'react-native-gesture-handler';
import { fonts, myDimensi, windowHeight, windowWidth } from '../../utils/fonts';
import { useIsFocused } from '@react-navigation/native';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { showMessage } from 'react-native-flash-message';
import { Modalize } from 'react-native-modalize';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function AAMasuk({ navigation, route }) {
    const isFocused = useIsFocused();
    const [data, setData] = useState([]);

    useEffect(() => {
        if (isFocused) {
            getData('user').then(rx => {

                _getDataTransaction(rx.id);
            });

        }
    }, [isFocused]);


    const _getDataTransaction = (uid) => {

        axios.post(apiURL + 'v1_data_pesan.php', {
            api_token: urlToken,
            fid_user: uid
        }).then(res => {
            console.warn(res.data);
            setData(res.data);
        })

    }
    return (
        <SafeAreaView style={{
            flex: 1,
            padding: 10,
            backgroundColor: colors.white
        }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {data.map(i => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('AAUpload', i)} style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderBottomWidth: 1,
                            paddingBottom: 10,
                            borderBottomColor: colors.border_card
                        }}>
                            <View style={{
                                backgroundColor: colors.primary,
                                width: 50,
                                height: 50,
                                padding: 2,
                                borderRadius: 25,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: myDimensi / 1.1,
                                    color: colors.white,
                                    textAlign: 'center'
                                }}>{i.ava}</Text>
                            </View>
                            <View style={{
                                flex: 1,
                                paddingLeft: 10,
                            }}>

                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: myDimensi / 2.5,
                                    color: colors.black
                                }}>{i.nama_lengkap} - {i.dinas}</Text>


                                <Text style={{
                                    fontFamily: fonts.primary[400],
                                    fontSize: myDimensi / 2.5,
                                    color: colors.black
                                }}>{i.judul_permintaan}</Text>
                                <Text style={{
                                    fontFamily: fonts.primary[200],
                                    fontSize: myDimensi / 2.5,
                                    color: colors.black
                                }}>{i.deskripsi_permintaan}</Text>

                            </View>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[400],
                                    fontSize: myDimensi / 2.5,
                                    color: colors.black
                                }}>{i.tanggal}</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[400],
                                    fontSize: myDimensi / 2.5,
                                    color: colors.black
                                }}>{i.jam}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})