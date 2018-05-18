import React from "react"
import convertToHtml from "./convertToHtml"
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  AtomicBlockUtils
} from "draft-js"
import decorators from "./decorators"
import blockRenderer from "./blockRenderer"

export default class MyEditor extends React.Component {
  state = {
    html: "",
    editorState: EditorState.createEmpty(decorators)
  }
  _onConvertClick = () => {
    const { editorState } = this.state
    const html = convertToHtml(editorState)
    this.setState({ html })
  }
  _onChange = editorState => this.setState({ editorState })
  _handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this._onChange(newState)
      return "handled"
    }
    return "not-handled"
  }
  _onBoldClick = () => {
    this._onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"))
  }
  _onLinkClick = (type, mutability, data) => {
    const { editorState } = this.state

    const contentState = editorState.getCurrentContent()
    // create entity
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      {
        url: "google.com"
      }
    )
    // get entity key
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    // get current selection State
    const selectionState = editorState.getSelection()
    // apply entity to selection
    const contentStateWithEntityApplied = Modifier.applyEntity(
      contentStateWithEntity,
      selectionState,
      entityKey
    )
    // create a new editor state with the entity applied to the selection
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntityApplied
    })
    this._onChange(newEditorState)
  }
  _onUserNameClick = () => {
    const { editorState } = this.state

    const contentState = editorState.getCurrentContent()
    // create entity
    const contentStateWithEntity = contentState.createEntity(
      "DYNAMIC_TAG",
      "IMMUTABLE",
      { key: "userName" }
    )
    // get entity key
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    // create a new editor state with the entity added to the content
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    })

    const selectionState = editorState.getSelection()
    // insert entity+text in the editor state
    const contentStateWithUserName = Modifier.replaceText(
      contentState,
      selectionState,
      "userName",
      null,
      entityKey
    )
    const finalEditorState = EditorState.set(newEditorState, {
      currentContent: contentStateWithUserName
    })
    this._onChange(finalEditorState)
  }
  _onImageClick = () => {
    const { editorState } = this.state

    const contentState = editorState.getCurrentContent()
    // create entity
    const contentStateWithEntity = contentState.createEntity(
      "IMAGE",
      "IMMUTABLE",
      {
        src:
          "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
      }
    )
    // get entity key
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    // create a new editor state with the entity added to the content
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    })

    const editorStateWithImage = AtomicBlockUtils.insertAtomicBlock(
      newEditorState,
      entityKey,
      " "
    )
    this._onChange(editorStateWithImage)
  }
  _onVideoClick = () => {
    const { editorState } = this.state

    const contentState = editorState.getCurrentContent()
    // create entity
    const contentStateWithEntity = contentState.createEntity(
      "VIDEO",
      "IMMUTABLE",
      {
        src:
          "https://r1---sn-4g5edned.googlevideo.com/videoplayback?mime=video/webm&pl=21&expire=1526678836&clen=443675&ratebypass=yes&beids=[9466594]&source=youtube&ipbits=0&dur=0.000&lmt=1334146123661691&key=cms1&fvip=1&ip=209.205.211.130&requiressl=yes&gir=yes&signature=282740F8F20176C93CE0AC4ABD66E468B059179B.547CE03A4610F9F69B88A03171E0C5036F4E1288&c=WEB&id=o-AJDfsMebPfHyrY9KPosYG5meaPxMsZ3-R6Mpz3kWSwE-&ei=1PD-WoW8KcWc8wSJ2L9g&itag=43&sparams=clen,dur,ei,expire,gir,id,initcwndbps,ip,ipbits,ipbypass,itag,lmt,mime,mip,mm,mn,ms,mv,pl,ratebypass,requiressl,source&type=video%2Fwebm%3B+codecs%3D%22vp8.0%2C+vorbis%22&quality=medium&title=(Hdvd9.com)_velocitympeg&rm=sn-ab5e77e&fexp=9466588&req_id=b97c1f8be009a3ee&ipbypass=yes&mip=105.157.65.174&cm2rm=sn-p5h-jhos7e,sn-hgned7e&redirect_counter=3&cms_redirect=yes&mm=34&mn=sn-4g5edned&ms=ltu&mt=1526657195&mv=m"
      }
    )
    // get entity key
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    // create a new editor state with the entity added to the content
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    })

    const editorStateWithImage = AtomicBlockUtils.insertAtomicBlock(
      newEditorState,
      entityKey,
      " "
    )
    this._onChange(editorStateWithImage)
  }
  render() {
    const { html, editorState } = this.state
    return (
      <div>
        <h3>Editor</h3>
        <div className="ba b--blue min-h4 mb2 pa1">
          <div className="">
            <button onClick={this._onBoldClick}>Bold</button>
            <button onClick={this._onLinkClick}>Link</button>
            <button onClick={this._onUserNameClick}>User Name</button>
            <button onClick={this._onImageClick}>Image</button>
            <button onClick={this._onVideoClick}>Video</button>
          </div>
          <div className="min-h4 editor-container">
            <Editor
              editorState={editorState}
              onChange={this._onChange}
              handleKeyCommand={this._handleKeyCommand}
              blockRendererFn={blockRenderer}
            />
          </div>
        </div>
        <br />
        <div>
          <button onClick={this._onConvertClick}>Convert to HTML</button>
        </div>
        <h3>HTML Code</h3>
        <div className="bg-near-white min-h4 mv2 pa1">{html}</div>
        <h3>Output</h3>
        <div
          className="ba b--red min-h4 mt2 pa1"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    )
  }
}
