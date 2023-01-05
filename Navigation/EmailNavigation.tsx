import { EmailView } from '../PaneComponents/EmailPaneComponents/EmailView';
import { EmailListView } from '../PaneComponents/EmailPaneComponents/EmailListView';
import { EmailNavStack } from './EmailStackNav';

export const EmailNavigation = () => {
    return (
        <EmailNavStack.Navigator initialRouteName="EmailListView">
            <EmailNavStack.Screen name="EmailListView" component={EmailListView} options={{headerShown: false}}></EmailNavStack.Screen>
            <EmailNavStack.Screen name="EmailView" component={EmailView} options={{headerShown: false}}></EmailNavStack.Screen>
        </EmailNavStack.Navigator>
    ); 
}