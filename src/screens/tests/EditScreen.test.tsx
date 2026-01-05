import { fireEvent, render } from '@testing-library/react-native';
import EditScreen from '../EditScreen';

const mockData = {
  id: '123',
  title: 'Test Task',
  completed: false,
};

jest.mock('../../hooks/useTasks', () => {
  return {
    useTasks: () => ({
        tasks: [mockData],
        updateTask: jest.fn(),
    }),

  }
})

describe('EditScreen', () => {
  it('should render correctly', () => {
    
    const component = render(<EditScreen route={{ params: { id: '123' } }} />);  
    expect(component).toMatchSnapshot()
    })
    it('should cover button click', () => {
         const mockGoBack = jest.fn();
        const navigation = {
      goBack: mockGoBack,
    } as any;
 
     const {getByTestId} = render(<EditScreen navigation={navigation} route={{ params: { id: '123'} }} />);  
     const button = getByTestId('save-button');
     fireEvent.press(button);
    })
})