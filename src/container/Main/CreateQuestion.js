import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    TextInput,
    Text,
    useColorScheme,
    View,
    Button,
    Touchableopacity
} from 'react-native';
import InputSpinner from "react-native-input-spinner";

import { connect } from "react-redux";
import { signOut } from "../../redux/Actions/authActions";
import { strings } from '../../utils/i18n';
import { leng } from "../../utils/Static"
import { createQuestionSettings }  from "../../api/User"

import RadioButton from 'react-native-simple-radio-button-input';
import MultiSelect from 'react-native-multiple-select';

function CreateQuestion(props) {
    const [load, setLoad] = useState(true);
    const [check, setChecked] = useState(true);
    const [imageCheck, setImageCheck] = useState(true);
    const [selectLeng, setLectLeng] = useState(['eng']);
    const [number, setNumber] = useState(1);
    const [nameTest, setNameTest] = useState("");
    useEffect(() => {
        setLoad(false);
    }, [props])

    const nextStep = () => {
        if (nameTest !== "" && selectLeng !== []) {
            props.navigation.navigate('QuestionFill');
            props.createQuestionSettings({
                countQuesthion: number,
                name: nameTest,
                haveImage: imageCheck,
                multyplyanswer: check,
                lenguge: selectLeng,
                uid: props.uid
            })
        }
    }
    return (
        load ? <Text>Loadding</Text> :
            <>
                <Text>name</Text>
                <TextInput placeholder="name" onChangeText={(val) => {setNameTest(val); }} />
                <Text>count Question
                <InputSpinner
                    max={30}
                    min={1}
                    step={1}
                    colorMax={"#f04048"}
                    colorMin={"#40c5f4"}
                    value={number}
                    onChange={(num) => {
                        setNumber(num);
                    }}
                    />;
                </Text>
                <Text>option type </Text>
                <Text> multiplyAnswers</Text>
                <RadioButton
                    color={'red'}
                    selected={check ? true : false }
                    onPress={() => { setChecked(!check) }}
                />
                <Text> Image have or not</Text>
                <RadioButton
                    color={'red'}
                    selected={imageCheck ? true : false}
                    onPress={() => { setImageCheck(!imageCheck) }}
                />
                <View>
                    <MultiSelect
                        hideTags
                        items={leng}
                        uniqueKey="id"
                        onSelectedItemsChange={(item) => { setLectLeng(item)  }}
                        selectedItems={selectLeng}
                        selectText="Pick Items"
                        searchInputPlaceholderText="Search Items..."
                        altFontFamily="ProximaNova-Light"
                        tagRemoveIconColor="#CCC"
                        tagBorderColor="#CCC"
                        tagTextColor="#CCC"
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#000"
                        displayKey="name"
                        searchInputStyle={{ color: '#CCC' }}
                        submitButtonColor="#CCC"
                        submitButtonText="Submit"
                    />
                </View>
                <Button title="Next Step" onPress={nextStep} />
            </>

    )
}

const mapStateToProps = (state) => {

    const uid = state.firebase.auth.uid;
    const user = state.user;

    return {
        uid: uid,
        user: user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
        createQuestionSettings: (info) => dispatch(createQuestionSettings(info)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestion);

