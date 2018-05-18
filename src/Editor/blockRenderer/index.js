import Media from "./Media"

export default function editorRenderers(contentBlock) {
  const type = contentBlock.getType()
  if (type === "atomic") {
    return {
      component: Media,
      editable: false
    }
  }
  return null
}
