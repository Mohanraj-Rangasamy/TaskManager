import {render} from '@testing-library/react-native';
import ReusableTextInput from '../Reusable_textInput';

describe('ReusableTextInput Component', () => {
    it('should render correctly with given props', () => {
        const component = render(
            <ReusableTextInput
                value="Test Value"  />
        )
        expect(component).toMatchSnapshot();
    })
     it('should render correctly without props', () => {
        const component = render(
            <ReusableTextInput  />
        )
        expect(component).toMatchSnapshot();
    })
});
