import { createStore } from 'vuex'

import AuthModule from './Auth/auth'
import FoodModule from './Food/food';
import NotifyModule from './Notify/notification'
import ToolsModule from './ToolStore/ToolStore'
import UserModule from './Users/Users';


const store = createStore({
    modules: {
        auth: AuthModule,
        food: FoodModule,
        notify: NotifyModule,
        tool: ToolsModule,
        users: UserModule,
    }
});

export default store 
