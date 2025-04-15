import DashboardTabs from "@/widgets/DashboardTabs";

export default function Dashboard() {
  return (
    <div className="py-6 px-4 space-y-6 min-h-screen" suppressHydrationWarning>
      <div className="flex justify-start items-start gap-4">
        <div className="px-3">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your events and orders</p>
        </div>
      </div>
      <DashboardTabs />
    </div>
  );
}
