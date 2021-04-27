import React, { useState, useEffect } from 'react';
import {
    TouchableOpacity,
    ScrollView,
    StatusBar,
    TextInput,
    Text,
    StyleSheet,
    View,
    Button,
    Touchableopacity
} from 'react-native';
import InputSpinner from "react-native-input-spinner";
import * as ImagePicker from "react-native-image-picker";
import { connect } from "react-redux";
import { signOut } from "../../redux/Actions/authActions";
import { AddQuesthion } from "../../redux/Actions/questionsActions";
import { QuesthionFinish } from "../../api/User"
import { strings } from '../../utils/i18n';
import { leng } from "../../utils/Static"
import { isEmpty } from 'lodash';
import RadioButton from 'react-native-simple-radio-button-input';
import MultiSelect from 'react-native-multiple-select';


function QuestionFill(props) {
    const [Question, setQuestion] = useState({});
    const [inputs, setInputs] = useState([]);
    const [whichQuestion, setWhichQuestion] = useState(1);
    const [load, setLoad] = useState(true);
    const [correctAnwser, setCorrectAnwser] = useState([]);
    const [image, setImage] = useState([]);
    useEffect(() => {
        const _arr = {}
        props.setting.lenguge.map((el, index) => {
            _arr[el] = { key: '', value: '' };

        });
        setQuestion(_arr);
    }, [whichQuestion]);
    useEffect(() => {
        setLoad(false);
    }, [props])

    const createInputForLenguge = (input, key) => {
        if (input !== undefined && key !== undefined) {
            return props.setting.lenguge.map((el, index) => {
                return (
                    <>
                        <TextInput placeholder={`version in lenguage ${el}`}
                            value={input.value} onChangeText={(text) => inputHandler(el, text, key)} />
                    </>
                )
            })
        } else {
            return props.setting.lenguge.map((el, index) => {
                return (
                    <TextInput placeholder={`write your questhion in ${el} lenguage`}
                        value={Question[el].value}   onChangeText={(text) => inputQuestion(el, text, index)} />
                )
            })
        }
    }

    const createImage = () => {
        return inputs.map((el, index) => {
            return (
                <>
                    <Text> {cheak(inputs[index]) ? "image upload" : "pleaze upload image"}</Text>
                    <Button title="Choose Photo" onPress={() => { handleChoosePhoto(index) }} />
                    <Button title={inputs[index].correctAnswer === true ? "this is correct anwser" : "this is wrong anwser"}
                        onPress={() => { correctAnswer(index) }} />
                </>
            )
        })
    }

    // method 
    const addHandler = () => {
        const _inputs = [...inputs];
        const _arr = {};
        props.setting.lenguge.map((el, index) => {
            if (props.setting.haveImage) {
                _arr[el] = { key: index, value: {}, point: 0.1 };
            } else {
                _arr[el] = { key: '', value: '', point:0.1 };
            }
            _arr.correctAnswer = false;
        });
        _inputs.push(_arr);
        setInputs(_inputs);
    }

    const inputHandler = (leng, value, key) => {
        const _inputs = [...inputs];
        _inputs[key][leng].value = value;
       
        _inputs[key][leng].key = key;
        _inputs[key][leng].point = 0.1;
        setInputs(_inputs);
    }
    const inputQuestion = (leng, text, key) => {
        const newobj = { ...Question}
        newobj[leng].value = text;
        newobj[leng].key = key;
        setQuestion(newobj);
    }
    const handleChoosePhoto = (key) => {
        const newImage = [...inputs];
        const options = {
            noData: true,
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                props.setting.lenguge.map((leng, index) => {
                    newImage[key][leng].value = response;
                    newImage[key][leng].key = key;
                    newImage[key][leng].point = 0.1;
                })
                setInputs([...newImage])
            }
        })
    }
    const cheak = (obj) => {
        return props.setting.lenguge.every((el, index) => {
            return !isEmpty(obj[el].value)
        });
    }
    const correctAnswer = (key) => {
        const newarr = [...correctAnwser];
        let newInput = [...inputs];
        if (props.setting.multyplyanswer === true && cheak(newInput[key]) && (newarr.filter(x => x === true).length < newInput.length - 1 || newInput[key].correctAnswer === true)) {
            newInput[key].correctAnswer = !newInput[key].correctAnswer;
            props.setting.lenguge.map((leng, index) => {
                newInput[key][leng].point = newInput[key].correctAnswer ? 1 :0.1;
            })
            setInputs(newInput);
            newarr[key] = newInput[key].correctAnswer;
            setCorrectAnwser([...newarr]);
        } else if (props.setting.multyplyanswer === false &&
            ((correctAnwser.filter(x => x === true).length < 1 && correctAnwser.length <= 1) || newInput[key].correctAnswer === true)
            && cheak(newInput[key])) {
            newInput[key].correctAnswer = !newInput[key].correctAnswer;
            props.setting.lenguge.map((leng, index) => {
                newInput[key][leng].point = newInput[key].correctAnswer ? 1 : 0.1;
            })
            setInputs(newInput);
            newarr[0] = newInput[key].correctAnswer;
            setCorrectAnwser([...newarr]);
        }

    }
    const nextQuestion = (leng, text) => {
        if (cheak(Question) && !isEmpty(correctAnwser) && correctAnwser.includes(true) &&
            whichQuestion <= props.setting.countQuesthion) {
            const resultObj = {
                Question: Question,
                variant: inputs,
            }
            props.AddQuesthion(resultObj);
            let quest = whichQuestion + 1
            setWhichQuestion(quest);
            setInputs([]);
            setCorrectAnwser([]);
            setImage([]);
        }
    }
    const finish = async () => {
        if (cheak(Question) && !isEmpty(correctAnwser) && correctAnwser.includes(true) &&
            whichQuestion <= props.setting.countQuesthion) {
            const resultObj = {
                Question: Question,
                variant: inputs,
            }
          await  props.AddQuesthion(resultObj);
            props.QuesthionFinish();
            setWhichQuestion(1);
            setInputs([]);
            setCorrectAnwser([]);
            setImage([]);
        }
    }
    return (
        load ? <Text>Loadding</Text> :
            <>
                <Text>Qusethion  {whichQuestion}</Text>
                <Text>Write Your Questhion</Text>
                {
                    createInputForLenguge()
                }
                <Text>Write Your Version Anwser</Text>
                {
                    props.setting.haveImage === true ? <>
                        {createImage()}
                    </> : inputs.map((input, key) => {
                        return (
                            <>
                                <Text>new version anwser</Text>
                                { createInputForLenguge(input, key)}
                                <Button title={inputs[key].correctAnswer === true ? "this is correct anwser" : "this is wrong anwser"}
                                    onPress={() => { correctAnswer(key) }} />
                            </>
                        )
                    })
                }

                {inputs.length <= 10 && props.setting.haveImage === false ? <Button title="Add" onPress={addHandler} /> : <Button title="Picture" onPress={addHandler} />}

                {((inputs.length >= 2 || image.length >= 2) && whichQuestion !== props.setting.countQuesthion) ? <Button title="Next" onPress={nextQuestion} /> : null}
                {whichQuestion === props.setting.countQuesthion ? <Button title="Finish" onPress={finish} /> : null}

            </>
        )
}
const mapStateToProps = (state) => {
    const setting = state.questionReducer.settings;
    return {
        setting: setting,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
        AddQuesthion: (question) => dispatch(AddQuesthion(question)),
        QuesthionFinish: (object) => dispatch(QuesthionFinish(object))
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionFill);

