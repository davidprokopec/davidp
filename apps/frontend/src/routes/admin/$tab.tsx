import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UsersTab } from '@/components/admin/Users-tab'
import { useAdminGuard } from '@/hooks/useAdminGuard'

const adminPageSearchSchema = z.object({
  tab: z.enum(['users', 'blogs', 'settings']).optional().default('users'),
})

const adminPageSearchParamsSchema = z.object({
  modal: z.enum(['ban', 'sessions', 'edit']).optional(),
  userId: z.string().optional(),
})

export const Route = createFileRoute('/admin/$tab')({
  component: RouteComponent,
  validateSearch: adminPageSearchParamsSchema,
  loader: ({ params }) => {
    const { tab } = adminPageSearchSchema.parse(params)
    return { tab }
  },
})

function RouteComponent() {
  const { isPending: isGuardPending } = useAdminGuard()
  const { tab: activeTab } = Route.useLoaderData()
  const navigate = Route.useNavigate()

  const changeTab = (tab: string) => {
    navigate({
      to: `/admin/$tab`,
      params: { tab },
      replace: true,
    })
  }

  if (isGuardPending) return <div>Loading...</div>

  return (
    <div className="w-5/6 mt-10 mx-auto bg-background shadow-lg rounded-lg overflow-hidden">
      <Tabs defaultValue="users" className="w-full" onValueChange={changeTab}>
        <TabsList className="w-full justify-start bg-muted/20 p-2">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="blogs">Blogs</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <div className="relative overflow-hidden">
          <div
            className={`flex transition-transform duration-300 ease-in-out`}
            style={{
              transform: `translateX(-${['users', 'posts', 'settings'].indexOf(activeTab) * 100}%)`,
            }}
          >
            <TabsContent value="users" className="w-full flex-shrink-0">
              <UsersTab />
            </TabsContent>
            <TabsContent value="posts" className="w-full flex-shrink-0">
              <div className="p-4">Posts content (to be implemented)</div>
            </TabsContent>
            <TabsContent value="settings" className="w-full flex-shrink-0">
              <div className="p-4">Settings content (to be implemented)</div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
