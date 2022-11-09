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

export default function Wish({ navigation }) {
    const isFocused = useIsFocused();
    const [user, setUser] = useState({});

    useEffect(() => {
        if (isFocused) {
            getData('user').then(rx => {
                setUser(rx);
                __getTransaction(rx.id);
            });

        }
    }, [isFocused]);


    const [data, setData] = useState([]);


    const __getTransaction = (x) => {
        axios.post(apiURL + 'v1_favorit.php', {
            fid_user: x,
            api_token: urlToken
        }).then(res => {
            console.warn(res.data);
            setData(res.data)
        })
    }

    const hanldeHapus = (x, fid_user) => {
        axios.post(apiURL + 'v1_favorit_delete.php', {
            id_favorit: x,
            api_token: urlToken
        }).then(res => {
            showMessage({
                type: 'success',
                message: 'Favorit berhasil dihapus'
            })
            console.warn(res.data);
            __getTransaction(fid_user);
        })
    }

    const __renderItem = ({ item }) => {
        return (
            <Swipeable renderRightActions={() => {
                return (
                    <TouchableWithoutFeedback
                        onPress={() => hanldeHapus(item.id, user.id)}>
                        <View
                            style={{
                                // flex: 1,
                                width: 80,
                                backgroundColor: colors.border_label,
                                // padding: 20,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Icon
                                name="trash"
                                size={myDimensi}
                                color={colors.white}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                );
            }}>
                <View style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border_form,
                    margin: 5,
                    borderRadius: 5,
                    flexDirection: 'row'
                }}>
                    <View style={{ padding: 10, }}>
                        <Image style={{
                            width: 60,
                            resizeMode: 'contain',
                            height: 50,
                        }} source={{
                            uri: item.image
                        }} />
                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 14
                        }}>{item.nama_barang}</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[400],
                            fontSize: 12
                        }}>{item.keterangan_barang}</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[400],
                            fontSize: 10,
                            color: colors.primary,
                        }}>Rp. {new Intl.NumberFormat().format(item.harga_barang)}</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Product', item)} style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                        padding: 20,
                        backgroundColor: colors.primary,
                    }}>
                        <Icon name='shopping-cart' size={myDimensi / 1.5} color={colors.white} />
                    </TouchableOpacity>

                </View>
            </Swipeable>
        )
    }

    return (
        <SafeAreaView style={{
            // flex: 1,
            // padding: 10,
        }}>
            <FlatList data={data} renderItem={__renderItem} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})