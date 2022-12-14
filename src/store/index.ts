import { createStore } from 'vuex'
import { config } from 'vuex-module-decorators'

import UserModule from '@/store/modules/userModule'

config.rawError = true

export default createStore({
  modules: { UserModule },
})
