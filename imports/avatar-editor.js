import React from 'react';
import AvatarEditor from 'react-avatar-editor';

export default class MyEditor extends React.Component {
  constructor(props){
    super(props);
      this.state={
        allowZoomOut: false,
        position: { x: 0.5, y: 0.5 },
        scale: 1,
        rotate: 0,
        borderRadius: 200,
        preview: null,
        width: 250,
        height: 250,
        image: this.props.imageSrc
      };
      this.handleNewImage=this.handleNewImage.bind(this);
      this.handleSave=this.handleSave.bind(this);
      this.handleScale=this.handleScale.bind(this);
      this.rotateRight=this.rotateRight.bind(this);
  }

  setEditorRef(editor) {
    this.editor = editor;
  }


  handleSave(data) {
    Session.set('useImageEditor', false);
    var img = editor.getImageScaledToCanvas().toDataURL();
    var rect = editor.getCroppingRect();

    //여기서 원본, thumb, originRe를 구분해서 던져줘야 함;;;;
    var imageInfo = {
        img:img,
        rect:rect,
        scale: this.state.scale,
        width: this.state.width,
        height: this.state.height,
        borderRadius: this.state.borderRadius
    };
    Session.set('imageInfo', imageInfo);
    // var img = editor.getImageScaledToCanvas().toDataURL();
    // var rect = editor.getCroppingRect();
    //
    // this.setState({
    //   preview: {
    //     img:img,
    //     rect:rect,
    //     scale: this.state.scale,
    //     width: this.state.width,
    //     height: this.state.height,
    //     borderRadius: this.state.borderRadius
    //   }
    // });
  }

  handleNewImage(e){
    this.setState({
      image: e.target.files[0]
    });
  }

  rotateRight(e) {
    e.preventDefault();
    this.setState({
      rotate: this.state.rotate + 90
    });
  }

  handleScale(e) {
    var scale = parseFloat(e.target.value);
    this.setState({ scale:scale });
  }

  render () {
    return (
      <div className="image-editor">
        <div className="prevent">
          <div className="max768">
            <div className="detail-header txt-menu">
              <div className="sticky">
                <div className="max768">
                  <div className="wrap">
                    <div className="item-list">
                      <div className="item cursor-pointer" id="back">
                        <a href="#" className="back-step">
                          <div className="icon cursor-pointer">
                            <i className="imsm-icon icon-back"></i>
                          </div>
                        </a>
                      </div>
                      <div className="item">
                      </div>
                      <div className="item cursor-pointer" id="saveStep1" onClick={this.handleSave}>
                        저장
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="detail-body">
              <div>
                <div className="type02">
                  <div className="avatar-editor">
                    <AvatarEditor
                      ref={this.setEditorRef}
                      image={this.state.image}
                      width={this.state.width}
                      height={this.state.height}
                      scale={parseFloat(this.state.scale)}
                      rotate={parseFloat(this.state.rotate)}
                      borderRadius={this.state.borderRadius}
                      onSave={this.handleSave}
                    />
                    <div className="editor-body">
                      <div className="control">
                        <div className="rotate cursor-pointer txt-title" onClick={this.rotateRight}>
                            사진회전
                        </div>
                        <div className="input-range">
                            <input
                              name='scale'
                              type='range'
                              onChange={this.handleScale}
                              min='1'
                              max='2'
                              step='0.01'
                              defaultValue='1'
                              title='확대/축소'
                            />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="black-over" id="modal" data-backdrop="static" aria-hidden="false">
        </div>
      </div>
    )
  }
}
