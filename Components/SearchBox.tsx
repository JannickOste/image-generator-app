import { TextInput, Button } from "react-native";

import { useState } from "react";

type SearchBoxProps = {
    placeholder?: string;
    onSubmit: (str: string) => void;
}

type SearchBoxState = {
    text: string;
}

const SearchBox = ({placeholder, onSubmit}: SearchBoxProps) => {
    const [state, setState] = useState<SearchBoxState>({text: ""});

    return (
        <>
            <TextInput onChangeText={(txt) => setState({... state, text: txt})} style={{color: "white", height: 70}} placeholder={placeholder} />
            <Button 
                title="Search" 
                onPress={() => onSubmit(state.text)}
            />
        </>
    )
}

export default SearchBox;