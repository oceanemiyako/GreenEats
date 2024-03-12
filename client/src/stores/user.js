import { defineStore } from 'pinia';

export const useUserStore = defineStore({
id: 'user',
state: () => ({
    users: [],
    currentUser: null,
}),
actions: {
    registerUser(newUser) {
        this.users.push(newUser);
        console.log(newUser)
        },
    loginUser(credentials){
        const foundUser = this.users.find(user => user.username === credentials.username && user.password === credentials.password);
        if (foundUser) {
        this.currentUser = foundUser;
            return true;   
        } else {
            return false;
           
        }
        
       }
    },
});




