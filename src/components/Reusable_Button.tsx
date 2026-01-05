import { AccessibilityRole } from '../types/task';
import {Button,View} from 'react-native'

interface buttonProps{
    title:string,
    onPress:()=>void,
    disabled:boolean
}

const ReusableButton = (props:Partial<buttonProps>) => {

    const {title,onPress,disabled} = props;

    return(
        <View>
            <Button
                accessible={true}
                accessibilityRole={AccessibilityRole.BUTTON}
                accessibilityLabel={title}
                title={title}
                onPress={onPress}
                disabled = {disabled}
            />
        </View>
    )
}
export default ReusableButton;