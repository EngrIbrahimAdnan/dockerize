import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Bell,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import routes from "@/app/constants/routes"; // Importing routes

const workingSpaceItems = [
  { icon: LayoutDashboard, label: "Dashboard", route: routes.dashboard },
  { icon: LayoutDashboard, label: "Financial Goals", route: routes.goals },
  { icon: Users, label: "Promotions", route: routes.promotion },
  { icon: MessageSquare, label: "About", route: routes.about },
  { icon: Bell, label: "Privacy Policy", route: routes.privacy },
  { icon: Bell, label: "Terms and Conditions", route: routes.terms },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        {/* Working Space Group */}
        <SidebarGroup>
          <SidebarGroupLabel>Pages</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {workingSpaceItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <a href={item.route} className="w-full flex items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
