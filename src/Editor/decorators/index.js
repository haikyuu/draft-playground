import { CompositeDecorator } from "draft-js"
import linkDecorator from "./linkDecorator"
import dynamicTagDecorator from "./dynamicTagDecorator"

const decorators = new CompositeDecorator([linkDecorator, dynamicTagDecorator])

export default decorators
