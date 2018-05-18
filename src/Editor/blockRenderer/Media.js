import React from "react"

const styles = {
  media: {
    width: "20%",
    height: "20%"
  }
}
const Audio = props => {
  return <audio controls src={props.src} style={styles.media} />
}
const Image = props => {
  return <img src={props.src} style={styles.media} />
}
const Video = props => {
  return <video controls src={props.src} style={styles.media} />
}
const Media = props => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0))
  const { src } = entity.getData()
  const type = entity.getType()
  let media = null
  if (type === "AUDIO") {
    media = <Audio src={src} />
  } else if (type === "IMAGE") {
    media = <Image src={src} />
  } else if (type === "VIDEO") {
    media = <Video src={src} />
  }
  return media
}
export default Media
