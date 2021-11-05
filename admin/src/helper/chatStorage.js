import { bool } from "prop-types";




const  ChatStorage = {

    messages: {},
    threads: {},
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
    
    getThreads(id) {
        return this.threads[id];
    },

    hasThread(id) {
        return !!this.threads[id];
    },

    addThreads(id, thread) {
        if(!this.hasThread(id)) {
            this.threads[id] = thread;
        }
    },

    // user id or community id
    addNewThread(id, thread) {
        this.threads[id].push(thread);
    },

    getMessages(id) {
        return this.messages[id]
    },

    setMessages(id, _messages) {
        this.messages[id] = _messages
    },

    addNewMessage(id, msg) {
        if(this.hasMessages(id)){
            this.messages[id].push(msg)
        }        
    },

    hasMessages(id) {
        return !!this.messages[id];
    }

}

export default ChatStorage;