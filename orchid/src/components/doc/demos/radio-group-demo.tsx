import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'


function RadioGroupDemo() {
  return (
    <>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Vertical
          </p>
          <RadioGroup defaultValue="paynow">
            {[
              ['paynow', 'PayNow'],
              ['cards', 'Cards'],
              ['link', 'Payment Link'],
              ['pos', 'Point of Sale'],
            ].map(([value, label]) => (
              <div key={value} className="flex items-center gap-2">
                <RadioGroupItem value={value} id={`payment-${value}`} />
                <Label htmlFor={`payment-${value}`}>{label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Horizontal
          </p>
          <RadioGroup className="flex flex-wrap gap-4" defaultValue="sgd">
            {['SGD', 'USD', 'MYR'].map((currency) => (
              <div key={currency} className="flex items-center gap-2">
                <RadioGroupItem value={currency.toLowerCase()} id={`currency-${currency}`} />
                <Label htmlFor={`currency-${currency}`}>{currency}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            States
          </p>
          <RadioGroup defaultValue="active">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="default" id="status-default" />
              <Label htmlFor="status-default">Draft invoice</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="active" id="status-active" />
              <Label htmlFor="status-active">Sent</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="error" id="status-error" aria-invalid />
              <Label htmlFor="status-error">Failed PayNow</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="disabled" id="status-disabled" disabled />
              <Label htmlFor="status-disabled">Voided</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Description
          </p>
          <RadioGroup defaultValue="invoice">
            <div className="flex items-start gap-2">
              <RadioGroupItem value="invoice" id="invoice" />
              <div className="grid gap-0.5">
                <Label htmlFor="invoice">Invoice</Label>
                <p className="text-xs leading-normal text-oc-muted-foreground">
                  Create INV-2026-0842 and email it to the customer.
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>
    </>
  )
}

export { RadioGroupDemo }
