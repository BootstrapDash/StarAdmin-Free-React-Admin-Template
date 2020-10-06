# React Bootstrap Editable
 
Clean editable bootstrap components for react. Ajax support!
Check the [documentation](https://yassienw.github.io/react-bootstrap-editable)

![](https://img.shields.io/bundlephobia/min/react-bootstrap-editable)
![](https://img.shields.io/npm/dt/react-bootstrap-editable)

**All feedback is highly appreciated. If you have any suggestions, want to see a feature
implemented or face any bugs, don't hesitate to [submit an issue](https://github.com/YassienW/react-bootstrap-editable/issues/new)**

## Installation

```bash
npm i react-bootstrap-editable
```

You will also need bootstrap4's CSS in your project

## Changelog:
### On the horizon:
- Custom components
- Custom buttons/icons
- More ajax configuration
- Better documentation?

### 0.5.0:
- Reduced bundle size by 50%
- id prop now accepts both strings and numbers
- FontAwesome is now included in the dist
- Updated Storybook (code snippets now work properly)
- Added an interactive demo on Storybook, check it out [here](https://yassienw.github.io/react-bootstrap-editable)

### 0.4.0:
- Added className prop
- Updating initialValue prop without remounting now updates the editable value
- Date editable accepts any string, parsing to Date object is done internally
- Loading spinner for ajax using the new BS4 [Spinners](https://getbootstrap.com/docs/4.3/components/spinners/)
- Added File editable
- Popover mode added
- Added Text Area editable
- Removed col size props, the editable now automatically takes full width of parent container
- Editable now uses flexbox to perfectly fit the items in whatever space is available 
### 0.3.0:
- Switched components to use form rows instead of inline forms
- Added props to control col width for the input and controls
- Added label and id props
- All combinations of the disabled, clickable and label props now work together
- Beefed up documentation
