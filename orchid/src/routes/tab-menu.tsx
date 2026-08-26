import { createFileRoute } from '@tanstack/react-router'
import { SmartphoneIcon, MonitorIcon } from 'lucide-react'
import { TabMenu, TabMenuList, TabMenuPanel, TabMenuTab } from '@/components/ui/tab-menu'
import { DocExamplePage } from '@/components/doc/doc-example-page'

export const Route = createFileRoute('/tab-menu')({
  component: TabMenuExamplesPage,
})

function TabMenuExamplesPage() {
  return (
    <DocExamplePage to="/tab-menu">
        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Default
          </p>
          <TabMenu defaultValue="a" type="Default">
            <TabMenuList>
              <TabMenuTab value="a">Label</TabMenuTab>
              <TabMenuTab value="b">Label</TabMenuTab>
              <TabMenuTab value="c" count={8}>
                Label
              </TabMenuTab>
            </TabMenuList>
            <TabMenuPanel value="a">First panel</TabMenuPanel>
            <TabMenuPanel value="b">Second panel</TabMenuPanel>
            <TabMenuPanel value="c">Third panel</TabMenuPanel>
          </TabMenu>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Pills
          </p>
          <TabMenu defaultValue="a" type="Pills">
            <TabMenuList>
              <TabMenuTab value="a" icon={<SmartphoneIcon />}>
                Mobile
              </TabMenuTab>
              <TabMenuTab value="b" icon={<MonitorIcon />}>
                Desktop
              </TabMenuTab>
            </TabMenuList>
            <TabMenuPanel value="a">Mobile layout</TabMenuPanel>
            <TabMenuPanel value="b">Desktop layout</TabMenuPanel>
          </TabMenu>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Big
          </p>
          <TabMenu defaultValue="a" type="Default" size="Big">
            <TabMenuList>
              <TabMenuTab value="a">Label</TabMenuTab>
              <TabMenuTab value="b">Label</TabMenuTab>
              <TabMenuTab value="c">Label</TabMenuTab>
            </TabMenuList>
            <TabMenuPanel value="a">First panel</TabMenuPanel>
            <TabMenuPanel value="b">Second panel</TabMenuPanel>
            <TabMenuPanel value="c">Third panel</TabMenuPanel>
          </TabMenu>
        </div>
      </DocExamplePage>
  )
}
