import {action, computed, makeObservable, observable} from "mobx";

interface UserInterface {
    accessToken:string
    uid:string
    isLogged: boolean
}

class UserStore {
    user:UserInterface = {
        accessToken:'',
        uid:'',
        isLogged: false
    }

    constructor() {
        makeObservable(this,{
            user:observable,
            setUser: action,
            removeUser: action,
            isLogged: computed
        })
    }

    setUser({accessToken, uid}:UserInterface){
        this.user.accessToken = accessToken
        this.user.uid = uid
        this.user.isLogged = true
        console.log('this.user',this.user)
    }

    removeUser(){
        this.user.accessToken = ''
        this.user.uid = ''
        this.user.isLogged = false
    }

    get isLogged(){
        return this.user.isLogged
    }

}

export const userStore = new UserStore()
