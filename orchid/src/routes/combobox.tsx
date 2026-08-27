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
  ComboboxSelectAll,
  ComboboxSeparator,
  ComboboxValue,
  useComboboxAnchor,
} from '@/components/ui/combobox'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import type { BadgeColor } from '@/components/ui/badge'

export const Route = createFileRoute('/combobox')({
  component: ComboboxExamplesPage,
})

const currencies = [
  'SGD — Singapore Dollar',
  'USD — US Dollar',
  'MYR — Malaysian Ringgit',
  'IDR — Indonesian Rupiah',
  'EUR — Euro',
  'GBP — British Pound',
  'AUD — Australian Dollar',
  'HKD — Hong Kong Dollar',
  'THB — Thai Baht',
  'VND — Vietnamese Dong',
]

const paymentChannels = [
  {
    value: 'Singapore',
    items: ['PayNow', 'Card', 'GrabPay', 'PayLah!', 'WeChat Pay'],
  },
  {
    value: 'Malaysia',
    items: ['FPX', 'Card', 'GrabPay', 'Touch n Go'],
  },
  {
    value: 'Indonesia',
    items: ['QRIS', 'Card', 'GoPay', 'OVO', 'DANA'],
  },
]

const fulfilmentTypes = ['In Store', 'Shipping', 'Pickup', 'Online Order', 'Digital Products'] as const

const fulfilmentBadgeColor: Record<(typeof fulfilmentTypes)[number], BadgeColor> = {
  'In Store': 'Green',
  Shipping: 'Purple',
  Pickup: 'Blue',
  'Online Order': 'DarkBlue',
  'Digital Products': 'Grey',
}

const products = [
  'Classic White Tee',
  'Studio Membership',
  'Weekend Workshop',
  'Gift Card SGD 50',
  'Ceramic Mug',
  'Canvas Tote',
  'POS Starter Kit',
]

const customers = [
  { name: 'Alex Turner', email: 'alex.turner@example.com' },
  { name: 'Chloe Tan', email: 'chloe.tan@example.com' },
  { name: 'Daniel Kim', email: 'daniel.kim@example.com' },
  { name: 'Elena Santos', email: 'elena.santos@example.com' },
  { name: 'Farhan Malik', email: 'farhan.malik@example.com' },
  { name: 'Grace Wijaya', email: 'grace.wijaya@example.com' },
  { name: 'Hiro Tanaka', email: 'hiro.tanaka@example.com' },
  { name: 'Maya Lim', email: 'maya.lim@example.com' },
]

const posLocations = [
  {
    value: 'Singapore',
    items: ['Orchard', 'Tanjong Pagar', 'Bugis', 'Tampines'],
  },
  {
    value: 'Malaysia',
    items: ['KLCC', 'Bukit Bintang', 'Penang'],
  },
  {
    value: 'Indonesia',
    items: ['Jakarta Sudirman', 'Bandung', 'Surabaya'],
  },
]

