(this.webpackJsonpyeshub=this.webpackJsonpyeshub||[]).push([[20],{359:function(e,t,a){"use strict";var s=a(3),n={uploadFile:function(e){return s.a.post("media/upload",e)},deleteFile:function(e){return s.a.delete("media/upload",{data:{file:e}})}};t.a=n},389:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var s=a(8),n=function(e){return s.i.test(e)}},390:function(e,t,a){"use strict";var s=a(64),n=a(65),o=a(51),r=a(67),c=a(66),i=a(0),l=a.n(i),d=a(359),m=a(31),g={width:"60px",opacity:.4},u=(l.a.createRef(),function(e){Object(r.a)(a,e);var t=Object(c.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={file:"",imagePreviewUrl:"",imageShow:!1,inputFile:{},loading:!1,fileBtn:{},onImageChange:function(){}},n.onSentMessage=n.props.onSentMessage,n._handleImageChange=n._handleImageChange.bind(Object(o.a)(n)),n._handleSubmit=n._handleSubmit.bind(Object(o.a)(n)),n.onClose=n.onClose.bind(Object(o.a)(n)),n._handleFile=n._handleFile.bind(Object(o.a)(n)),m.a.on("message-sent",(function(){console.log("message recieved in child using even bus"),n.setState({imageShow:!1}),n.setState({imagePreviewUrl:""}),n.setState({loading:!1})})),n}return Object(n.a)(a,[{key:"onSentMessage",value:function(e){console.log("event recieved inside child component ...")}},{key:"_handleSubmit",value:function(e){e.preventDefault()}},{key:"_handleFile",value:function(e){var t;e.preventDefault(),null===(t=this.state.fileBtn.current)||void 0===t||t.click(),console.log(this.state.fileBtn)}},{key:"_handleImageChange",value:function(e){var t=this,a=new FileReader;this.setState({inputFile:e.target}),this.setState({loading:!0});var s=e.target.files[0],n=new FormData;n.append("images",s),a.onloadend=function(){t.setState({file:s,imagePreviewUrl:a.result,imageShow:!0})},a.readAsDataURL(s),this.props.imageUploadStarts(),d.a.uploadFile(n).then((function(e){console.log(e.data),t.props.onImageChange(e.data.data),t.setState({loading:!1})}))}},{key:"onClose",value:function(){this.setState({inputFile:null}),this.setState({imagePreviewUrl:""}),this.setState({imageShow:!1}),this.setState({loading:!1}),this.props.onImageClosed("")}},{key:"render",value:function(){return l.a.createElement("div",{className:"image--uploader--container flex"},this.state.imageShow?l.a.createElement("div",{className:"full--width"}," ",l.a.createElement("i",{onClick:this.onClose,className:"fa image--uploader--close fa-times-circle-o text-danger"})," "):"",this.state.loading?l.a.createElement("div",{className:"image--uploader--loading"},l.a.createElement("i",{className:"centered fa fa-spinner fa-pulse"})):"",this.state.imagePreviewUrl?l.a.createElement("img",{style:g,src:this.state.imagePreviewUrl,alt:""}):"",this.state.imageShow?"":l.a.createElement(l.a.Fragment,null,l.a.createElement("i",{onClick:this._handleFile,className:"fa fa-picture-o lg-fonts"}),l.a.createElement("input",{ref:this.state.fileBtn,id:"image--uploader--button",className:"class--hidden",type:"file",onChange:this._handleImageChange})))}}]),a}(i.Component));t.a=u},531:function(e,t,a){"use strict";a.r(t);var s=a(21),n=a(64),o=a(65),r=a(51),c=a(67),i=a(66),l=a(0),d=a.n(l),m=a(49),g=a(118),u=a(105),h=a(50),v=a(87),f=a(122),p=a(31),b=a(389),S=a(19),E=a(390),I=a(74),U={padding:"0 2px"},C="".concat(window.location.protocol,"//").concat("localhost:4000","/"),N=function(e){return Object(v.a)(e)||Object(f.a)(e)?e:C+e},T={width:"50%",borderRadius:"0px",borderTopLeftRadius:"10px"},D={width:"50%",borderRadius:"0px",borderTopRightRadius:"10px"},w={height:"68px"},M=function(e,t){for(var a=0;a<e.length;a++)if(e[a].conversationID==t.conversationID){e.splice(a,1);break}return e},y=d.a.createRef(),O=d.a.createRef(),j=function(e){Object(c.a)(a,e);var t=Object(i.a)(a);function a(e){var o;return Object(n.a)(this,a),(o=t.call(this,e)).style={height:"350px",border:"1px solid gray",padding:"10px",overflow:"auto"},o.clearCounter=function(){for(var e=o.state.threads,t=0;t<e.length;t++)if(e[t].conversationID===o.state.selectedUser.conversationID){e[t].counter=0,e[t].seen=!0;break}o.setState({threads:e})},o.toggle=function(){console.log("toggleing ..."),o.setState({isOpen:!o.state.isOpen})},o.unarchive=function(e){u.a.unArchiveChat(e).then((function(e){Object(m.a)(e.data.message?e.data.message:"Conversation Unarchived successfully","success"),o.state.activeThreads.push(o.state.selectedUser);var t=M(o.state.archivedThreads,o.state.selectedUser);o.setState({archivedThreads:t}),o.setState({selectedUser:o.state.archivedThreads[0]||{},threads:o.state.archivedThreads}),o.state.selectedUser.conversationID?o.getMessages(o.state.selectedUser.conversationID):o.setState({messages:[]})}),(function(e){return console.log(e.message)}))},o.archive=function(e){u.a.archiveChat(e).then((function(t){Object(m.a)(t.data.message?t.data.message:"Conversation Archived Successfully","success"),o.state.archivedThreads.push(o.state.selectedUser);var a=M(o.state.activeThreads,o.state.selectedUser);o.setState({activeThreads:a}),o.setState({selectedUser:o.state.activeThreads[0]||{},threads:o.state.activeThreads}),o.state.selectedUser.conversationID?o.getMessages(o.state.selectedUser.conversationID):o.setState({messages:[]}),console.log("conversation ID ",e)}),(function(e){return console.log(e.message)}))},o.msgSeen=function(){p.a.dispatch("msg-seen",{detail:null})},o.scrollToBottom=function(){y.current.scrollIntoView({behavior:"smooth",block:"end"})},o.selectUser=function(e){console.log("user is selected",e),o.setState({selectedUser:e}),I.a.hasMessages(e.conversationID)?o.setState({messages:I.a.getMessages(e.conversationID)},(function(){o.scrollToBottom()})):u.a.getMessagesByConversation(e.conversationID).then((function(t){console.log(t.data),o.setState({messages:t.data}),I.a.setMessages(e.conversationID,t.data),o.scrollToBottom()}))},o.sendMessage=function(e){e.preventDefault();var t={message:o.state.currentMsg};o.state.currentImage&&(t.image=o.state.currentImage),u.a.sendToConversation(o.state.selectedUser.conversationID,t).then((function(e){console.log("message sent ",e.data),I.a.addNewMessage(e.data.data.conversationID,e.data.data),o.setState({messages:I.a.getMessages(e.data.data.conversationID)}),o.scrollToBottom()}),(function(e){return console.log(e)})),o.setState({currentMsg:""}),o.setState({currentImage:""}),p.a.dispatch("message-sent",{})},o.handleChange=function(e){o.setState({currentMsg:e.target.value})},o.onImageClosed=function(e){return o.setState({currentImage:e})},o.onChildImageChange=function(e){o.setState({currentImage:e})},o.schedule=function(){setInterval((function(){return o.getMessages(o.state.selectedUser.conversationID)}),5e3)},o.getUserThreads=function(){var e=[],t=[],a=I.a.getAllThreads();for(var n in console.log(a),a)e.push.apply(e,Object(s.a)(a[n].data)),t.push.apply(t,Object(s.a)(a[n].archived));console.log("threads",e),console.log("archived",t),o.setState({threads:e}),o.setState({activeThreads:e}),o.setState({archivedThreads:t}),o.setState({selectedUser:e[0]||{}}),o.getMessages(e[0].conversationID||"")},o.updateThread=function(e,t){console.log(t);for(var a=o.state.threads,s=0;s<a.length;s++)if(a[s].conversationID==e){a[s].seen=!1,a[s].counter+=1,a[s].lastMessage=t.message,I.a.addNewMessage(e,t);break}o.state.selectedUser.conversationID==e&&(o.setState({messages:I.a.getMessages(e)}),o.scrollToBottom()),o.setState({threads:a})},o.activateThreads=function(){o.state.isActive||(o.setState({threads:o.state.activeThreads}),o.setState({isActive:!0}),o.setState({selectedUser:o.state.activeThreads[0]||{}}),setTimeout((function(){o.state.selectedUser.conversationID?o.getMessages(o.state.selectedUser.conversationID):o.setState({messages:[]})}),100))},o.toggleThreads=function(e){o.state.isActive&&(o.setState({isActive:!1}),o.setState({threads:o.state.archivedThreads}),o.setState({selectedUser:o.state.archivedThreads[0]||{}}),setTimeout((function(){o.state.selectedUser.conversationID?o.getMessages(o.state.selectedUser.conversationID):o.setState({messages:[]})}),0))},o.componentDidMount=function(){console.log("this is mod inbox"),I.a.logThreads(),p.a.on("message-"+o.state.userID,(function(e){console.log("new message",e),o.updateThread(e.detail.conversationID,e.detail)})),p.a.on("com-message-"+o.state.paramID,(function(e){console.log("new message",e.detail),o.updateThread(e.detail.conversationID,e.detail)})),document.body.addEventListener("click",(function(){console.log("clicked window"),o.state.isOpen&&setTimeout((function(){o.setState({isOpen:!1})}),200)})),"user"==o.state.paramID?o.getUserThreads():u.a.getThreadsForMods(o.state.paramID).then((function(e){var t;console.log(e.data);var a=e.data.data;console.log(a),a.forEach((function(e){e.counter=0,e.seen=!0})),o.setState({threads:a}),o.setState({activeThreads:e.data.data}),o.setState({archivedThreads:e.data.archived}),o.setState({selectedUser:e.data.data[0]||{}}),o.getMessages((null===(t=e.data.data[0])||void 0===t?void 0:t.conversationID)||"")}))},o.componentWillUnmount=function(){document.body.removeEventListener("click",(function(){}))},o.state={selectedUser:{},messages:[],currentMsg:"",threads:[],archivedThreads:[],activeThreads:[],paramID:o.props.match.params.id,currentImage:"",userID:JSON.parse(localStorage.getItem("STORAGE_USER_PROFILE")||"{}")._id||"",isActive:!0,isOpen:!1},o.selectUser=o.selectUser.bind(Object(r.a)(o)),o.handleChange=o.handleChange.bind(Object(r.a)(o)),o.sendMessage=o.sendMessage.bind(Object(r.a)(o)),o.onChildImageChange=o.onChildImageChange.bind(Object(r.a)(o)),o.onImageClosed=o.onImageClosed.bind(Object(r.a)(o)),o.onKeyUp=o.onKeyUp.bind(Object(r.a)(o)),o.toggle=o.toggle.bind(Object(r.a)(o)),o.activateThreads=o.activateThreads.bind(Object(r.a)(o)),o.archive=o.archive.bind(Object(r.a)(o)),o.unarchive=o.unarchive.bind(Object(r.a)(o)),o.clearCounter=o.clearCounter.bind(Object(r.a)(o)),o}return Object(o.a)(a,[{key:"getMessages",value:function(e){var t=this;if(e&&""!=e||this.setState({messages:[]}),I.a.hasMessages(e))return this.setState({messages:I.a.getMessages(e)}),void this.scrollToBottom();u.a.getMessagesByConversation(e).then((function(a){console.log(a.data),t.setState({messages:a.data}),I.a.setMessages(e,a.data),t.scrollToBottom()}))}},{key:"onKeyUp",value:function(e){e.preventDefault(),13!==e.keyCode&&13!==e.charCode||this.sendMessage(e)}},{key:"render",value:function(){var e,t,a,s,n,o=this;return d.a.createElement(g.a,null,d.a.createElement("div",{className:"container",style:U},d.a.createElement("div",{className:"row"},d.a.createElement("div",{className:"col-md-4",style:U},d.a.createElement("div",{className:"messages--list custom--bg"},d.a.createElement("div",{className:"flex"},d.a.createElement("button",{onClick:this.activateThreads,style:T,className:"btn btn-outline-primary ".concat(this.state.isActive?"active":"")},"Active"),d.a.createElement("button",{onClick:this.toggleThreads,style:D,className:"btn btn-outline-danger ".concat(this.state.isActive?"":"active")},"Archived")),this.state.threads.map((function(e,t){return d.a.createElement("div",{onClick:function(){return o.selectUser(e)},className:"sidebar--item ".concat(e.conversationID==o.state.selectedUser.conversationID?"active":"")},d.a.createElement("div",{className:"d-flex align-items-center"},d.a.createElement("img",{className:"user--img",src:N(e.logo),alt:""}),d.a.createElement("p",{className:e.seen?"":"text--bold"},e.name," ",0!==e.counter?d.a.createElement("span",{className:"badge badge-primary pull-right"},e.counter):"")),d.a.createElement("p",{className:"last--message"},e.lastMessage?e.lastMessage.slice(0,6)+(e.lastMessage.length>10?"...":""):"No Message"))})))),d.a.createElement("div",{className:"col-md-8",style:U},d.a.createElement("div",{className:"custom--bg message--details"},d.a.createElement("div",{className:"d-flex justify-content-between border-bottom mb-2 pb-2"},d.a.createElement("div",{className:"message--header d-flex align-items-center"},d.a.createElement("img",{className:"user--img",src:(null===(e=this.state.selectedUser)||void 0===e?void 0:e.logo)?N(this.state.selectedUser.logo):""}),d.a.createElement("p",{className:"user--name mb-0 ml-1"},this.state.selectedUser.isMod?d.a.createElement("a",{href:"/community/details/".concat(this.state.selectedUser._id||this.state.paramID)},d.a.createElement("strong",null,null===(t=this.state.selectedUser)||void 0===t?void 0:t.name)):d.a.createElement("strong",null,null===(a=this.state.selectedUser)||void 0===a?void 0:a.name)),this.state.selectedUser.name?"":d.a.createElement("p",{className:"user--name mb-0 ml-1"},d.a.createElement("strong",null,"No Threads Available"))),d.a.createElement("div",{className:"dots",onClick:this.toggle},d.a.createElement("div",{className:"dots"},d.a.createElement("div",{className:"dot"}),d.a.createElement("div",{className:"dot"}),d.a.createElement("div",{className:"dot"})),this.state.isOpen&&this.state.selectedUser.conversationID?d.a.createElement("div",{className:"dropdown--archive"},this.state.isActive?d.a.createElement("span",{onClick:function(){return o.archive(o.state.selectedUser.conversationID)}},"Archive"):d.a.createElement("span",{onClick:function(){return o.unarchive(o.state.selectedUser.conversationID)}},"unarchive")):"")),d.a.createElement("div",{className:"overflow",ref:O},this.state.messages.length?null===(s=this.state)||void 0===s||null===(n=s.messages)||void 0===n?void 0:n.map((function(e,t){var a,s,n;return d.a.createElement("div",{className:"message--item-container d-flex ".concat(e.from?"":"welcome-message","  ").concat(S.b==(null===(a=e.from)||void 0===a?void 0:a._id)?"received":"")},d.a.createElement("div",{className:"message--item d-flex flex-nowrap "},e.from?d.a.createElement("img",{src:(null===(s=e.from)||void 0===s?void 0:s.userImage)?N(null===e||void 0===e||null===(n=e.from)||void 0===n?void 0:n.userImage):"",alt:"",className:"user--img"}):"",d.a.createElement("div",{className:"message wordwrap"},d.a.createElement("p",{className:"".concat(e.from?"text":"welcome")},Object(b.a)(e.message)?d.a.createElement("a",{href:e.message,className:"message-link",target:"_blank",rel:"noopener noreferrer"},e.message):e.message,e.image?d.a.createElement("img",{className:"message--img",src:C+e.image}):""),e.seen&&d.a.createElement("small",{className:"text-muted"},"\u2713 seen"),d.a.createElement("span",{className:"time"},Object(h.a)(e.createdAt)))))})):"No Message Found",d.a.createElement("form",null,d.a.createElement("div",{className:"message--input"},d.a.createElement("div",{className:"flex"},d.a.createElement(E.a,{onImageClosed:this.onImageClosed,onSentMessage:this.sendMessage,onImageChange:this.onChildImageChange,imageUploadStarts:function(){}}),d.a.createElement("textarea",{style:w,onKeyUp:this.onKeyUp,name:"message",className:"form-control h-40",onFocus:this.msgSeen,value:this.state.currentMsg,onChange:this.handleChange,onFocusCapture:this.clearCounter}),d.a.createElement("button",{className:"btn send--btn",onClick:this.sendMessage},d.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"39.881",height:"34.183",viewBox:"0 0 39.881 34.183"},d.a.createElement("g",{transform:"translate(0 0)"},d.a.createElement("g",{transform:"translate(0 0)"},d.a.createElement("path",{fill:"#243c4b",d:"M.019,32,0,45.294l28.486,3.8L0,52.89.019,66.183,39.881,49.092Z",transform:"translate(0 -32)"})))))))),d.a.createElement("div",{style:{float:"left",clear:"both"},ref:y})))))))}}]),a}(d.a.Component);t.default=j}}]);
//# sourceMappingURL=20.11fffc6d.chunk.js.map