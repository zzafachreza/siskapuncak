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
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { colors } from '../../utils/colors';
import { TouchableOpacity, Swipeable } from 'react-native-gesture-handler';
import { fonts, myDimensi, windowHeight, windowWidth } from '../../utils/fonts';
import { useIsFocused } from '@react-navigation/native';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { showMessage } from 'react-native-flash-message';
import { Modalize } from 'react-native-modalize';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isInProgress,
    types,
} from 'react-native-document-picker'
export default function AAUpload({ navigation, route }) {

    const i = route.params;

    const [nama_file, setNamaFile] = useState('');
    const [path, setPath] = useState('');

    const sendServer = async () => {

        const formData = new FormData();
        formData.append('kode', i.kode);
        formData.append('nama_file', nama_file);
        formData.append('nama_link', path.name);
        formData.append('file_attachment', path);

        // console.log(formData);

        let zavalabs = await fetch(
            apiURL + 'v1_add_upload.php',
            {
                method: 'post',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data; ',
                },
            }
        );

        // let responseJson = await zavalabs.json();
        console.warn(zavalabs);

        showMessage({
            type: 'success',
            message: 'Data Kamu Berhasil Di Kirim'
        })
        navigation.goBack();

    }

    return (
        <SafeAreaView style={{
            flex: 1,
            padding: 10,
            backgroundColor: colors.white
        }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: myDimensi / 2,
                    color: colors.black
                }}>Pengirim</Text>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: myDimensi / 2,
                    color: colors.black
                }}>{i.nama_lengkap} - {i.dinas}</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: colors.border_card }} />
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: myDimensi / 2,
                    color: colors.black
                }}>Tanggal</Text>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: myDimensi / 2,
                    color: colors.black
                }}>{i.tanggal_indo} {i.jam}</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: colors.border_card }} />
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: myDimensi / 2,
                    color: colors.black
                }}>Judul Permintaan</Text>
                <Text style={{
                    fontFamily: fonts.primary[400],
                    fontSize: myDimensi / 2,
                    color: colors.black
                }}>{i.judul_permintaan}</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: colors.border_card }} />
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: myDimensi / 2,
                    color: colors.black
                }}>Deskripsi Permintaan</Text>
                <Text style={{
                    fontFamily: fonts.primary[400],
                    fontSize: myDimensi / 2,
                    color: colors.black
                }}>{i.deskripsi_permintaan}</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: colors.border_card }} />
                <MyGap jarak={20} />
                <MyInput onChangeText={x => setNamaFile(x)} iconname="create" placeholder="masukan judul / nama dokumen" label="Judul / Nama Dokumen" />
                <MyGap jarak={20} />
                <MyButton onPress={async () => {

                    try {
                        const res = await DocumentPicker.pick({
                            // Provide which type of file you want user to pick
                            type: [DocumentPicker.types.pdf],
                            // There can me more options as well
                            // DocumentPicker.types.allFiles
                            // DocumentPicker.types.images
                            // DocumentPicker.types.plainText
                            // DocumentPicker.types.audio
                            // DocumentPicker.types.pdf
                        });
                        // Printing the log realted to the file
                        console.log('res : ' + JSON.stringify(res));
                        // Setting the state to show single file attributes
                        console.log('sizw', res[0].size)
                        if (res[0].size > 5000000) {
                            alert('Maaf dokumen pdf maksimal 50 Mb')
                        } else {
                            setPath(res[0]);
                        }


                    } catch (err) {
                        setSingleFile(null);
                        // Handling any exception (If any)
                        if (DocumentPicker.isCancel(err)) {
                            // If user canceled the document selection
                            alert('Canceled');
                        } else {
                            // For Unknown Error
                            alert('Unknown Error: ' + JSON.stringify(err));
                            throw err;
                        }
                    }

                }} title="Pilih dokumen" warna={colors.secondary} Icons="cloud-upload-outline" />

                <Text style={{
                    fontFamily: fonts.secondary[600],
                    textAlign: 'center'
                }}>{path.name}</Text>

            </ScrollView>
            <MyButton onPress={sendServer} title="Kirim" warna={colors.primary} Icons="shield-checkmark-outline" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})