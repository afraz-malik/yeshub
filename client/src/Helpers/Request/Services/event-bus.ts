const EventBus = {
    on : (event:any, callback: any) => {
        document.addEventListener(event, (e)=>callback(e));
    },
    dispatch: (event: any, data: any) => {
        document.dispatchEvent(new CustomEvent(event, data))
    },

    remove: (event: any, callback: any) =>{
        document.removeEventListener(event, callback);
    }
}

export default EventBus;