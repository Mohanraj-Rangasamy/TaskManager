import {Button} from 'react-native'

interface buttonProps{
    title:string,
    onPress:()=>void,
    disabled:boolean
}

const ReusableButton = (props:Partial<buttonProps>) => {

    const {title,onPress,disabled} = props;

    return(
        <Button
            title={title}
            onPress={onPress}
            disabled = {disabled}
        />
    )
}
export default ReusableButton;