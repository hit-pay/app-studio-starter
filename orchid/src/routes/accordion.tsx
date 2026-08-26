import { createFileRoute } from '@tanstack/react-router'
import { CircleIcon } from 'lucide-react'
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Chip } from '@/components/ui/chip'
import { DocExamplePage } from '@/components/doc/doc-example-page'

export const Route = createFileRoute('/accordion')({
  component: AccordionExamplesPage,
})

const SAMPLE = (
  <>
    <p className="font-medium">Accordion content</p>
    <p className="mt-4">
      HitPay helps over 15,000 businesses across Southeast Asia and around the globe process
      payments efficiently and securely. We unify online, point of sale, and B2B payments into a
      single, integrated system.
    </p>
  </>
)

function AccordionExamplesPage() {
  return (
    <DocExamplePage to="/accordion">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Default / Open
          </p>
          <Accordion defaultValue={['open']}>
            <AccordionItem value="a">
              <AccordionTrigger title="Additional Information" />
              <AccordionPanel>{SAMPLE}</AccordionPanel>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger title="Additional Information" />
              <AccordionPanel>{SAMPLE}</AccordionPanel>
            </AccordionItem>
            <AccordionItem value="open">
              <AccordionTrigger title="Additional Information" />
              <AccordionPanel>{SAMPLE}</AccordionPanel>
            </AccordionItem>
            <AccordionItem value="c">
              <AccordionTrigger title="Additional Information" />
              <AccordionPanel>{SAMPLE}</AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Description, label, icon, progress
          </p>
          <Accordion>
            <AccordionItem value="desc">
              <AccordionTrigger title="Additional Information" description="Description" />
              <AccordionPanel>{SAMPLE}</AccordionPanel>
            </AccordionItem>
            <AccordionItem value="label">
              <AccordionTrigger
                title="Additional Information"
                label={
                  <Chip color="Purple" type="Background">
                    New
                  </Chip>
                }
              />
              <AccordionPanel>{SAMPLE}</AccordionPanel>
            </AccordionItem>
            <AccordionItem value="icon">
              <AccordionTrigger title="Additional Information" leading={<CircleIcon />} />
              <AccordionPanel>{SAMPLE}</AccordionPanel>
            </AccordionItem>
            <AccordionItem value="progress">
              <AccordionTrigger
                title="Additional Information"
                progress={{ label: '2/5 completed', value: 0.4 }}
              />
              <AccordionPanel>{SAMPLE}</AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </DocExamplePage>
  )
}
