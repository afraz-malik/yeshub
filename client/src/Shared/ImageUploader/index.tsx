import React, { Component } from 'react';
import FileUpload from '../../Helpers/Request/Services/uploadFile/FileUpload';
import EventBus from '../../Helpers/Request/Services/event-bus';

const style = {
    width: "60px",
    opacity: .4
}
const fileBtn = React.createRef<HTMLInputElement>();
// const onImageChange = () => {}
class ImageUpload extends Component<any, any> {
    constructor(props: any) {
      super(props);
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
  
    onSentMessage(data: any) {
      console.log('event recieved inside child component ...');
    }
    
    _handleSubmit(e: any) {
      e.preventDefault();
      // TODO: do something with -> this.state.file
    }

    _handleFile(e: any) {
      e.preventDefault();
      this.state.fileBtn.current?.click();
      console.log(this.state.fileBtn);
    }
  
    _handleImageChange(e: any) {
    //   e.preventDefault();
  
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
      FileUpload.uploadFile(formData)
      .then(res => {
          console.log(res.data);
          this.props.onImageChange(res.data.data);
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
    //   let imagePreviewUrl = this.state.imagePreviewUrl;
    //   let $imagePreview = null;
    //   if (this.state.imagePreviewUrl) {
    //     $imagePreview = (<img src={imagePreviewUrl} />);
    //   }
  
      return (
        <div className="image--uploader--container flex">
          {!this.state.imageShow ? "" : <div className="full--width"> <i onClick={this.onClose} className="fa image--uploader--close fa-times-circle-o text-danger"></i> </div>}
          {this.state.loading ? <div className="image--uploader--loading">
                                    <i className="centered fa fa-spinner fa-pulse"></i>
                                    </div> 
                              : ""}
          {this.state.imagePreviewUrl ? <img style={style} src={this.state.imagePreviewUrl} alt=""/> : ""}
          {
            !this.state.imageShow ?   
              (
                <>
                  {/* <button className="btn btn-default"> */}
                    <i  onClick={this._handleFile} className="fa fa-picture-o lg-fonts"></i>
                    {/* </button> */}
                  <input ref={this.state.fileBtn} id="image--uploader--button" className="class--hidden" type="file" onChange={this._handleImageChange} />
                </>
              )
              : ""
            }
        </div>
      )
    }
  }

  export default ImageUpload