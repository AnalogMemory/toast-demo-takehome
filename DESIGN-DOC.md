
## Summary 

Building out a toast component to be used in a design system. 
Toast notification are used to display a succinct message temporarily. They can be disappear after a few seconds or wait to be dismissed by the end user

## Toast layout

**Placement**
Toast notifications slide down from the top center of the screen. The stack with a slight amount of spacing in-between. New toasts appear on the top of the list, with older toasts being pushed down until they are dismissed. The stack will visually show up to three toasts. The other toasts will be hidden unless the stack is expanded.

Sizing
Toasts will use a fixed width. The height will be determined by the length of the message passed. It is recommended to be succinct and limit the length to three lines

**Icons**  
A preset icon will be displayed if using passing a `toastType` value besides `default`
See Toast Variants

### Dismissal

Toast notifications persist by default, but can timeout and be coded to dismiss automatically by passing a `timeout` value

Each toasts can be permanently dismissed and are removed from the stack.

When the stack is expanded, a delete all button is shown, then all toasts can be removed 

### Stack Actions

**Expanding**  
When more than one toast is in the stack, the full stack can be displayed by clicking on the toast at the top of the stack. When a user hovers over the stack a button with a down arrow is shown to indicate an action can be taken to expand the stack.

When expanded, two action buttons are shown.

One button is used to collapse the stack, containing an icon of an arrow pointing up. Clicking this will collapse the stack to its default state.

The second button is a delete button, that will dismiss all toasts in the stack.
Dismissing all the toasts will hide the buttons after the animation completes

**Collapsing**  
Clicking the close stack button, an icon with an arrow pointing up, will collapse the stack. Additionally, clicking outside of the expanded toast area will also cause this expanded view to collapse back to its default state

#### Toast Variants
There will be 5 variants available to the implementer
`default, info, success, warning, error`

**Default**
The default toast will show a short text message. Other message state types will display an icon to indicate type

**Info**
This will extend the default toast with an info icon that is highlighted in blue

**Success**
This will extend the default toast with a success/checkbox icon that is highlighted in green

**Warning**
This will extend the default toast with a warning icon that is highlighted in yellow

**Error**
This will extend the default toast with an error icon that is highlighted in red
