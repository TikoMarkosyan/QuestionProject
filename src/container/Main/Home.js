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
} from 'react-native';
import { connect } from "react-redux";
import { signOut } from "../../redux/Actions/authActions";
import { strings } from '../../utils/i18n';

function Home(props) {
    const [load, setLoad] = useState(true);

    useEffect(() => {
        setLoad(false);
    }, [props])

    return (

        load ? <Text>Loadding</Text> :
            <>
                <Button title="CrateTable" onPress={() => { props.navigation.navigate('CreateQuestion'); }} />
                <Button title={strings("home.logout")} onPress={() => { props.signOut() }} />
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);