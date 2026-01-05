import { TextInput} from "react-native";

interface textInputProps{
    value:string,
    onChangeText:(text:string)=>void,
    placeholder:string,
    secureTextEntry:boolean,
    style:object,
    accessible:boolean,
    autoCapitalize:"none" | "sentences" | "words" | "characters" | undefined
}

const ReusableTextInput = (props:Partial<textInputProps>) => {

    const {value,onChangeText,placeholder,secureTextEntry,style,autoCapitalize,accessible} = props;
    return(
        <TextInput
            accessible={accessible}
            accessibilityLabel={value ? value : placeholder}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            style={style}
            autoCapitalize={autoCapitalize}
        />
    )

}     
export default ReusableTextInput;  