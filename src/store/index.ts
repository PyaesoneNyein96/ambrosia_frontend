import { createStore } from 'vuex'

import AuthModule from './Auth/auth'
import FoodModule from './Food/food';
import NotifyModule from './Notify/notification'
import ToolStore from './ToolStore/ToolStore'


const store = createStore({
    modules: {
        auth: AuthModule,
        food: FoodModule,
        notify: NotifyModule,
        tool: ToolStore
    }
});

export default store 
