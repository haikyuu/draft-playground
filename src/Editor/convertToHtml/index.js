import React from "react"
import { convertToHTML } from "draft-convert"
const styles = {
  media: { width: "20%", height: "20%" }
}
export default function convert(editorState, data = { userName: "Abdellah" }) {
  const contentState = editorState.getCurrentContent()
  return convertToHTML({
    entityToHTML(entity, originalText) {
      console.log("entity to html: ", entity)
      if (entity.type === "IMAGE") {
        return <img src={entity.data.src} style={styles.media} />
      }
      if (entity.type === "VIDEO") {
        return <video controls src={entity.data.src} style={styles.media} />
      }
      if (entity.type === "LINK") {
        return <a href={entity.data.url}>{originalText}</a>
      }
      if (entity.type === "DYNAMIC_TAG") {
        if (!"we want to handle rendering in the server") {
          // document.getElementById("id") && insert data
          return <span className={`__upsight__${data[entity.data.key]}`} />
        }
        return <span>{data[entity.data.key]}</span>
      }
      return originalText
    },
    blockToHTML(block) {
      if (block.type === "atomic") {
        return <figure />
      }
      //   const entity = contentState.getBlockForKey(block.key).getEntityAt(0)
      //   if (entity) {
      //     console.log("entity: ", entity)
      //     console.log("entity.type: ", entity.type)
      //     if (entity.type === "IMAGE") {
      //       return (
      //         <img src={entity.data.src} style={{ widht: 50, height: 50 }} />
      //       )
      //     }
      //     console.log("block: ", block)
      //     return <span>{entity.type}</span>
      //   }
      // }
      // return <span>{block.type}</span>
    }
  })(editorState.getCurrentContent())
}
