import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Grid } from "@/components/ui/grid";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Grid className="gap-6">
        {/* Platform Statistics */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Platform Statistics</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-primary/10 rounded-lg">
                <h3 className="text-lg font-medium">Total Users</h3>
                <p className="text-2xl font-bold">0</p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <h3 className="text-lg font-medium">Total Pins</h3>
                <p className="text-2xl font-bold">0</p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <h3 className="text-lg font-medium">Total Boards</h3>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">User Management</h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Recent user activities and management controls will be displayed here.</p>
          </CardContent>
        </Card>

        {/* Content Moderation */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Content Moderation</h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Content reports and moderation tools will be displayed here.</p>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">System Settings</h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Platform configuration and settings will be available here.</p>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default Dashboard;