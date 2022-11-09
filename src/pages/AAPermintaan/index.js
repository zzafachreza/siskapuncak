import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { MyButton, MyGap, MyInput } from '../../components'
import { apiURL, colors, fonts, getData, myDimensi, urlToken } from '../../utils'
import axios from 'axios';
import { Icon } from 'react-native-elements';
import LottieView from 'lottie-react-native'
import { showMessage, hideMessage } from "react-native-flash-message";


export default function AAPermintaan({ navigation, route }) {
    const [user, setUser] = useState({});
    const [key, setKey] = useState('');
    const [loading, setLoading] = useState(false)
    const [penerima, setPenerima] = useState([]);
    const [open, setOpen] = useState(false);
    const [kirim, setKirim] = useState({
        api_token: urlToken,
        judul_permintaan: '',
        deskripsi_permintaan: '',
        penerima: []
    });
    useEffect(() => {
        getData('user').then(u => {
            setUser(u);
            setKirim({
                ...kirim,
                nama_pengirim: u.nama_lengkap,
                fid_user: u.id
            })
        })
    }, []);



    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>

            <ScrollView>
                <MyInput label="Nama Pengirim" iconname="person" placeholder="masukan nama" value={kirim.nama_pengirim} onChangeText={x => setKirim({ ...kirim, nama_pengirim: x })} />
                <MyGap jarak={10} />
                <MyInput label="Judul Permintaan" iconname="documents" placeholder="masukan judul" value={kirim.judul_permintaan} onChangeText={x => setKirim({ ...kirim, judul_permintaan: x })} />
                <MyGap jarak={10} />
                <MyInput label="Deskripsi Permintaan" multiline iconname="create" placeholder="masukan deskripsi" value={kirim.deskripsi_permintaan} onChangeText={x => setKirim({ ...kirim, deskripsi_permintaan: x })} />
                <MyGap jarak={10} />

                <MyInput label="Cari Penerima" iconname="person-add" placeholder="cari nama" value={key} onChangeText={x => setKey(x)} onSubmitEditing={event => {


                    axios.post(apiURL + 'v1_pengguna.php', {
                        api_token: urlToken,
                        key: event.nativeEvent.text
                    }).then(u => {
                        console.log(u.data);
                        setPenerima(u.data);
                        setOpen(true)
                    })

                }} />

                <ScrollView horizontal style={{

                }}>
                    {kirim.penerima.map(i => {
                        return (
                            <View style={{
                                flexDirection: 'row',
                                backgroundColor: colors.border_card,
                                padding: 10,
                                margin: 5,
                            }}>
                                <Text>{i.nama_lengkap}</Text>
                                <TouchableOpacity onPress={() => {
                                    console.log('id delete', i.id)
                                    const tmp = kirim.penerima.filter(word => word.id !== i.id);
                                    console.log(tmp);
                                    setKirim({
                                        ...kirim,
                                        penerima: tmp
                                    })

                                }} style={{
                                    // width: 20,
                                    borderRadius: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Icon type='ionicon' name='close-circle-outline' />
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </ScrollView>


                {open && <View style={{
                    marginVertical: 10,
                    paddingTop: 10,
                    backgroundColor: colors.white
                }}>
                    <TouchableOpacity onPress={() => {
                        setOpen(false);
                        setPenerima([]);
                    }} style={{
                        backgroundColor: colors.danger,
                        width: 80,
                        alignSelf: 'center',
                        borderRadius: 10,
                    }}>
                        <Text style={{
                            fontSize: myDimensi / 2,
                            color: colors.white,
                            textAlign: 'center'
                        }}>Tutup</Text>
                    </TouchableOpacity>
                    {penerima.map(i => {

                        return (
                            <View style={{
                                padding: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: colors.border_card,
                                flexDirection: 'row'
                            }}>
                                <View style={{
                                    flex: 1,
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.secondary[400],
                                        fontSize: myDimensi / 2.5
                                    }}>{i.nama_lengkap}</Text>
                                    <Text style={{
                                        fontFamily: fonts.secondary[400],
                                        fontSize: myDimensi / 3,
                                        color: colors.primary,
                                    }}>{i.dinas}</Text>
                                </View>
                                <TouchableOpacity onPress={() => {
                                    setKirim({
                                        ...kirim,
                                        penerima: [...kirim.penerima, {
                                            id: i.id,
                                            nama_lengkap: i.nama_lengkap
                                        }]
                                    })
                                }} style={{
                                    backgroundColor: colors.primary,
                                    paddingHorizontal: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.secondary[600],
                                        fontSize: myDimensi / 1.5,
                                        color: colors.white
                                    }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        )

                    })}

                </View>}



            </ScrollView>
            <View>
                <MyButton onPress={() => {
                    setLoading(true);
                    console.log(kirim);

                    axios.post(apiURL + 'v1_add_permintaan.php', kirim).then(res => {
                        console.warn(res.data);
                        navigation.replace('MainApp');
                        setLoading(false);
                        showMessage({
                            message: 'Data berhasil dikirim',
                            type: 'success'
                        })
                    })
                }} warna={colors.primary} title="Kirim Permintaan" Icons="cloud-upload-outline" />
            </View>
            {
                loading && (
                    <LottieView
                        source={require('../../assets/animation.json')}
                        autoPlay
                        loop
                        style={{ backgroundColor: colors.primary }}
                    />
                )
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})