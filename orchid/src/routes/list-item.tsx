import { createFileRoute } from '@tanstack/react-router'
import { LandmarkIcon, MapPinIcon, CircleDollarSignIcon, PencilIcon, Trash2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import {
  ListItem,
  ListItemAction,
  ListItemActionDivider,
  ListItemBody,
  ListItemCopyRow,
  ListItemDescription,
  ListItemDetail,
  ListItemHoverActions,
  ListItemLogo,
  ListItemMedia,
  ListItemMeta,
  ListItemMore,
  ListItemTitle,
  ListItemToken,
  ListItemTrailing,
} from '@/components/ui/list-item'

export const Route = createFileRoute('/list-item')({
  component: ListItemExamplesPage,
})

function ListItemExamplesPage() {
  return (
    <DocExamplePage
      to="/list-item"
      usage={`import {
  ListItem,
  ListItemBody,
  ListItemTitle,
  ListItemDescription,
  ListItemMeta,
  ListItemDetail,
  ListItemHoverActions,
  ListItemAction,
} from '@/orchid-ui/list-item'
import { Badge } from '@/orchid-ui/badge'
import { MapPinIcon, PencilIcon } from 'lucide-react'

<ListItem>
  <ListItemBody>
    <ListItemTitle>Priya Nair</ListItemTitle>
    <ListItemDescription>INV-2048 · Cards · SGD 128.00</ListItemDescription>
    <ListItemMeta>
      <ListItemDetail icon={<MapPinIcon />}>Singapore</ListItemDetail>
      <Badge color="Green">Paid</Badge>
    </ListItemMeta>
  </ListItemBody>
  <ListItemHoverActions>
    <ListItemAction aria-label="Edit">
      <PencilIcon />
    </ListItemAction>
  </ListItemHoverActions>
</ListItem>`}
    >
      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Default
        </p>
        <p className="text-xs text-oc-muted-foreground">
          Title, chips, description, and icon meta. Compose any entity.
        </p>
        <ListItem>
          <ListItemBody>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <ListItemTitle>DBS Multiplier</ListItemTitle>
                <Badge color="DarkBlue">Default</Badge>
                <Badge color="Blue">HitPay</Badge>
                <Badge color="Purple">Stripe</Badge>
              </div>
              <ListItemDescription>Alex Turner</ListItemDescription>
            </div>
            <ListItemMeta>
              <ListItemDetail icon={<MapPinIcon />}>Singapore</ListItemDetail>
              <ListItemDetail icon={<CircleDollarSignIcon />}>SGD</ListItemDetail>
              <ListItemDetail icon={<LandmarkIcon />}>***3123</ListItemDetail>
            </ListItemMeta>
          </ListItemBody>
        </ListItem>
        <ListItem>
          <ListItemBody>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <ListItemTitle>Priya Nair</ListItemTitle>
                <Badge color="Green">Paid</Badge>
              </div>
              <ListItemDescription>INV-2048 · Cards · SGD 128.00</ListItemDescription>
            </div>
            <ListItemMeta>
              <ListItemDetail icon={<MapPinIcon />}>Singapore</ListItemDetail>
              <ListItemDetail icon={<CircleDollarSignIcon />}>SGD</ListItemDetail>
            </ListItemMeta>
          </ListItemBody>
        </ListItem>
        <ListItem layout="media">
          <ListItemBody className="gap-1">
            <ListItemTitle>Matcha Latte</ListItemTitle>
            <ListItemDescription>SKU-TEA-12 · Online Store and POS</ListItemDescription>
            <ListItemMeta>
              <span className="text-xs leading-[1.5] text-oc-muted-foreground">24 in stock</span>
              <Badge color="Green">Active</Badge>
            </ListItemMeta>
          </ListItemBody>
        </ListItem>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Hover actions
        </p>
        <ListItem>
          <ListItemBody>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <ListItemTitle>DBS Multiplier</ListItemTitle>
                <Badge color="DarkBlue">Default</Badge>
                <Badge color="Blue">HitPay</Badge>
                <Badge color="Purple">Stripe</Badge>
              </div>
              <ListItemDescription>Alex Turner</ListItemDescription>
            </div>
            <ListItemMeta>
              <ListItemDetail icon={<MapPinIcon />}>Singapore</ListItemDetail>
              <ListItemDetail icon={<CircleDollarSignIcon />}>SGD</ListItemDetail>
              <ListItemDetail icon={<LandmarkIcon />}>***3123</ListItemDetail>
            </ListItemMeta>
            <ListItemHoverActions>
              <ListItemAction aria-label="Edit">
                <PencilIcon className="size-4" />
              </ListItemAction>
              <ListItemActionDivider />
              <ListItemAction aria-label="Delete" destructive>
                <Trash2Icon className="size-4" />
              </ListItemAction>
            </ListItemHoverActions>
          </ListItemBody>
        </ListItem>
        <ListItem selected>
          <ListItemBody>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <ListItemTitle>DBS Multiplier</ListItemTitle>
                <Badge color="DarkBlue">Default</Badge>
                <Badge color="Blue">HitPay</Badge>
                <Badge color="Purple">Stripe</Badge>
              </div>
              <ListItemDescription>Alex Turner</ListItemDescription>
            </div>
            <ListItemMeta>
              <ListItemDetail icon={<MapPinIcon />}>Singapore</ListItemDetail>
              <ListItemDetail icon={<CircleDollarSignIcon />}>SGD</ListItemDetail>
              <ListItemDetail icon={<LandmarkIcon />}>***3123</ListItemDetail>
            </ListItemMeta>
          </ListItemBody>
        </ListItem>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Stack · copy fields
        </p>
        <ListItem layout="stack">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 flex-wrap items-baseline gap-1">
              <ListItemTitle>Invoice paid</ListItemTitle>
              <span className="text-xs text-oc-muted-foreground">-</span>
              <span className="text-xs text-oc-muted-foreground">20 Aug 2026</span>
            </div>
          </div>
          <div className="space-y-2">
            <ListItemCopyRow
              label="URL:"
              value="https://hooks.hitpayapp.com/invoice/a9ad4444-e1da-46d9-9d83-4da6cb602ab9"
            />
            <ListItemCopyRow
              label="Salt:"
              value="JDJ5JDEwJHUvekxEVWpoUjV5Ty9qdFg1bENrVC40eDZJVnNNSFFKdmozTkpqWHVqZ3cybHFTOXZINjNx"
            />
          </div>
        </ListItem>
        <ListItem layout="stack">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 flex-wrap items-baseline gap-1">
              <ListItemTitle>Payment link paid</ListItemTitle>
              <span className="text-xs text-oc-muted-foreground">-</span>
              <span className="text-xs text-oc-muted-foreground">20 Aug 2026</span>
            </div>
            <ListItemMore
              menu={
                <>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                </>
              }
            />
          </div>
          <div className="space-y-2">
            <ListItemCopyRow
              label="URL:"
              value="https://hooks.hitpayapp.com/payment-link/a9ad4444-e1da-46d9-9d83-4da6cb602ab9"
            />
            <ListItemCopyRow
              label="Salt:"
              value="JDJ5JDEwJHUvekxEVWpoUjV5Ty9qdFg1bENrVC40eDZJVnNNSFFKdmozTkpqWHVqZ3cybHFTOXZINjNx"
            />
          </div>
        </ListItem>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Media
        </p>
        <ListItem layout="media">
          <ListItemMedia>
            <img
              alt=""
              className="size-full object-cover"
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=128&h=128&fit=crop"
            />
          </ListItemMedia>
          <ListItemBody className="gap-1">
            <ListItemTitle>Home</ListItemTitle>
            <ListItemDescription className="line-clamp-2">
              Welcome to our store. Discover new arrivals and seasonal offers.
            </ListItemDescription>
            <ListItemMeta>
              <span className="text-xs leading-[1.5] text-oc-muted-foreground">
                Last updated : 20 Aug 2026
              </span>
              <Badge color="Green">Published</Badge>
            </ListItemMeta>
          </ListItemBody>
        </ListItem>
        <ListItem layout="media">
          <ListItemMedia>
            <img
              alt=""
              className="size-full object-cover"
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=128&h=128&fit=crop"
            />
          </ListItemMedia>
          <ListItemBody className="gap-1">
            <ListItemTitle>Weekend brunch</ListItemTitle>
            <ListItemDescription className="line-clamp-2">
              Payment Link landing page for SGD 48.00 brunch sets. PayNow and GrabPay enabled.
            </ListItemDescription>
            <ListItemMeta>
              <span className="text-xs leading-[1.5] text-oc-muted-foreground">
                Last updated : 18 Aug 2026
              </span>
              <Badge color="Grey">Draft</Badge>
            </ListItemMeta>
          </ListItemBody>
          <ListItemMore
            menu={
              <>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
              </>
            }
          />
        </ListItem>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Logo · tokens · trailing
        </p>
        <ListItem>
          <ListItemBody>
            <div className="flex items-center gap-2">
              <ListItemLogo>
                <span className="flex size-8 items-center justify-center rounded-full bg-oc-primary text-xs font-semibold text-oc-primary-foreground">
                  H
                </span>
              </ListItemLogo>
              <ListItemTitle>HitPay Store</ListItemTitle>
            </div>
            <div className="flex flex-wrap items-center gap-1">
              <p className="mr-1 text-xs font-medium text-oc-muted-foreground">Payment methods</p>
              {['Visa', 'WC', 'MC', 'AP', 'At', 'PN', 'GP', 'IP', 'JCB', 'KP'].map((code) => (
                <ListItemToken key={code}>{code}</ListItemToken>
              ))}
            </div>
          </ListItemBody>
        </ListItem>
        <ListItem>
          <ListItemBody>
            <div className="flex min-w-0 items-center gap-2">
              <ListItemLogo>
                <span className="flex size-8 items-center justify-center rounded-full bg-oc-primary text-xs font-semibold text-oc-primary-foreground">
                  H
                </span>
              </ListItemLogo>
              <ListItemTitle>HitPay Store</ListItemTitle>
            </div>
            <div className="flex flex-wrap items-center gap-1">
              <p className="mr-1 text-xs font-medium text-oc-muted-foreground">Payment methods</p>
              {['Visa', 'WC', 'MC', 'AP', 'At', 'PN', 'GP', 'IP', 'JCB', 'KP'].map((code) => (
                <ListItemToken key={code}>{code}</ListItemToken>
              ))}
            </div>
          </ListItemBody>
          <ListItemTrailing>
            <ListItemHoverActions className="static flex">
              <ListItemAction aria-label="Edit">
                <PencilIcon className="size-4" />
              </ListItemAction>
              <ListItemActionDivider />
              <ListItemAction aria-label="Delete" destructive>
                <Trash2Icon className="size-4" />
              </ListItemAction>
            </ListItemHoverActions>
            <Button variant="Primary" size="Default">
              Connect
            </Button>
          </ListItemTrailing>
        </ListItem>
      </div>
    </DocExamplePage>
  )
}
