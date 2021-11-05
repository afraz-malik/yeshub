import React, { Component } from 'react';
import { chat } from '../../api/chat';
import EventBus from '../../api/event-but';

const style = {
    width: "60px",
    opacity: .4
}
const fileBtn = React.createRef();
const imageicon = 'https://pngimage.net/wp-content/uploads/2018/06/scenery-icon-png-.png';
class ImageUpload extends React.Component {
    constructor(props) {
      super(props);
      console.log(props);
      this.state = {
        file: '',
        imagePreviewUrl: '',
        imageShow: false,
        inputFile: {},
        loading:false,
        fileBtn: {},
        onImageChange: ()=>{}
      };
      this.onSentMessage = this.props.onSentMessage;
      this._handleImageChange = this._handleImageChange.bind(this);
      this._handleSubmit = this._handleSubmit.bind(this);
      this.onClose = this.onClose.bind(this);
      this._handleFile = this._handleFile.bind(this);
      EventBus.on('message-sent', () => {
        console.log('message recieved in child using even bus');
        this.setState({imageShow: false});
        this.setState({imagePreviewUrl: ""});
        this.setState({loading: false});
      })      
    }
  
    onSentMessage(data) {
    }
    
    _handleSubmit(e) {
      e.preventDefault();
    }

    _handleFile(e) {
      e.preventDefault();
      fileBtn.current.click();
    }
  
    _handleImageChange(e) {
  
      let reader = new FileReader();
      this.setState({inputFile: e.target});
      this.setState({loading: true})
      let file = e.target.files[0];
      let formData = new FormData();
      formData.append('images', file);
      
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result,
          imageShow: true
        });
      }
  
      reader.readAsDataURL(file)
      this.props.imageUploadStarts();
      chat.uploadFile(formData)
      .then(res => {
          this.props.onImageChange(res.data);
          this.setState({loading: false});
      })
    }
  
    onClose() {
      this.setState({inputFile: null});
      this.setState({imagePreviewUrl: ""});
      this.setState({imageShow: false});
      this.setState({loading: false});
      this.props.onImageClosed("");
    }

    render() {
  
      return (
        <div className="image--uploader--container">
          {!this.state.imageShow ? "" : <i onClick={this.onClose} className="fa image--uploader--close fa-times-circle-o text-danger"></i> }
          {this.state.loading ? <div className="image--uploader--loading">
                                    <i className="centered fa fa-spinner fa-pulse"></i>
                                    </div> 
                              : ""}
          {this.state.imagePreviewUrl ? <img style={style} src={this.state.imagePreviewUrl} alt=""/> : ""}
          {
            !this.state.imageShow ?   
              (
                <>                  
                    <img className="mini-img" onClick={this._handleFile} src={imageicon} alt=""/>                    
                  <input ref={fileBtn} id="image--uploader--button" className="class--hidden" type="file" onChange={this._handleImageChange} />
                </>
              )
              : ""
            }
        </div>
      )
    }
  }

  export default ImageUpload