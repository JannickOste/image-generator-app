import { TextInput, Button, View, StyleSheet, Pressable, Text } from "react-native";

import React, { useState } from "react";

type SearchBoxProps = {
    placeholder?: string;
    onSubmit: (str: string) => void;
}

type SearchBoxState = {
    text: string;
}

const styles = StyleSheet.create({
    container: {
        display: "flex", 
        margin: 5,
        flexDirection: "row",
        borderColor: "#CCC",
        borderStyle: "solid",
        borderWidth: 10
    },
    textbox: {
        flex: 4,
        backgroundColor: "#DDD",
        padding: 20,
        color: "#555"
    },
    button: {
        backgroundColor: "#2596be",
        flex: 1
    },
    buttonText: {
        padding: 20,    
        alignSelf: "center",
        justifyContent: "center",
        marginVertical: "auto", 
        color: "#fff"
    }
});

const SearchBox = ({placeholder, onSubmit}: SearchBoxProps) => {
    const [state, setState] = useState<SearchBoxState>({text: ""});

    return (
        <View style={styles.container}>
            <TextInput onChangeText={(txt) => setState({... state, text: txt})} style={styles.textbox} placeholder={placeholder} />
            <Pressable style={styles.button} onPress={() => onSubmit(state.text)}><Text style={styles.buttonText}>Search</Text></Pressable>
        </View>
    )
}

export default SearchBox;