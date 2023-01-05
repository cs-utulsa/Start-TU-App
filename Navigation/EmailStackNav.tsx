import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { EmailView } from '../PaneComponents/EmailPaneComponents/EmailView';
import { EmailListView } from '../PaneComponents/EmailPaneComponents/EmailListView';
import { Email_Data } from '../Database/Email';

type EmailStackParamList = {
    EmailListView: undefined;
    EmailView: Email_Data | undefined;
}

export const EmailNavStack = createNativeStackNavigator<EmailStackParamList>();
