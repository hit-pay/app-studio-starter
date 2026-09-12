<!-- Generated from content/docs/components/detail-card.mdx. Do not edit. -->

# Detail Card

Read-only key/value card for one record. Not a collection.

## Interactive example

The interactive example is rendered on the Orchid documentation page. Use the usage guidance below and verify the installed component source for the exact API.

Use `DetailCard` for a read-only key/value view of **one** record (invoice, leave request,
customer). Use `DataList` or `DataTable` for collections. Do not assemble label/value stacks
from `Card`.

## API

`DetailCard` accepts `items`, plus optional `title`, `columns`, `style`, and `className`.
It also supports standard `div` attributes except the native `style`, `title`, and `children` props.

Each item requires a unique string `key` and a React `value`. Items can also set `label`,
`copyValue`, `alignment`, `size`, `colSpan`, and `className`. Because `value` is a React node,
it can render text, links, badges, or custom content.
