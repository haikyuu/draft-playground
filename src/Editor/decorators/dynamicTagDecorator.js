import React from "react"
const dynamicTagStyles = {
  backgroundColor: "papayawhip"
}
const dynamicTagDecorator = {
  strategy(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(character => {
      const entityKey = character.getEntity()
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === "DYNAMIC_TAG"
      )
    }, callback)
  },
  component({ children, entityKey, contentState, decoratedText }) {
    return <span style={dynamicTagStyles}>{children}</span>
  }
}

export default dynamicTagDecorator
