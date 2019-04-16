import { LitElement } from "lit-element";

export const eventType = "ckEditorOperation";

function createEvent(detail) {
  return new CustomEvent(eventType, { detail });
}

class EditorProxy {
  /**
   * @param element
   */
  constructor(element) {
    this.element = element;
    this.operations = [];
  }

  /**
   * Insert a new section.
   *
   * @param section
   *   The section name to insert.
   * @param parent
   *   The parent element.
   * @param position
   *   The position. "end" to append it to the parent, "before" to insert it before the reference element.
   * @param reference
   *   Reference element when using "before" as a position value.
   * @param attributes
   *   A dictionary of attributes that will be applied to the new element.
   */
  insert(section, parent, position, reference = null, attributes = null) {
    this.element.dispatchEvent(
      createEvent({
        operation: "insert",
        section,
        parent,
        position,
        reference,
        attributes
      })
    );
  }

  /**
   * Move an element.
   *
   * @param parent
   *   The new parent element.
   * @param position
   *   The position. "end" to append it to the parent, "before" to insert it before the reference element.
   * @param target
   *   The element to be moved.
   * @param reference
   *   Reference element when using "before" as a position value.
   */
  move(parent, position, target, reference) {
    this.element.dispatchEvent(
      createEvent({
        operation: "move",
        parent,
        position,
        target,
        reference
      })
    );
  }

  /**
   * Replace an element with an a new section.
   *
   * @param section string
   *   The section name to replace the element with.
   * @param target
   *   The target dom element.
   */
  replace(section, target) {
    this.element.dispatchEvent(
      createEvent({
        operation: "replace",
        section,
        target
      })
    );
  }

  /**
   * Remove a given element.
   *
   * @param target
   *   The element to remove.
   */
  remove(target) {
    this.element.dispatchEvent(
      createEvent({
        operation: "remove",
        target
      })
    );
  }

  /**
   * Set attributes of an element.
   *
   * @param target
   *   The target element.
   * @param attr
   *   The dictionary of attributes to be set.
   */
  attributes(target, attr) {
    this.element.dispatchEvent(
      createEvent({
        operation: "attributes",
        target,
        attr
      })
    );
  }

  /**
   * Remove an attribute from an element.
   *
   * @param target
   *   The target element.
   * @param key
   *   The attribute key.
   */
  removeAttribute(target, key) {
    this.element.dispatchEvent(
      createEvent({
        operation: "removeAttribute",
        target,
        key
      })
    );
  }

  /**
   * Swap out an element with another one.
   *
   * @param element
   *   The new element to insert.
   * @param target
   *   The old element to remove.
   */
  swap(element, target) {
    this.element.dispatchEvent(
      createEvent({
        operation: "swap",
        element,
        target
      })
    );
  }
}

/**
 * Event type to communicate with an external user interface.
 */
class RequestInformationEvent extends CustomEvent {
  constructor(type, payload, callback) {
    super(`ck-editor:${type}`, {
      detail: payload,
      bubbles: true,
      composed: true
    });
    this.callback = callback;
  }

  /**
   * Respond to this event.
   *
   * @param detail
   */
  respond(detail) {
    this.callback(detail);
  }
}

/**
 * Base class for editor elements.
 *
 * Provides methods and properties for communicating with the CKEditor5 instance.
 */
export default class EditorElement extends LitElement {
  /**
   * @inheritDoc
   */
  constructor() {
    super();
    this.inEditor = false;
  }

  /**
   * @inheritDoc
   */
  connectedCallback() {
    super.connectedCallback();
    // TODO: Properly detect when not in an editor instance.
    this.inEditor = true;
  }

  /**
   * Change the editors document model.
   *
   * Pass in a callback that will receive an EditorProxy object that
   * contains methods to modify the document.
   *
   * @param callback
   */
  modifyDocument(callback) {
    const editorProxy = new EditorProxy(this);
    callback(editorProxy);
    createEvent({
      operation: "batch",
      operations: editorProxy.operations
    });
  }

  /**
   * Request information from outside systems.
   *
   * @param type String
   *   The type of information required.
   * @param detail Object
   *   Arbitrary additional information.
   * @param callback
   *   Callback that is invoked when information is returned.
   */
  requestInformation(type, detail, callback) {
    this.dispatchEvent(new RequestInformationEvent(type, detail, callback));
  }
}
