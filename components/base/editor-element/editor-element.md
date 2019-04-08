# Editor Element

A simplistic base class for custom web components that interact with the editor. Simply extend the component from
`EditorElement`.

It provides a property indicating if the element is currently used in an editor instance. It can be used to decide if
certain UI elements should be rendered or not.

```js
class MyComponent extends EditorElement {
    render() {
      return this.inEditor
        ? html`
            <p>I'm in an editor.</p>
          `
        : html`
            <p>I'm <strong>not</strong> in an editor</p>
          `;
    }
}
```

The base class also provides a set of methods prefixed with `editor` that allow to modify the document. Please refer to
the source code comments for more information.