function ComboboxFulfilmentExample() {
  const chips = useComboboxAnchor()

  return (
    <Combobox items={[...fulfilmentTypes]} multiple defaultValue={[...fulfilmentTypes]}>
      <ComboboxChips ref={chips}>
        <ComboboxValue>
          {(value: string[]) =>
            value.map((item) => (
              <ComboboxChip
                key={item}
                aria-label={item}
                color={fulfilmentBadgeColor[item as (typeof fulfilmentTypes)[number]]}
              >
                {item}
              </ComboboxChip>
            ))
          }
        </ComboboxValue>
        <ComboboxChipsInput placeholder="Search fulfilment types" />
      </ComboboxChips>
      <ComboboxContent anchor={chips}>
        <ComboboxSelectAll />
        <ComboboxSeparator />
        <ComboboxEmpty>No fulfilment types found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item} variant="Checkbox">
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

function ComboboxCustomersExample({
  defaultValue,
  invalid,
  variant = 'Default',
  selectAll = false,
}: {
  defaultValue?: (typeof customers)[number][]
  invalid?: boolean
  variant?: 'Default' | 'Checkbox'
  selectAll?: boolean
}) {
  const chips = useComboboxAnchor()

  return (
    <Combobox
      items={customers}
      multiple
      defaultValue={defaultValue}
      itemToStringLabel={(item) => `${item.name} ${item.email}`}
    >
      <ComboboxChips ref={chips}>
        <ComboboxValue>
          {(value: (typeof customers)[number][]) =>
            value.map((item) => (
              <ComboboxChip key={item.email} aria-label={item.name}>
                {item.name}
              </ComboboxChip>
            ))
          }
        </ComboboxValue>
        <ComboboxChipsInput placeholder="Search customers" aria-invalid={invalid || undefined} />
      </ComboboxChips>
      <ComboboxContent anchor={chips}>
        {selectAll ? (
          <>
            <ComboboxSelectAll />
            <ComboboxSeparator />
          </>
        ) : null}
        <ComboboxEmpty>No customers found.</ComboboxEmpty>
        <ComboboxList>
          {(item: (typeof customers)[number]) => (
            <ComboboxItem key={item.email} value={item} variant={variant} className="items-start">
              <span className="flex min-w-0 flex-col">
                <span>{item.name}</span>
                <span className="text-xs leading-[1.5] text-oc-muted-foreground">{item.email}</span>
              </span>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

function ComboboxChannelsExample() {
  return (
    <Combobox items={paymentChannels}>
      <ComboboxInput placeholder="Search payment channels" />
      <ComboboxContent>
        <ComboboxEmpty>No payment channels found.</ComboboxEmpty>
        <ComboboxList>
          {(group: (typeof paymentChannels)[number]) => (
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

function ComboboxLocationsExample() {
  const chips = useComboboxAnchor()

  return (
    <Combobox items={posLocations} multiple>
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
        <ComboboxChipsInput placeholder="Search POS locations" />
      </ComboboxChips>
      <ComboboxContent anchor={chips}>
        <ComboboxEmpty>No POS locations found.</ComboboxEmpty>
        <ComboboxList>
          {(group: (typeof posLocations)[number]) => (
            <ComboboxGroup key={group.value} items={group.items}>
              <ComboboxLabel>{group.value}</ComboboxLabel>
              <ComboboxCollection>
                {(item: string) => (
                  <ComboboxItem key={item} value={item} variant="Checkbox">
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
            <FieldLabel>Settlement currency</FieldLabel>
            <Combobox items={currencies} defaultValue="SGD — Singapore Dollar">
              <ComboboxInput placeholder="Search currencies" />
              <ComboboxContent>
                <ComboboxEmpty>No currencies found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            <FieldDescription>Type a code or name to find a settlement currency.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Payment channel</FieldLabel>
            <ComboboxChannelsExample />
            <FieldDescription>Search channels grouped by market.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Product</FieldLabel>
            <Combobox items={products} defaultValue="Studio Membership">
              <ComboboxInput placeholder="Search products" />
              <ComboboxContent>
                <ComboboxEmpty>No products found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            <FieldDescription>Add a product to an invoice, payment link, or POS sale.</FieldDescription>
          </Field>

          <Field data-invalid>
            <FieldLabel>Product</FieldLabel>
            <Combobox items={products}>
              <ComboboxInput placeholder="Search products" aria-invalid />
              <ComboboxContent>
                <ComboboxEmpty>No products found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            <FieldError>Select a product to continue.</FieldError>
          </Field>
        </FieldGroup>

        <FieldGroup>
          <Field>
            <FieldLabel>Online Store fulfilment</FieldLabel>
            <ComboboxFulfilmentExample />
            <FieldDescription>Badge color can be set per option.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Customers</FieldLabel>
            <ComboboxCustomersExample defaultValue={[customers[0], customers[1], customers[6]]} />
            <FieldDescription>Assign invoices or recurring plans to multiple customers.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Customers</FieldLabel>
            <ComboboxCustomersExample variant="Checkbox" defaultValue={[customers[2], customers[3]]} />
            <FieldDescription>Same Customer Data list, with checkbox selection.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Customers</FieldLabel>
            <ComboboxCustomersExample variant="Checkbox" selectAll />
            <FieldDescription>Select all customers, then deselect a few.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel>POS locations</FieldLabel>
            <ComboboxLocationsExample />
            <FieldDescription>Search POS outlets grouped by country.</FieldDescription>
          </Field>
        </FieldGroup>
      </div>
    </DocExamplePage>
  )
}
