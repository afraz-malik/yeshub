import { bool } from "prop-types";

interface MessageType {
    [key: string] : any
}

let obj: MessageType = {};

const  ChatStorage = {

    messages: obj,
    threads: obj,
    isLoadingStatus: false,

    isLoading() {
        return this.isLoading;
    },

    setLoading() {
        this.isLoadingStatus = true;
    },

    setLoaded() {
        this.isLoadingStatus = false;
    },

    logThreads() {
        console.log(this.threads);
    },

    getAllThreads() { 
        return this.threads;
    },
    
    getThreads(id: string) {
        return this.threads[id];
    },

    hasThread(id: string) {
        return !!this.threads[id];
    },

    addThreads(id: string, thread: any) {
        if(!this.hasThread(id)) {
            this.threads[id] = thread;
        }
    },

    // user id or community id
    addNewThread(id: string, thread: any) {
        this.threads[id].push(thread);
    },

    getMessages(id: string) {
        return this.messages[id]
    },

    setMessages(id: string, _messages: any[]) {
        this.messages[id] = _messages
    },

    addNewMessage(id: string, msg: any) {
        if(this.hasMessages(id)){
            this.messages[id].push(msg)
        }        
    },

    hasMessages(id: string) {
        return !!this.messages[id];
    }

}

export default ChatStorage;