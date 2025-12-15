import { TextInput} from "react-native";

interface textInputProps{
    value:string,
    onChangeText:(text:string)=>void,
    placeholder:string,
    secureTextEntry:boolean,
    style:object,
    autoCapitalize:"none" | "sentences" | "words" | "characters" | undefined
}

const ReusableTextInput = (props:Partial<textInputProps>) => {

    const {value,onChangeText,placeholder,secureTextEntry,style,autoCapitalize} = props;
    return(
        <TextInput
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