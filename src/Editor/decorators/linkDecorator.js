import React from "react"
const linkStyles = {
  color: "blue"
}
const linkDecorator = {
  strategy(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(character => {
      const entityKey = character.getEntity()
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === "LINK"
      )
    }, callback)
  },
  component({ children, entityKey, contentState, decoratedText }) {
    if (entityKey) {
      const linkInstance = contentState.getEntity(entityKey)
      const { url } = linkInstance.getData()
      return (
        <span style={linkStyles} title={url}>
          {children}
        </span>
      )
    }
    return children || decoratedText
  }
}

export default linkDecorator
