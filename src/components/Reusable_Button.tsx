import {Button,View} from 'react-native'

interface buttonProps{
    title:string,
    onPress:()=>void,
    disabled:boolean
}

const ReusableButton = (props:Partial<buttonProps>) => {

    const {title,onPress,disabled} = props;

    return(
        <View 
            accessible={true}
            accessibilityRole={'button'}
            accessibilityLabel={title}
        >
            <Button
                title={title}
                onPress={onPress}
                disabled = {disabled}
            />
        </View>
    )
}
export default ReusableButton;