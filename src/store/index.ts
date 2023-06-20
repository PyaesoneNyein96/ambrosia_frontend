import { createStore } from 'vuex'

import AuthModule from './Auth/auth'
import FoodModule from './Food/food';
import NotifyModule from './Notify/notification'
import ToolsModule from './ToolStore/ToolStore'
import UserModule from './Users/Users';
import PackageModule from './Package/package';
import CartModule from './Cart/cart'


const store = createStore({
    modules: {
        auth: AuthModule,
        food: FoodModule,
        notify: NotifyModule,
        tool: ToolsModule,
        users: UserModule,
        package: PackageModule,
        cart: CartModule
    }
});

export default store 
