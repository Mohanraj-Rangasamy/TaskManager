import {render} from '@testing-library/react-native';
import ReusableButton from '../Reusable_Button';

describe('ReusableButton Component', () => {
    it('should render the button with correct title', () => {
        const component = render(<ReusableButton title="Click Me" onPress={() => {}} />)
        expect(component).toMatchSnapshot();
        })
})