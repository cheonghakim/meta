import { Mutation, Module, VuexModule, Action } from "vuex-module-decorators";
import LoginAPI from "@/api/app/LoginAPI";
import Vue from "vue";
interface UserInfo {
  acctId: string | undefined;
  info: object | null;
}

@Module
class UserModule extends VuexModule implements UserInfo {
  acctId: string | undefined = undefined;
  info: object | null = null;

  get isLogin() {
    return this.acctId && this.info;
  }

  @Mutation
  GET_USER_INFO_COMMIT({ info }: any) {
    this.info = info;
  }

  @Action
  async GET_USER_INFO() {
    try {
      const { data } = await LoginAPI.v1.tryGetUserInfo();
      if (data && data.result) {
        this.context.commit("GET_USER_INFO_COMMIT", { info: data.result });
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default UserModule;
