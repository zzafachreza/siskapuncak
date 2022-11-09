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
    PermissionsAndroid,
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
import RNFetchBlob from 'rn-fetch-blob';
export default function AADaftar({ navigation, route }) {
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

        axios.post(apiURL + 'v1_data_pesan_list.php', {
            api_token: urlToken,
            fid_user: uid
        }).then(res => {
            console.warn(res.data);
            setData(res.data);
        })

    }


    const _getDataTransactionKey = (key) => {

        axios.post(apiURL + 'v1_data_pesan_list.php', {
            api_token: urlToken,
            key: key
        }).then(res => {
            console.warn(res.data);
            setData(res.data);
        })

    }

    const [key, setKey] = useState('');




    const downloadHistory = async (url, nama_file, exe) => {

        const { config, fs } = RNFetchBlob;
        let PictureDir = fs.dirs.DownloadDir;
        let date = new Date();
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                //Related to the Android only
                useDownloadManager: true,
                notification: true,
                path:
                    PictureDir +
                    '/' + nama_file + '.' + exe,
                description: nama_file,
            },
        };
        config(options)
            .fetch('GET', url)
            .then((res) => {
                // success
                showMessage({
                    message: 'File berhasil di unduh',
                    type: 'success'
                })
            })
            .catch((error) => {
                // error
                console.warn(error)
            });

    }


    return (
        <SafeAreaView style={{
            flex: 1,
            padding: 10,
            backgroundColor: colors.white
        }}>

            <View>
                <View style={{
                    position: 'relative',
                    marginBottom: 10,
                }}>
                    <View style={{
                        position: 'absolute',
                        left: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%', padding: 10,
                    }}>
                        <Icon name='search' light size={myDimensi / 1.6} color={colors.primary} />
                    </View>
                    <TextInput placeholderTextColor={colors.border_form} onSubmitEditing={e => _getDataTransactionKey(e.nativeEvent.text)} autoCapitalize='none' value={key} onChangeText={x => setKey(x)}

                        style={{
                            borderWidth: 1,
                            borderColor: colors.border_form,
                            color: colors.black,
                            borderRadius: 10,
                            fontSize: myDimensi / 2,
                            paddingLeft: 35,
                            paddingTop: 12,
                            fontFamily: fonts.primary.normal
                        }}
                        placeholder="Masukan kata kunci"
                    />
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {data.map(i => {
                    return (
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderBottomWidth: 1,
                            paddingBottom: 10,
                            borderBottomColor: colors.border_card
                        }}>

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
                                    fontFamily: fonts.secondary[400],
                                    fontSize: myDimensi / 3,
                                    color: colors.primary
                                }}>{i.tanggal} {i.jam}</Text>

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

                            {i.status == "CLOSE" &&

                                <View>

                                    <TouchableOpacity onPress={() => {

                                        Alert.alert(
                                            "Siska Puncak",
                                            "Unduh dokumen ini ?",
                                            [
                                                {
                                                    text: "Cancel",
                                                    style: "cancel",
                                                },
                                                {
                                                    text: "OK", onPress: () => {

                                                        PermissionsAndroid.request(
                                                            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                                                            {
                                                                title: 'storage title',
                                                                message: 'storage_permission',
                                                            },
                                                        ).then(granted => {
                                                            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                                                                //Once user grant the permission start downloading
                                                                console.log('Storage Permission Granted.');
                                                                downloadHistory(i.url, i.nama_file, i.exe);
                                                                // Linking.openURL(i.url)
                                                            } else {
                                                                //If permission denied then show alert 'Storage Permission 
                                                                Alert.alert('storage_permission');
                                                            }
                                                        });
                                                    }
                                                }
                                            ],

                                        );


                                    }} style={{
                                        backgroundColor: colors.secondary,
                                        width: 80,
                                        paddingVertical: 5,
                                        borderRadius: 10,
                                        justifyContent: 'center',

                                        flexDirection: 'row'
                                    }}>
                                        <Icon name='download' color={colors.white} />
                                        <Text style={{
                                            left: 5,
                                            fontFamily: fonts.secondary[400],
                                            fontSize: myDimensi / 2.5,
                                            color: colors.white
                                        }}>Unduh</Text>
                                    </TouchableOpacity>
                                    <Text style={{
                                        fontFamily: fonts.primary[200],
                                        fontSize: myDimensi / 3,
                                        color: colors.black
                                    }}>{i.nama_file}</Text>
                                </View>
                            }

                            {i.status == "OPEN" && <Text style={{
                                fontFamily: fonts.secondary[400],
                                fontSize: myDimensi / 3,
                                color: colors.border_label
                            }}>File Belum tersedia</Text>}
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})