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
import type { ChipColor } from '@/components/ui/chip'

export const Route = createFileRoute('/combobox')({
  component: ComboboxExamplesPage,
})

const currencies = [
  'IDR — Indonesian Rupiah',
  'USD — US Dollar',
  'SGD — Singapore Dollar',
  'EUR — Euro',
  'GBP — British Pound',
  'JPY — Japanese Yen',
  'AUD — Australian Dollar',
  'CAD — Canadian Dollar',
  'CHF — Swiss Franc',
  'CNY — Chinese Yuan',
  'HKD — Hong Kong Dollar',
  'KRW — South Korean Won',
  'MYR — Malaysian Ringgit',
  'THB — Thai Baht',
  'VND — Vietnamese Dong',
]

const countries = [
  {
    value: 'Asia',
    items: ['Indonesia', 'Singapore', 'Japan', 'Malaysia', 'Thailand', 'Vietnam', 'South Korea'],
  },
  {
    value: 'Europe',
    items: ['Germany', 'France', 'United Kingdom', 'Netherlands', 'Spain', 'Italy'],
  },
  {
    value: 'Americas',
    items: ['United States', 'Canada', 'Brazil', 'Mexico'],
  },
  {
    value: 'Oceania',
    items: ['Australia', 'New Zealand'],
  },
]

const fulfilmentTypes = ['In Store', 'Shipping', 'Pickup', 'Online Order', 'Digital Products'] as const

const fulfilmentChipColor: Record<(typeof fulfilmentTypes)[number], ChipColor> = {
  'In Store': 'Green',
  Shipping: 'Purple',
  Pickup: 'Blue',
  'Online Order': 'DarkBlue',
  'Digital Products': 'Grey',
}

const products = [
  'Classic White Tee',
  'Denim Jacket',
  'Linen Shirt',
  'Canvas Tote',
  'Wool Scarf',
  'Leather Belt',
  'Running Sneakers',
  'Ceramic Mug',
]

const users = [
  'Aria Putri',
  'Ben Hartono',
  'Chloe Tan',
  'Daniel Kim',
  'Elena Santos',
  'Farhan Malik',
  'Grace Wijaya',
  'Hiro Tanaka',
]

const cities = [
  {
    value: 'Indonesia',
    items: ['Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta', 'Medan'],
  },
  {
    value: 'Singapore',
    items: ['Singapore'],
  },
  {
    value: 'Japan',
    items: ['Tokyo', 'Osaka', 'Kyoto', 'Fukuoka'],
  },
  {
    value: 'United States',
    items: ['New York', 'San Francisco', 'Austin', 'Seattle'],
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
                color={fulfilmentChipColor[item as (typeof fulfilmentTypes)[number]]}
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

function ComboboxUsersExample({
  defaultValue,
  invalid,
  variant = 'Default',
  selectAll = false,
}: {
  defaultValue?: string[]
  invalid?: boolean
  variant?: 'Default' | 'Checkbox'
  selectAll?: boolean
}) {
  const chips = useComboboxAnchor()

  return (
    <Combobox items={users} multiple defaultValue={defaultValue}>
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
        <ComboboxChipsInput placeholder="Search users" aria-invalid={invalid || undefined} />
      </ComboboxChips>
      <ComboboxContent anchor={chips}>
        {selectAll ? (
          <>
            <ComboboxSelectAll />
            <ComboboxSeparator />
          </>
        ) : null}
        <ComboboxEmpty>No users found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item} variant={variant}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

function ComboboxCountriesExample() {
  return (
    <Combobox items={countries}>
      <ComboboxInput placeholder="Search countries" />
      <ComboboxContent>
        <ComboboxEmpty>No countries found.</ComboboxEmpty>
        <ComboboxList>
          {(group: (typeof countries)[number]) => (
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

function ComboboxCitiesExample() {
  const chips = useComboboxAnchor()

  return (
    <Combobox items={cities} multiple>
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
        <ComboboxChipsInput placeholder="Search cities" />
      </ComboboxChips>
      <ComboboxContent anchor={chips}>
        <ComboboxEmpty>No cities found.</ComboboxEmpty>
        <ComboboxList>
          {(group: (typeof cities)[number]) => (
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
            <FieldLabel>Currency</FieldLabel>
            <Combobox items={currencies} defaultValue="IDR — Indonesian Rupiah">
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
            <FieldDescription>Type a code or name to find a currency.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Country</FieldLabel>
            <ComboboxCountriesExample />
            <FieldDescription>Search countries grouped by region.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Product</FieldLabel>
            <Combobox items={products}>
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
            <FieldDescription>Type to filter a large product catalog.</FieldDescription>
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
            <FieldLabel>Fulfilment Type</FieldLabel>
            <ComboboxFulfilmentExample />
            <FieldDescription>Chip color can be set per option.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Users</FieldLabel>
            <ComboboxUsersExample defaultValue={['Aria Putri', 'Chloe Tan', 'Hiro Tanaka']} />
            <FieldDescription>Assign multiple teammates by searching names.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Users</FieldLabel>
            <ComboboxUsersExample variant="Checkbox" defaultValue={['Ben Hartono', 'Elena Santos']} />
            <FieldDescription>Same list, with checkbox selection.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Users</FieldLabel>
            <ComboboxUsersExample variant="Checkbox" selectAll />
            <FieldDescription>Select all teammates, then deselect a few.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel>City</FieldLabel>
            <ComboboxCitiesExample />
            <FieldDescription>Search cities grouped by country.</FieldDescription>
          </Field>
        </FieldGroup>
      </div>
    </DocExamplePage>
  )
}
