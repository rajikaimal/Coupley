// import React from 'react';
// import ActivityFeedActions from '../../actions/ActivityFeed/ActivityFeedActions';

// const ImageUpload = React.createClass({

//     _getInitialState: function(props) {
//     Super(props);
//     this.state = {
//       file: '',
//       imagePreviewUrl: ''
//     };
//     this._handleImageChange = this._handleImageChange.bind(this);
//     this._handleSubmit = this._handleSubmit.bind(this);
//     },

//     _handleSubmit: function(e) {
//     e.preventDefault();
    
//     console.log(this.state.file.getValue());
//     var imageupload = this.state.file.getValue();  
//     let ImageUpload={
//         Imageupload: imageupload
//     };
//     ActivityFeedActions.ImageUpload(ImageUpload);
//     },

//     _handleImageChange: function(e) {
//     e.preventDefault();

//     let reader = new FileReader();
//     let file = e.target.files[0];

//     reader.onloadend = () => {
//       this.setState({
//         file: file,
//         imagePreviewUrl: reader.result
//       });
//     }

//     reader.readAsDataURL(file)
//     },

//     render:function(){

//       let {imagePreviewUrl} = this.state;
//       let $imagePreview = null;
//       if (imagePreviewUrl) {
//        $imagePreview = (<img src={imagePreviewUrl} />);
//       }

//       return (
//         <div>
//         <form onSubmit={this._handleSubmit}>
//           <input type="file" onChange={this._handleImageChange} />
//           <button type="submit" onClick={this._handleSubmit}>UploadImage</button>
//         </form>
//         {$imagePreview}
//         </div>
//         );
//     }
// });

// export default ImageUpload;