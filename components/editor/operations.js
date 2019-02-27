export const eventType = "ckEditorOperation";

function createEvent(detail) {
  return new CustomEvent(eventType, { detail });
}

export const batch = operations =>
  createEvent({
    operation: "batch",
    operations
  });

export const insert = (
  element,
  parent,
  position,
  reference = null,
  attributes = {}
) =>
  createEvent({
    operation: "insert",
    element,
    parent,
    position,
    reference,
    attributes
  });

export const move = (parent, position, target, reference) =>
  createEvent({
    operation: "move",
    parent,
    position,
    target,
    reference
  });

export const replace = (element, target) =>
  createEvent({
    operation: "replace",
    element,
    target
  });

export const remove = target =>
  createEvent({
    operation: "remove",
    target
  });

export const attributes = (target, attr) =>
  createEvent({
    operation: "attributes",
    target,
    attr
  });
