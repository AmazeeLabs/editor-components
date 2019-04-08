import { LitElement } from "lit-element";

export const eventType = "ckEditorOperation";

function createEvent(detail) {
  return new CustomEvent(eventType, { detail });
}

class EditorProxy {
  constructor(element) {
    this.element = element;
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
class EditorUIEvent extends CustomEvent {
  constructor(type, payload, callback) {
    super(`editor-ui:${type}`, { detail: payload });
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
    this.editor = new EditorProxy(this);
  }

  /**
   * @inheritDoc
   */
  connectedCallback() {
    super.connectedCallback();
    this.inEditor = !!this.closest(".ck");
  }

  /**
   * Dispatch a UI event.
   *
   * @param type
   *   The UI request type.
   * @param detail
   *   Additional data.
   * @param callback
   *   Callback that is invoked when the UI returns.
   */
  dispatchUIEvent(type, detail, callback) {
    this.dispatchEvent(new EditorUIEvent(type, detail, callback));
  }
}
