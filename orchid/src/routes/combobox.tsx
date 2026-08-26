import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '@/components/ui/combobox'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'

export const Route = createFileRoute('/combobox')({
  component: ComboboxExamplesPage,
})

const options = ['Option', 'Option two', 'Option three', 'Option four', 'Option five', 'Option six']

const groupedOptions = [
  {
    value: 'Group head',
    items: ['Option a', 'Option b', 'Option c', 'Option d', 'Option e'],
  },
  {
    value: 'Group head two',
    items: ['Option f', 'Option g', 'Option h', 'Option i', 'Option j'],
  },
]

function ComboboxMultipleExample({
  defaultValue,
  invalid,
}: {
  defaultValue?: string[]
  invalid?: boolean
}) {
  const chips = useComboboxAnchor()

  return (
    <Combobox items={options} multiple defaultValue={defaultValue}>
      <ComboboxChips ref={chips}>
        <ComboboxValue>
          {(value: string[]) =>
            value.map((item) => (
              <ComboboxChip key={item} aria-label={item}>
                {item}
              </ComboboxChip>
            ))
          }
        </ComboboxValue>
        <ComboboxChipsInput placeholder="Placeholder" aria-invalid={invalid || undefined} />
      </ComboboxChips>
      <ComboboxContent anchor={chips}>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

function ComboboxGroupedExample() {
  const chips = useComboboxAnchor()

  return (
    <Combobox items={groupedOptions} multiple>
      <ComboboxChips ref={chips}>
        <ComboboxValue>
          {(value: string[]) =>
            value.map((item) => (
              <ComboboxChip key={item} aria-label={item}>
                {item}
              </ComboboxChip>
            ))
          }
        </ComboboxValue>
        <ComboboxChipsInput placeholder="Placeholder" />
      </ComboboxChips>
      <ComboboxContent anchor={chips}>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(group: (typeof groupedOptions)[number]) => (
            <ComboboxGroup key={group.value} items={group.items}>
              <ComboboxLabel>{group.value}</ComboboxLabel>
              <ComboboxCollection>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

function ComboboxExamplesPage() {
  return (
    <DocExamplePage to="/combobox">
      <div className="grid gap-8 md:grid-cols-2">
        <FieldGroup>
          <Field>
            <FieldLabel>Default</FieldLabel>
            <Combobox items={options}>
              <ComboboxInput placeholder="Placeholder" />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            <FieldDescription>This is a hint text to help user.</FieldDescription>
          </Field>

          <Field data-invalid>
            <FieldLabel>Error</FieldLabel>
            <Combobox items={options}>
              <ComboboxInput placeholder="Placeholder" aria-invalid />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            <FieldError>This is a hint text to help user.</FieldError>
          </Field>
        </FieldGroup>

        <FieldGroup>
          <Field>
            <FieldLabel>Multiple</FieldLabel>
            <ComboboxMultipleExample defaultValue={['Option', 'Option two', 'Option three', 'Option four', 'Option five']} />
            <FieldDescription>This is a hint text to help user.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Grouped</FieldLabel>
            <ComboboxGroupedExample />
            <FieldDescription>This is a hint text to help user.</FieldDescription>
          </Field>
        </FieldGroup>
      </div>
    </DocExamplePage>
  )
}
