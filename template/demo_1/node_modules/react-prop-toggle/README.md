# React Prop Toggle

A safe, declarative way to influence the styles and attributes of nodes outside
your app's tree.

By storing the initial values of the target node when mounting
`react-prop-toggle` is able to safely return styles and attributes when
unmounted.

```js
<PropToggle
  isActive={this.state.someCondition}
  attributes={{ 'data-variant': 'true' }}
  styles={{ background: 'red' }}
/>
```
